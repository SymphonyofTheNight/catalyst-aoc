'use client';

import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { AlertCircle, Check, Heart, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FormProvider, useFormContext } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { ProductItemFragment } from '~/client/fragments/product-item';
import { FragmentOf } from '~/client/graphql';
import { Button } from '~/components/ui/button';
import { bodl } from '~/lib/bodl';

import { AddToCartButton } from '../add-to-cart-button';
import { Link } from '../link';

import { handleAddToCart } from './_actions/add-to-cart';
import { CheckboxField } from './fields/checkbox-field';
import { DateField } from './fields/date-field';
import { MultiLineTextField } from './fields/multi-line-text-field';
import { MultipleChoiceField } from './fields/multiple-choice-field';
import { NumberField } from './fields/number-field';
import { QuantityField } from './fields/quantity-field';
import { TextField } from './fields/text-field';
import { ProductFormData, useProductForm } from './use-product-form';

// ! custom import 
import moment from 'moment';

interface Props {
  data: FragmentOf<typeof ProductItemFragment>;
}

const productItemTransform = (p: FragmentOf<typeof ProductItemFragment>) => {
  const category = removeEdgesAndNodes(p.categories).at(0);
  const breadcrumbs = category ? removeEdgesAndNodes(category.breadcrumbs) : [];

  return {
    product_id: p.entityId.toString(),
    product_name: p.name,
    brand_name: p.brand?.name,
    sku: p.sku,
    sale_price: p.prices?.salePrice?.value,
    purchase_price: p.prices?.salePrice?.value || p.prices?.price.value || 0,
    base_price: p.prices?.price.value,
    retail_price: p.prices?.retailPrice?.value,
    currency: p.prices?.price.currencyCode || 'USD',
    category_names: breadcrumbs.map(({ name }) => name),
    variant_id: p.variants.edges?.map((variant) => variant.node.entityId),
  };
};

// ! submitting
export const Submit = ({ data: product }: Props) => {

  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  return (
    <AddToCartButton data={product} loading={isSubmitting}>
      <ShoppingCart className="mr-2" />
    </AddToCartButton>
  );
};

// Create a date object
let date = moment(); // or moment('2024-10-11') to use a specific date

// Format the date
let formattedDate = date.format('MM/DD/YYYY');

export const ProductForm = ({ data: product }: Props) => {

  const t = useTranslations('Product.Form');
  const m = useTranslations('AddToCart');
  const productOptions = removeEdgesAndNodes(product.productOptions);

  const { handleSubmit, register, ...methods } = useProductForm();

  const productFormSubmit = async (data: ProductFormData) => {

    const result = await handleAddToCart(data, product);

    const quantity = Number(data.quantity);

    if (result.error) {
      toast.error(m('errorAddingProductToCart'), {
        icon: <AlertCircle className="text-error-secondary" />,
      });

      return;
    }

    const transformedProduct = productItemTransform(product);

    bodl.cart.productAdded({
      product_value: transformedProduct.purchase_price * quantity,
      currency: transformedProduct.currency,
      line_items: [
        {
          ...transformedProduct,
          quantity,
        },
      ],
    });

    //!prompt
    toast.success(
      () => (
        <div className="flex items-center gap-3">
          <span>
            {m.rich('addedProductQuantity', {
              cartItems: quantity,
              cartLink: (chunks) => (
                <Link
                  className="font-semibold text-primary hover:text-secondary"
                  href="/cart"
                  prefetch="viewport"
                  prefetchKind="full"
                >
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </div>
      ),
      { icon: <Check className="text-success-secondary" /> },
    );
  };

  const { description } = product?.availabilityV2 || {};

  return (
    <FormProvider handleSubmit={handleSubmit} register={register} {...methods}>
      <form className="flex flex-col gap-[.5rem] @container" onSubmit={handleSubmit(productFormSubmit)}>
        <input type="hidden" value={product.entityId} {...register('product_id')} />

        {productOptions.map((option) => {
          if (option.__typename === 'MultipleChoiceOption') {
            return <MultipleChoiceField key={option.entityId} option={option} />;
          }

          if (option.__typename === 'CheckboxOption') {
            return <CheckboxField key={option.entityId} option={option} />;
          }

          if (option.__typename === 'NumberFieldOption') {
            return <NumberField key={option.entityId} option={option} />;
          }

          if (option.__typename === 'MultiLineTextFieldOption') {
            return <MultiLineTextField key={option.entityId} option={option} />;
          }

          if (option.__typename === 'TextFieldOption') {
            return <TextField key={option.entityId} option={option} />;
          }

          if (option.__typename === 'DateFieldOption') {
            return <DateField key={option.entityId} option={option} />;
          }

          return null;
        })}

        <QuantityField />

        {/* custom container */}
        <div className='w-[100%] flex bg-[#18253f] rounded-[5px] mt-[1.2rem] justify-evenly'>
          <span className='xxs:text-[12px] xl:text-[15px] text-center text-white tracking-[1px] m-auto py-[1rem]'>Ships by:<span className='font-montserrat xxs:text-[12px] xl:text-[15px] tracking-[0px] font-[600]'>&nbsp;&nbsp;{formattedDate ? formattedDate : null}</span></span>
          <div className='border-l-[2px] border-[#264da3] h-[30px] my-auto'></div>
          <span className='xxs:text-[12px] xl:text-[15px] text-center text-white tracking-[1px] m-auto py-[1rem]'>Delivery:<span className='font-montserrat xxs:text-[12px] xl:text-[15px] tracking-[0px] font-[600]'>&nbsp;&nbsp;{description ? description : null}</span></span>
        </div>

        <p className='flex text-[#707070] text-[14px] text-left font-[400]'>*To learn more about shipping, check out our&nbsp;<a className='text-[#264da3] font-[700] underline'>Shipment Transit Chart.</a></p>

        <div className="mt-4 flex flex-col gap-4 @md:flex-row">
          <Submit data={product} />

          {/* NOT IMPLEMENTED YET */}
          <div className="w-full">
            <Button disabled type="submit" variant="secondary">
              <Heart aria-hidden="true" className="mr-2" />
              <span>{t('saveToWishlist')}</span>
            </Button>
          </div>

        </div>
      </form>
    </FormProvider>
  );
};
