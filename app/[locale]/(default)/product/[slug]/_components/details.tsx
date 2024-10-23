import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { useFormatter, useTranslations } from 'next-intl';

import { ProductItemFragment } from '~/client/fragments/product-item';
import { FragmentOf, graphql } from '~/client/graphql';
import { ProductForm } from '~/components/product-form';
import { ProductFormFragment } from '~/components/product-form/fragment';

import { ProductSchema, ProductSchemaFragment } from './product-schema';
import { ReviewSummary, ReviewSummaryFragment } from './review-summary';

//!custom import
import { cn } from '~/lib/utils';
import Accordion from '../_components/radix-ui-accordion/Accordion';
import { ProductDetails } from '../../../ArrData/ProductDetails';

export const DetailsFragment = graphql(
  `
    fragment DetailsFragment on Product {
      ...ReviewSummaryFragment
      ...ProductSchemaFragment
      ...ProductFormFragment
      ...ProductItemFragment
      entityId
      name
      sku
      upc
      minPurchaseQuantity
      maxPurchaseQuantity
      condition
      weight {
        value
        unit
      }
      availabilityV2 {
        description
      }
      customFields {
        edges {
          node {
            entityId
            name
            value
          }
        }
      }
      brand {
        name
      }
      prices {
        priceRange {
          min {
            value
          }
          max {
            value
          }
        }
        retailPrice {
          value
        }
        salePrice {
          value
        }
        basePrice {
          value
        }
        price {
          value
          currencyCode
        }
      }
    }
  `,
  [ReviewSummaryFragment, ProductSchemaFragment, ProductFormFragment, ProductItemFragment],
);

interface Props {
  product: FragmentOf<typeof DetailsFragment>;
}

