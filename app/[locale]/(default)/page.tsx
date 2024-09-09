import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { getSessionCustomerId } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { Hero } from '~/components/hero';
import {
  ProductCardCarousel,
  ProductCardCarouselFragment,
} from '~/components/product-card-carousel';
import { LocaleType } from '~/i18n';

//!custom import
import { cn } from '~/lib/utils';
import { BcImage } from '~/components/bc-image';

//! import arr
import { heroBanner } from './ArrData/HeroBanner'

interface Props {
  params: {
    locale: LocaleType;
  };
}

const HomePageQuery = graphql(
  `
    query HomePageQuery {
      site {
        newestProducts(first: 12) {
          edges {
            node {
              ...ProductCardCarouselFragment
            }
          }
        }
        featuredProducts(first: 12) {
          edges {
            node {
              ...ProductCardCarouselFragment
            }
          }
        }
        bestSellingProducts(first: 3) {
          edges {
            node {
              ...ProductCardCarouselFragment
            }
          }
        }
      }
    }
  `,
  [ProductCardCarouselFragment],
);

export default async function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const customerId = await getSessionCustomerId();

  const t = await getTranslations({ locale, namespace: 'Home' });
  const messages = await getMessages({ locale });

  const { data } = await client.fetch({
    document: HomePageQuery,
    customerId,
    fetchOptions: customerId ? { cache: 'no-store' } : { next: { revalidate } },
  });

  const featuredProducts = removeEdgesAndNodes(data.site.featuredProducts);
  const newestProducts = removeEdgesAndNodes(data.site.newestProducts);

  //! this is custom
  const BestSelling = removeEdgesAndNodes(data.site.bestSellingProducts);

  console.log("result here:", BestSelling);

  return (
    <>

      {/* <Hero /> */}

      {/* custom elem hero banner */}
      <div className='w-auto h-[45vw] bg-hero-bg bg-contain flex items-center justify-start bg-no-repeat'>
        <div className='h-auto w-auto 2xl:ml-[5vw] 2xl:mb-5 flex flex-col justify-start items-start'>
          <div className='flex flex-row flex-wrap items-center'>
            <img className='h-auto w-[47%]' src={heroBanner['img-stars']} />
            <span className='text-white'>
              (749)
            </span>
          </div>
          <span className='text-white text-left text-[50px] leading-[1.3] tracking-[2px] mt-[10px] font-[600]'>
            Most Affordable <br /> USA Made Mattress
          </span>
          <div>
            <div className='flex flex-row mt-[19px]'>
              <div className='min-w-[240px]'>
                <span className='flex flex-row'><img src={heroBanner['img-check']} /> <span className='ml-2 text-white text-[14px]'>COOLest Gel Memory Foam</span></span>
              </div>
              <div className='min-w-[240px]'>
                <span className='flex flex-row ml-10'><img src={heroBanner['img-check']} /> <span className='ml-2 text-white text-[14px]'>CertiPUR-US® Certified</span></span>
              </div>
            </div>
            <div className='flex flex-row'>
              <div className='min-w-[240px]'>
                <span className='flex flex-row'><img src={heroBanner['img-check']} /> <span className='ml-2 text-white text-[14px]'>Quick and Easy Setup</span></span>
              </div>
              <div className='min-w-[240px]'>
                <span className='flex flex-row ml-10'><img src={heroBanner['img-check']} /> <span className='ml-2 text-white text-[14px]'>OEKO-TEX® Standard 100</span></span>
              </div>
            </div>
          </div>
          <div>
            <button className='bg-[#db2929] h-auto w-[25vw] mt-[25px] pt-[1.3vh] pb-[1.3vh]  rounded-[5px]'>
              <span className='uppercase text-white font-[500] text-[14px]'>Shop Coolest Gel Mattress</span>
            </button>
          </div>
          <div className='h-[100px] w-[25vw] mt-[25px] flex flex-row justify-between items-center'>
            <div className='h-auto w-auto flex flex-col items-center justify-center text-center pl-[10px]'>
              <img className='h-[50px] w-[40px] object-contain' src={heroBanner['img-moon']} />
              <span className='text-white text-[11px] pt-[10px]'>100 night <br /> risk free trial</span>
            </div>
            <div className='h-auto w-auto flex flex-col items-center justify-center text-center'>
              <img className='h-[50px] w-[40px] object-contain' src={heroBanner['img-car']} />
              <span className='text-white text-[11px] pt-[10px]'>Free Shipping <br /> & Returns </span>
            </div>
            <div className='h-auto w-auto flex flex-col items-center justify-center text-center pr-[10px]'>
              <img className='h-[50px] w-[40px] object-contain' src={heroBanner['img-security']} />
              <span className='text-white text-[11px] pt-[10px]'>Forever <br /> Warranty</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cn("my-10", '2xl:px-[10vw]')}>
        <NextIntlClientProvider locale={locale} messages={{ Product: messages.Product ?? {} }}>
          <ProductCardCarousel
            products={featuredProducts}
            showCart={false}
            showCompare={false}
            title={t('Carousel.featuredProducts')}
          />
          <ProductCardCarousel
            products={newestProducts}
            showCart={false}
            showCompare={false}
            title={t('Carousel.newestProducts')}
          />
        </NextIntlClientProvider>
      </div>

      <div className='w-full h-[auto] flex flex-row flex-wrap'>
        <div className='w-full h-auto pl-[7vw] pr-[7vw]'>
          <h2 className='text-clr 2xl:text-[28px] font-[900]'>Shop Our Best Sellers</h2>
        </div>
        <div className='w-full h-[auto] pl-[7vw] pr-[7vw] flex flex-row items-center justify-between mt-[30px] mb-[30px]'>
          {BestSelling && BestSelling.map(val => {
            return (
              <div className='w-[30%]' key={val.entityId}>
                <div className={cn('relative flex-auto ml-[25px] mr-[25px] border-[1px] flex flex-col items-start justify-end', 'aspect-square')}>
                  {val.defaultImage && (
                    <BcImage
                      alt={val.defaultImage?.altText}
                      className="object-contain"
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1536px) 25vw, 500px"
                      src={val.defaultImage?.url}
                    />
                  )}
                </div>
                <div className='mt-[25px]'>
                  <a href={val.path} className='bg-btnclr text-white px-4 py-2 rounded ml-[25px]'>
                    <span>View Item</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </>
  );
}

export const runtime = 'edge';
