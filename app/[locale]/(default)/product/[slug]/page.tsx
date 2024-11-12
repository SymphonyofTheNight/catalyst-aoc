import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { Breadcrumbs } from '~/components/breadcrumbs';
import { LocaleType } from '~/i18n';

import { Description } from './_components/description';
import { Details } from './_components/details';
import { Gallery } from './_components/gallery';
import { ProductViewed } from './_components/product-viewed';
import { RelatedProducts } from './_components/related-products';
import { Reviews } from './_components/reviews';
import { Warranty } from './_components/warranty';
import { getProduct } from './page-data';

//! custom import 
import { cn } from '~/lib/utils';
import { GreenMatt } from '../../ArrData/GreenMatt';
import AccordionBed from './_components/radix-ui-accordion/AccordionBed';

interface ProductPageProps {
  params: { slug: string; locale: LocaleType };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({
  params,
  searchParams,
}: ProductPageProps): Promise<Metadata> {
  const productId = Number(params.slug);
  const optionValueIds = getOptionValueIds({ searchParams });

  const product = await getProduct({
    entityId: productId,
    optionValueIds,
    useDefaultOptionSelections: optionValueIds.length === 0 ? true : undefined,
  });

  if (!product) {
    return {};
  }

  const { pageTitle, metaDescription, metaKeywords } = product.seo;
  const { url, altText: alt } = product.defaultImage || {};

  return {
    title: pageTitle || product.name,
    description: metaDescription || `${product.plainTextDescription.slice(0, 150)}...`,
    keywords: metaKeywords ? metaKeywords.split(',') : null,
    openGraph: url
      ? {
        images: [
          {
            url,
            alt,
          },
        ],
      }
      : null,
  };
}

export default async function Product({ params, searchParams }: ProductPageProps) {
  const { locale } = params;

  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Product' });
  const messages = await getMessages({ locale });

  const productId = Number(params.slug);

  const optionValueIds = getOptionValueIds({ searchParams });

  const product = await getProduct({
    entityId: productId,
    optionValueIds,
    useDefaultOptionSelections: optionValueIds.length === 0 ? true : undefined,
  });

  if (!product) {
    return notFound();
  }

  const category = removeEdgesAndNodes(product.categories).at(0);

  return (
    <>
      {category && <Breadcrumbs category={category} />}

      <div className={cn('mb-12 mt-4 lg:grid lg:grid-cols-2 lg:gap-8', 'px-[3vw] lg:flex lg:flex-row')}>
        <NextIntlClientProvider
          locale={locale}
          messages={{ Product: messages.Product ?? {}, AddToCart: messages.AddToCart ?? {} }}
        >
          <Gallery noImageText={t('noGalleryText')} product={product} />
          <Details product={product} />
        </NextIntlClientProvider>
      </div>

      {/* custom */}
      <div className='w-full h-auto bg-[#e2e8ed] px-[3vw] py-[2.5rem] mt-[50px]'>
        <div className='w-[80%] flex align-items justify-between m-auto'>
          {GreenMatt && GreenMatt.map((val) => <img className='xxs:h-auto xxs:w-[15%] scale-[.8] object-contain' src={val.url} alt={val.name} />)}
        </div>
      </div>

      {/* custom */}
      <div className='bg-[#f6f7fa] h-auto w-full flex xxs:flex-col-reverse lg:flex-row flex-wrap relative'>
        <div className='xxs:w-[100%] lg:w-[50%] flex items-center justify-center'>
          <AccordionBed />
        </div>
        <div className='xxs:w-[100%] lg:w-[50%] relative'>
          <img src='https://store-z2qdisybty.mybigcommerce.com/content/converted%20webp/core-comp.webp' />
        </div>
      </div>

      <div className='bg-custom-productpage-bg bg-cover bg-no-repeat bg-center h-auto w-full py-[4rem]'>
        <div className='flex xxs:flex-col lg:flex-row w-[85%] mx-auto'>
          <div className='xxs:w-[90%] lg:w-[45%] mx-auto'>
            <img className='w-[100%]' src='https://store-z2qdisybty.mybigcommerce.com/content/converted%20webp/mattress-dream-new.webp' />
          </div>
          <div className='xxs:w-[90%] lg:w-[45%] m-auto xxs:mt-[20px] lg:my-auto'>
            <h2 className='text-[#f8f9fa] mb-4 font-[700] font-montserrat text-[25px] tracking-[1px]'>The Mattress of Your Dreams</h2>
            <p className='text-[#f8f9fa]'>Icon Sleep's COOLest has a gel-infused memory foam top that promotes a
              conducive sleep environment for all sleepers. This dream-inducing
              layer on top of durable pressure relief and support foams make up for
              an outstanding mattress architecture that promises more well-rested
              mornings.</p>
            <a className='rounded-[8px] text-[#264da3] font-montserrat font-[700] bg-white py-[15px] px-[60px] inline-block mt-[16px]'>Learn More</a>
          </div>
        </div>
      </div>

      <div className='w-[70%] my-[5rem] mx-auto text-center'>
        <h2 className='mt-5 font-[700] text-[132448] text-[28px] font-montserrat'>
          Finding The Perfect Firmness For You
        </h2>
        <p className='text-[#707070] leading-[33px]'>
          Dont know which mattress firmness is for you? 88% of sleepers prefer a mattress that is in the happy medium range
          of 4-7. See below chart for illustration on how our mattress is constructed to please the masses.
        </p>
        <div className='flex justify-between max-w-[75%] flex-wrap gap-[1rem] mx-auto'>
          <div className='mx-auto'>
            <video autoPlay loop muted playsInline className="relative w-full max-w-[200px]">
              <source src="https://alwaysopencommerce.com/wp-content/themes/salient/img/soft%20firmness.mp4" type="video/mp4" />
            </video>
            <p className='text-[18px] mt-4 uppercase tracking-[1px] text-[#707070]'>Soft</p>
          </div>
          <div className='mx-auto'>
            <video autoPlay loop muted playsInline className="relative w-full max-w-[200px]">
              <source src="https://alwaysopencommerce.com/wp-content/themes/salient/img/medium%20firmness.mp4" type="video/mp4" />
            </video>
            <h4 className="font-[700] mt-4 text-[#132448] uppercase">Medium</h4>
          </div>
          <div className='mx-auto'>
            <video autoPlay loop muted playsInline className="relative w-full max-w-[200px]">
              <source src="https://alwaysopencommerce.com/wp-content/themes/salient/img/firm.mp4" type="video/mp4" />
            </video>
            <p className="text-[18px] mt-4 uppercase tracking-[1px] text-[#707070]">Firm</p>
          </div>
          <img className="inline-block h-auto max-w-[100%]" src="https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/mattress-firmness-scale-.png" />
        </div>
      </div>

      <div className='w-[85%] mt-[5rem] mx-auto text-center'>
        <div className='bg-icon-diff py-[1.5rem] bg-cover bg-no-repeat bg-center'>
          <h2 className='font-montserrat text-[#f8f9fa] font-[800] text-[25px] mt-[2.28571rem] mb-[.78571rem]'>The Iconic Difference</h2>
          <p className='mt-[1rem] mb-[1.5rem] text-[#f8f9fa] leading-[2] tracking-[1]'>
            Icon Sleep mattresses are not necessarily better. But compared to what the competition offer, we present the most <br />
            reasonably priced package for the same quality. In short, we offer the same value for less.
          </p>
        </div>
      </div>

      {/* <div className={cn('lg:col-span-2', 'px-[3vw]')}>
        <Description product={product} />
        <Warranty product={product} />
        <Suspense fallback={t('loading')}>
          <Reviews productId={product.entityId} />
        </Suspense>
      </div> */}

      <Suspense fallback={t('loading')}>
        <RelatedProducts productId={product.entityId} />
      </Suspense>

      <ProductViewed product={product} />
    </>
  );
}

function getOptionValueIds({ searchParams }: { searchParams: ProductPageProps['searchParams'] }) {
  const { slug, ...options } = searchParams;

  return Object.keys(options)
    .map((option) => ({
      optionEntityId: Number(option),
      valueEntityId: Number(searchParams[option]),
    }))
    .filter(
      (option) => !Number.isNaN(option.optionEntityId) && !Number.isNaN(option.valueEntityId),
    );
}

export const runtime = 'edge';