export const Details = ({ product }: Props) => {
  const t = useTranslations('Product.Details');
  const format = useFormatter();

  // ! destructure data
  const { inventory } = product;

  const customFields = removeEdgesAndNodes(product.customFields);

  const showPriceRange = product.prices?.priceRange.min.value !== product.prices?.priceRange.max.value;

  const edges = product.customFields.edges || []; // Fallback to an empty array if undefined

  const ProductType = edges.filter(prop => prop.node.name === 'Product Type');
  const ComfortLevel = edges.filter(prop => prop.node.name === 'Comfort Level');
  const Assembly = edges.filter(prop => prop.node.name === 'Assembly');
  const FlammabilityStandard = edges.filter(prop => prop.node.name === 'Flammability Standard');

  // Using the spread operator to combine all arrays
  const SpecificationArr = [
    ...ProductType,
    ...ComfortLevel,
    ...Assembly,
    ...FlammabilityStandard
  ];

  return (
    <div className='xxs:w-[100%] lg:w-[35%]'>
      <div className='w-[100%] flex justify-between border-b border-[#707070] mb-1'>
        {product.brand && (
          <p className="mb-2 font-[200] uppercase text-[#707070] font-raleway">{product.brand.name}</p>
        )}

        {Boolean(product.sku) && (
          <div className='flex flex-row'>
            <h3 className="font-semibold text-[#707070]">{t('sku')}:</h3>
            &nbsp;
            <p className='text-[#707070]'>{product.sku}</p>
          </div>
        )}
      </div>

      <h1 className={cn('mb-4 text-4xl font-black lg:text-5xl', 'lg:text-2xl mb-[5px]')}>{product.name}</h1>

      <ReviewSummary data={product} />

      <div className='flex flex-wrap justify-start'>
        {/* custom */}
        {inventory.isInStock && inventory.isInStock ? (
          <div className='m-auto mx-0 mb-[0px]'>
            <span className='uppercase px-[1.2rem] py-[4px] mr-[1rem] bg-green-500 rounded-[20px] text-white font-raleway font-[600] tracking-[1px] text-[14px]'>In Stock</span>
          </div>
        ) : (
          <div className='m-auto mx-0 mb-[0px]'>
            <span className='uppercase px-[1.2rem] py-[4px] mr-[1rem] bg-red-600 rounded-[20px] text-white font-raleway font-[600] tracking-[1px] text-[14px]'>Out of stock</span>
          </div>
        )}

        {product.prices && (
          <div className="my-6 text-2xl font-bold lg:text-3xl mb-[0px]">
            {showPriceRange ? (
              <span className='flex text-[22px]'>
                Price Range:{' '}
                {format.number(product.prices.priceRange.min.value, {
                  style: 'currency',
                  currency: product.prices.price.currencyCode,
                })}
                {' '}-{' '}
                {format.number(product.prices.priceRange.max.value, {
                  style: 'currency',
                  currency: product.prices.price.currencyCode,
                })}
              </span>
            ) : (
              <>
                {product.prices.retailPrice?.value !== undefined && (
                  <span>
                    {t('Prices.msrp')}:{' '}
                    <span className="line-through">
                      {format.number(product.prices.retailPrice.value, {
                        style: 'currency',
                        currency: product.prices.price.currencyCode,
                      })}
                    </span>
                    <br />
                  </span>
                )}
                {product.prices.salePrice?.value !== undefined &&
                  product.prices.basePrice?.value !== undefined ? (
                  <>
                    <span>
                      {t('Prices.was')}:{' '}
                      <span className="line-through">
                        {format.number(product.prices.basePrice.value, {
                          style: 'currency',
                          currency: product.prices.price.currencyCode,
                        })}
                      </span>
                    </span>
                    <br />
                    <span>
                      {t('Prices.now')}:{' '}
                      {format.number(product.prices.price.value, {
                        style: 'currency',
                        currency: product.prices.price.currencyCode,
                      })}
                    </span>
                  </>
                ) : (
                  product.prices.price.value && (
                    <span className='flex text-[22px]'>
                      Price: {format.number(product.prices.price.value, {
                        style: 'currency',
                        currency: product.prices.price.currencyCode,
                      })}
                    </span>
                  )
                )}
              </>
            )}
          </div>
        )}

        {/* static only, third party app on reference */}
        {/* <div>
          <div className='w-[100%]'>
            <span className='text-[#707070] text-nowrap flex'>4 interest-free payments or as low as $29/mo with &nbsp; <img className='h-[1.2em] w-[auto]' src={hpcontent['text-affirm']} />.&nbsp;Check your purchasing power</span>
          </div>
        </div> */}

      </div>

      <ProductForm data={product} />

      {/* radix ui here */}
      <Accordion description={product.description} specifications={SpecificationArr} measurement='' customFields={customFields} />

      <div>
        {ProductDetails && ProductDetails.map(val => {
          return (
            <div className='flex flex-row items-center mt-[15px]' key={val.id}>
              <div className='flex items-center justify-center h-auto w-[15%]'>
                <img className='w-[40%] my-[.5em] h-auto mx-[.5em]' src={val.icon} alt={val.title} />
              </div>
              <div className='flex justify-start w-[85%]'>
                <div>
                  <h3 className="mb-2 font-semibold text-[#132448] text-[14px]">{val.title}</h3>
                  <p className='text-[#666] font-[200]'>{val.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="my-12">
        <h2 className="mb-4 text-xl font-bold md:text-2xl">{t('additionalDetails')}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {Boolean(product.sku) && (
            <div>
              <h3 className="font-semibold">{t('sku')}</h3>
              <p>{product.sku}</p>
            </div>
          )}
          {Boolean(product.upc) && (
            <div>
              <h3 className="font-semibold">{t('upc')}</h3>
              <p>{product.upc}</p>
            </div>
          )}
          {Boolean(product.minPurchaseQuantity) && (
            <div>
              <h3 className="font-semibold">{t('minPurchase')}</h3>
              <p>{product.minPurchaseQuantity}</p>
            </div>
          )}
          {Boolean(product.maxPurchaseQuantity) && (
            <div>
              <h3 className="font-semibold">{t('maxPurchase')}</h3>
              <p>{product.maxPurchaseQuantity}</p>
            </div>
          )}
          {Boolean(product.availabilityV2.description) && (
            <div>
              <h3 className="font-semibold">{t('availability')}</h3>
              <p>{product.availabilityV2.description}</p>
            </div>
          )}
          {Boolean(product.condition) && (
            <div>
              <h3 className="font-semibold">{t('condition')}</h3>
              <p>{product.condition}</p>
            </div>
          )}
          {Boolean(product.weight) && (
            <div>
              <h3 className="font-semibold">{t('weight')}</h3>
              <p>
                {product.weight?.value} {product.weight?.unit}
              </p>
            </div>
          )}
          {Boolean(customFields) &&
            customFields.map((customField) => (
              <div key={customField.entityId}>
                <h3 className="font-semibold">{customField.name}</h3>
                <p>{customField.value}</p>
              </div>
            ))}
        </div>
      </div> */}

      <ProductSchema product={product} />
    </div>
  );
};
