import { useTranslations } from 'next-intl';

import { Counter, Label } from '~/components/ui/form';

import { useProductFieldController } from '../use-product-form';

export const QuantityField = () => {
  const { field } = useProductFieldController({
    name: 'quantity',
    rules: { required: true, min: 1 },
    defaultValue: 1,
  });
  const t = useTranslations('Product.Form');

  return (
    <div className="@md:w-32">
      <Label className="mb-2 inline-block font-semibold" htmlFor="quantity">
        <span className='text-[#687880] text-[14px] leading-[.5em] font-[600]'>{t('quantityLabel')}</span>
      </Label>
      <Counter
        id="quantity"
        min={1}
        name={field.name}
        onChange={field.onChange}
        value={Number(field.value)}
      />
    </div>
  );
};
