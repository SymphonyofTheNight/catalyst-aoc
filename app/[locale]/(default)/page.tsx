import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
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

//! DYNAMICALLY IMPORT
const Slider = dynamic(() => import('./custom-template/SlickSlider'), {
  ssr: false,
});

//! import arr
import { heroBanner } from './ArrData/HeroBanner'
import { hpcontent } from './ArrData/HomepageArr'
import { FaqArr } from './ArrData/Faq'

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

  return (
    <>
      {/* <Hero /> */}

      {/* custom elem hero banner */}
      <div className='w-auto xl:h-[45vw] xxs:h-[43vw] bg-hero-bg lg:bg-contain xxs:bg-cover flex items-center justify-start bg-no-repeat'>
        <div className='h-auto w-auto 3xl:ml-[5vw] 2xl:ml-[5vw] xl:ml-[5vw] md:ml-[5vw] 2xl:mb-5 flex flex-col justify-start items-start lg:block xxs:hidden'>
          <div className='flex flex-row sm:flex-nowrap xxs:flex-wrap items-center'>
            <img className='h-auto xxs:w-[25%]' src={heroBanner['img-stars']} />
            <span className='text-white 3xl:text-[14px] 2xl:text-[14px] xl:text-[12px] md:text-[12px]'>
              (749)
            </span>
          </div>
          <span className='text-white text-left leading-[1.3] tracking-[2px] mt-[10px] font-[600] 3xl:text-[50px] 2xl:text-[43px] xl:text-[40px] md:text-[40px]'>
            Most Affordable <br /> USA Made Mattress
          </span>
          <div>
            <div className='flex flex-row mt-[19px]'>
              <div className='min-w-[240px]'>
                <span className='flex flex-row'><img src={heroBanner['img-check']} /> <span className='ml-2 flex items-center text-white 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] md:text-[11px]'>COOLest Gel Memory Foam</span></span>
              </div>
              <div className='min-w-[240px]'>
                <span className='flex flex-row ml-10'><img src={heroBanner['img-check']} /> <span className='ml-2 flex items-center text-white 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] md:text-[11px]'>CertiPUR-US® Certified</span></span>
              </div>
            </div>
            <div className='flex flex-row'>
              <div className='min-w-[240px]'>
                <span className='flex flex-row'><img src={heroBanner['img-check']} /> <span className='ml-2 flex items-center text-white 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] md:text-[11px]'>Quick and Easy Setup</span></span>
              </div>
              <div className='min-w-[240px]'>
                <span className='flex flex-row ml-10'><img src={heroBanner['img-check']} /> <span className='ml-2 flex items-center text-white 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] md:text-[11px]'>OEKO-TEX® Standard 100</span></span>
              </div>
            </div>
          </div>
          <div>
            <button className='bg-[#db2929] h-auto xl:w-[25vw] md:w-[32vw] mt-[25px] xl:pt-[1.3vh] xl:pb-[1.3vh] md:pt-[.6vh] md:pb-[.6vh] rounded-[5px]'>
              <span className='uppercase text-white font-[500] 3xl:text-[14px] 2xl:text-[12px] xl:text-[11px] md:text-[11px]'>Shop Coolest Gel Mattress</span>
            </button>
          </div>
          <div className='h-[100px] xl:w-[25vw] md:w-[32vw] mt-[25px] flex flex-row justify-between items-center'>
            <div className='h-auto w-auto flex flex-col items-center justify-center text-center pl-[10px]'>
              <img className='xl:h-[50px] xl:w-[40px] md:h-[auto] md:w-[30px] object-contain' src={heroBanner['img-moon']} />
              <span className='text-white text-[11px] pt-[10px]'>100 night <br /> risk free trial</span>
            </div>
            <div className='h-auto w-auto flex flex-col items-center justify-center text-center'>
              <img className='xl:h-[50px] xl:w-[40px] md:h-[auto] md:w-[37px] object-contain' src={heroBanner['img-car']} />
              <span className='text-white text-[11px] pt-[10px]'>Free Shipping <br /> & Returns </span>
            </div>
            <div className='h-auto w-auto flex flex-col items-center justify-center text-center pr-[10px]'>
              <img className='xl:h-[50px] xl:w-[40px] md:h-[auto] md:w-[28px] object-contain' src={heroBanner['img-security']} />
              <span className='text-white text-[11px] pt-[10px]'>Forever <br /> Warranty</span>
            </div>
          </div>
        </div>
      </div>
      <div className='xxs:block lg:hidden bg-[#132448] h-auto w-full xxs:py-[3rem]'>
        <div className='h-auto w-auto 3xl:ml-[5vw] 2xl:ml-[5vw] lg:ml-[5vw] 2xl:mb-5 flex flex-col justify-start items-center lg:hidden xxs:flex'>
          <div className='flex flex-row sm:flex-nowrap xxs:flex-wrap items-center justify-center'>
            <img className='h-auto xxs:w-[50%]' src={heroBanner['img-stars']} />
            <span className='text-white 3xl:text-[14px] 2xl:text-[14px] xl:text-[12px] md:text-[12px]'>
              (749)
            </span>
          </div>
          <span className='text-white lg:text-left xxs:text-center leading-[1.3] tracking-[2px] mt-[10px] font-[600] 3xl:text-[50px] 2xl:text-[43px] xl:text-[40px] sm:text-[40px] xs:text-[30px] xxs:text-[35px]'>
            Most Affordable <br /> USA Made Mattress
          </span>

          <div className='xxs:hidden sm:block'>
            <div className='flex flex-row mt-[19px]'>
              <div className='min-w-[240px]'>
                <span className='flex flex-row'><img src={heroBanner['img-check']} /> <span className='ml-2 flex items-center text-white 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] xxs:text-[11px]'>COOLest Gel Memory Foam</span></span>
              </div>
              <div className='min-w-[240px]'>
                <span className='flex flex-row ml-10'><img src={heroBanner['img-check']} /> <span className='ml-2 flex items-center text-white 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] xxs:text-[11px]'>CertiPUR-US® Certified</span></span>
              </div>
            </div>
            <div className='flex flex-row'>
              <div className='min-w-[240px]'>
                <span className='flex flex-row'><img src={heroBanner['img-check']} /> <span className='ml-2 flex items-center text-white 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] xxs:text-[11px]'>Quick and Easy Setup</span></span>
              </div>
              <div className='min-w-[240px]'>
                <span className='flex flex-row ml-10'><img src={heroBanner['img-check']} /> <span className='ml-2 flex items-center text-white 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] xxs:text-[11px]'>OEKO-TEX® Standard 100</span></span>
              </div>
            </div>
          </div>

          <div className='xxs:block sm:hidden'>
            <div className='flex flex-col mt-[19px]'>
              <div>
                <span className='flex flex-row'><img src={heroBanner['img-check']} /> <span className='ml-2 flex items-center text-white 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] xxs:text-[11px]'>COOLest Gel Memory Foam</span></span>
              </div>
              <div>
                <span className='flex flex-row'><img src={heroBanner['img-check']} /> <span className='ml-2 flex items-center text-white 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] xxs:text-[11px]'>CertiPUR-US® Certified</span></span>
              </div>
            </div>
            <div className='flex flex-col'>
              <div>
                <span className='flex flex-row'><img src={heroBanner['img-check']} /> <span className='ml-2 flex items-center text-white 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] xxs:text-[11px]'>Quick and Easy Setup</span></span>
              </div>
              <div>
                <span className='flex flex-row'><img src={heroBanner['img-check']} /> <span className='ml-2 flex items-center text-white 3xl:text-[14px] 2xl:text-[12px] xl:text-[10px] xxs:text-[11px]'>OEKO-TEX® Standard 100</span></span>
              </div>
            </div>
          </div>

          <div>
            <button className='bg-[#db2929] h-auto xl:w-[25vw] sm:w-[40vw] xxs:w-[70vw] mt-[25px] xl:py-[1.3vh] xxs:py-[.6vh] rounded-[5px]'>
              <span className='uppercase text-white font-[500] 3xl:text-[14px] 2xl:text-[12px] xl:text-[11px] xxs:text-[11px]'>Shop Coolest Gel Mattress</span>
            </button>
          </div>
          <div className='h-[100px] xl:w-[25vw] sm:w-[40vw] xxs:w-[80vw] mt-[10px] flex flex-row justify-between items-center'>
            <div className='h-auto w-auto flex flex-col items-center justify-center text-center pl-[10px]'>
              <img className='xl:h-[50px] xl:w-[40px] md:h-[auto] xxs:w-[27px] object-contain' src={heroBanner['img-moon']} />
              <span className='text-white text-[11px] pt-[10px]'>100 night <br /> risk free trial</span>
            </div>
            <div className='h-auto w-auto flex flex-col items-center justify-center text-center'>
              <img className='xl:h-[50px] xl:w-[40px] md:h-[auto] xxs:w-[33px] object-contain' src={heroBanner['img-car']} />
              <span className='text-white text-[11px] pt-[10px]'>Free Shipping <br /> & Returns </span>
            </div>
            <div className='h-auto w-auto flex flex-col items-center justify-center text-center pr-[10px]'>
              <img className='xl:h-[50px] xl:w-[40px] md:h-[auto] xxs:w-[25px] object-contain' src={heroBanner['img-security']} />
              <span className='text-white text-[11px] pt-[10px]'>Forever <br /> Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={cn("my-10", '2xl:px-[10vw]')}>
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
      </div> */}

      <div className='w-full h-[auto] flex flex-row flex-wrap xl:mt-[0px] xxs:mt-[30px]'>
        <div className='w-full h-auto md:px-[3vw]'>
          <h2 className='text-clr font-[900] pl-[25px] 3xl:text-[28px] 2xl:text-[28px] xl:text-[25px] sm:text-[25px] xxs:text-[20px]'>Shop Our Best Sellers</h2>
        </div>
        <div className='w-full h-[auto] xl:pl-[7vw] xl:pr-[7vw] md:pl-[3.3vw] md:pr-[3.3vw] flex flex-row sm:flex-nowrap xxs:flex-wrap items-start justify-between mt-[30px] mb-[30px]'>
          {BestSelling && BestSelling.map(val => {
            return (
              <div className='md:w-[30%] sm:w-[50%] xxs:w-[100%] sm:py-[1em] xxs:py-[1em]' key={val.entityId}>
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
                <div className='h-auto'>
                  <h2 className='text-clr ml-[25px] mt-[25px] font-[800] xl:text-[18px] xxs:text-[15px]'>
                    {val.name}
                  </h2>
                  <p className='ml-[25px] 3xl:text-[14px] 2xl:text-[14px] xl:text-[13px] xxs:text-[12px]'>
                    {val.plainTextDescription}
                  </p>
                </div>
                <div className='mt-[25px]'>
                  <a href={val.path} className='bg-btnclr text-white px-4 py-2 rounded-[10px] ml-[25px] pl-[50px] pr-[50px] pt-[10px] pb-[10px]'>
                    <span className='3xl:text-[14px] 2xl:text-[14px] xl:text-[13px] xxs:text-[12px]'>View Item</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='w-full h-[auto] flex flex-col xl:pl-[8.2vw] xl:pr-[8.2vw] sm:px-[6vw] xxs:px-[6vw] mt-[25px]'>
        <div className='bg-hp-content-bg sm:h-[170px] xxs:h-[110px] w-full bg-contain flex flex-col items-center justify-center'>
          <h2 className='sm:text-[28px] xs:text-[20px] xxs:text-[17px] text-white font-[800]'>Icon Sleep vs The Competition</h2>
          <p className='sm:text-[20px] xs:text-[14px] xxs:text-[12px] font-[400] text-white text-center'>We don't claim we're better. We just offer the same value for less</p>
        </div>

        <div>
          <video width="100%" height="auto" autoPlay loop muted>
            <source src={hpcontent['hp-vid']} type="video/mp4" />
          </video>
        </div>

        <div className='h-auto w-full mt-[25px]'>
          <div className='bg-parallax-1 xl:h-[650px] md:h-auto bg-fixed bg-center bg-no-repeat bg-cover'>
            <div className='xl:h-[650px] md:h-auto w-full flex flex-row sm:flex-nowrap xxs:flex-wrap justify-start items-center'>
              <div className='bg-kid-sleep xl:h-[650px] sm:h-[350px] xxs:h-[250px] sm:w-[50%] xxs:w-[100%] bg-center bg-no-repeat bg-cover'></div>
              <div className='xl:h-[650px] md:h-[350px] sm:w-[50%] xxs:w-[100%] flex flex-col items-center justify-center sm:py-[0px] xxs:py-[2rem] pl-[5%] pr-[5%]'>
                <div>
                  <h4 className='font-[400] text-white uppercase 3xl:text-[24px] 2xl:text-[20px] xl:text-[20px] sm:text-[15px] xxs:text-[15px]'>
                    WE LEARNED THE HARD WAY!
                  </h4>
                  <p className='font-[400] text-white mt-[25px] 3xl:text-[18px] 2xl:text-[16px] xl:text-[14px] sm:text-[13px] xxs:text-[13px]'>
                    Buying an overseas mattress may save a few bucks today, but those savings will not help if it needs to be replaced in a few years. We know from experience! Prior to 2018, we imported from China. The quality was inferior and the costs we have saved were not enough to offset all the warranty claims that followed. Today, we proudly manufacture from McDonough, GA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='h-auto w-full mt-[35px] flex flex-row sm:flex-nowrap xxs:flex-wrap mb-[25px]'>
          <div className='bg-bed-sleep bg-no-repeat bg-center bg-cover xl:h-[500px] xl:w-[70vw] xxs:h-[350px] sm:w-[50vw] xxs:w-[100vw] pr-[35px] xl:mr-[0px] sm:mr-[5px] relative'>
            <div className='absolute left-0 xl:!top-[40%] md:!top-[17%] sm:!top-[12%] xxs:!top-[18%] h-auto w-[100%] 3xl:pl-[50px] 2xl:pl-[40px] xl:pl-[40px] xxs:pl-[25px]'>
              <div>
                <img className='h-auto 3xl:w-[auto] xl:w-[80px] xxs:w-[70px] object-contain' src={hpcontent['calendar-img']} />
              </div>
              <div>
                <h3 className='uppercase text-white font-[600] mt-[10px] 3xl:text-[24px] 2xl:text-[20px] sm:text-[17px] xxs:text-[15px]'>100-Night Sleep Trial</h3>
                <p className='w-[48%] text-white mt-[15px] 3xl:text-[15px] 2xl:text-[13px] sm:text-[12px] xxs:text-[12px] xl:mb-[0px] md:mb-[5px]'>Why settle for a 10-minute mattress trial in-store where everyone's looking when you can try it out for 100 nights in the comfort of your own home?</p>
                <a className='text-blue-400 3xl:text-[18px] 2xl:text-[15px] sm:text-[14px] xxs:text-[14px]' href='#'>
                  Learn More...
                </a>
              </div>
            </div>
          </div>
          <div className='bg-certified-prod bg-no-repeat bg-center bg-cover xl:h-[500px] xl:w-[30vw] xxs:h-[350px] sm:w-[50vw] xxs:w-[100vw] xl:ml-[0px] sm:ml-[5px] relative'>
            <div className='absolute left-0 xl:top-[42%] sm:top-[35%] xxs:top-[33%] h-auto w-[100%] 3xl:pl-[50px] 2xl:pl-[40px] xl:pl-[35px] xxs:pl-[25px]'>
              <div>
                <img className='h-auto 2xl:w-[95px] xl:w-[85px] xxs:w-[70px] object-contain' src={hpcontent['purified-img']} />
              </div>
              <div>
                <h3 className='uppercase text-[#132448] font-[600] mt-[10px] tracking-[4px] leading-[1.3] 3xl:text-[24px] 2xl:text-[20px] sm:text-[17px] xxs:text-[15px]'>
                  CERTIFIED <br />
                  PRODUCTS</h3>
                <p className='w-[100%] text-[#132448] mt-[15px] 3xl:text-[15px] 2xl:text-[13px] sm:text-[12px] xxs:text-[12px]'>
                  Our mattresses are <span className='font-[900]'>CertiPUR-US®</span> and <br /> STANDARD 100 <span className='font-[900]'> OEKO-TEX® certified.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='h-auto w-full mt-[15px] flex flex-row sm:flex-nowrap xxs:flex-wrap mb-[25px]'>
          <div className='bg-sofa-img bg-no-repeat bg-center bg-cover xl:h-[500px] xxs:h-[350px] sm:w-[50vw] xxs:w-[100vw] xl:mr-[0px] sm:mr-[5px] relative'>
            <div className='absolute left-0 xl:top-[40%] sm:top-[20%] xxs:top-[25%] h-auto w-[100%] lg:pl-[50px] xxs:pl-[25px]'>
              <div>
                <img className='h-auto 3xl:w-[auto] xl:w-[80px] xxs:w-[70px] object-contain' src={hpcontent['loop-img']} />
              </div>
              <div>
                <h3 className='uppercase text-white font-[600] mt-[10px] tracking-[4px] leading-[1.3] 3xl:text-[24px] 2xl:text-[20px] sm:text-[17px] xxs:text-[15px]'>FOREVER <br />
                  WARRANTY</h3>
                <p className='w-[100%] text-white text-[15px] mt-[15px] 3xl:text-[15px] 2xl:text-[13px] sm:text-[12px] xxs:text-[12px]'>
                  Icon Sleep products come with an honest <br />
                  Forever warranty.
                </p>
              </div>
            </div>
          </div>
          <div className='bg-stack-img bg-no-repeat bg-center bg-cover xl:h-[500px] xxs:h-[350px] sm:w-[50vw] xxs:w-[100vw] pl-[35px] xl:ml-[0px] sm:ml-[5px] relative'>
            <div className='absolute left-0 xl:top-[40%] xxs:top-[25%] h-auto w-[100%] xl:pl-[90px] lg:pl-[50px] xxs:pl-[25px]'>
              <div>
                <img className='h-auto 3xl:w-[auto] xl:w-[80px] xxs:w-[70px] object-contain' src={hpcontent['stack-img']} />
              </div>
              <div>
                <h3 className='uppercase text-white font-[600] mt-[10px] 3xl:text-[24px] 2xl:text-[20px] sm:text-[17px] xxs:text-[15px]'>100-Night Sleep Trial</h3>
                <p className='xl:w-[48%] md:w-[55%] text-white mt-[15px] 3xl:text-[15px] 2xl:text-[13px] sm:text-[12px] xxs:text-[12px] sm:pr-[0px] xxs:pr-[50px]'>Why settle for a 10-minute mattress trial in-store where everyone's looking when you can try it out for 100 nights in the comfort of your own home?</p>
                <a className='text-blue-400 3xl:text-[18px] 2xl:text-[15px] xl:text-[13px] sm:text-[14px] xxs:text-[13px]' href='#'>
                  Learn More...
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='h-auto w-full flex flex-row relative'>
          <div>
            <img src={hpcontent['affirm-img']} />
          </div>
          <div className='absolute h-[200px] min-w-[250px] transform -translate-x-1/2 -translate-y-1/2 xl:top-[50%] sm:top-[57%] 3xl:left-[30%] 2xl:left-[27%] xl:left-[26%] sm:left-[27%] flex flex-col items-start xxs:hidden sm:flex'>
            <h2 className='flex flex-row text-[#132448] font-[800] leading-[1.5] 2xl:text-[25px] xl:text-[21px]'>
              Buy Now, pay later. <br />
            </h2>
            <h2 className='flex flex-row items-end justify-center text-[#132448] font-[800] leading-[1] 2xl:text-[25px] xl:text-[21px]'>
              <img className='mr-[15px] h-auto 3xl:w-auto 2xl:w-[80px] lg:w-[80px] sm:w-[70px]' src={hpcontent['text-affirm']} /> is now available.
            </h2>
            <div className='h-auto w-full lg:mt-[25px] sm:mt-[10px]'>
              <span className='text-[#132448] font-[400] 3xl:text-[16px] 2xl:text-[14px] lg:text-[14px] sm:text-[12px]'>
                Buying a new Icon Sleep is easier than ever <br />
                thanks to flexible financing by Affirm.
              </span>
            </div>
            <button className='bg-clr pt-[.5em] pb-[.5em] pl-[3.5em] pr-[3.5em] rounded-[10px] tracking-[1px] flex mt-[15px]'>
              <span className='text-white 3xl:text-[16px] xl:text-[14px]'>Learn More</span>
            </button>
          </div>
        </div>
        <div className='h-auto w-[100%] xxs:flex sm:hidden items-center justify-start'>
          <div className='h-auto min-w-[250px] flex flex-col items-start py-[1rem]'>
            <h2 className='flex flex-row text-[#132448] font-[800] leading-[1.5] 2xl:text-[25px] xl:text-[21px]'>
              Buy Now, pay later. <br />
            </h2>
            <h2 className='flex flex-row items-end justify-center text-[#132448] font-[800] leading-[1] 2xl:text-[25px] xl:text-[21px]'>
              <img className='mr-[15px] h-auto 3xl:w-auto 2xl:w-[80px] lg:w-[80px] sm:w-[70px]' src={hpcontent['text-affirm']} /> is now available.
            </h2>
            <div className='h-auto w-full lg:mt-[25px] sm:mt-[10px]'>
              <span className='text-[#132448] font-[400] 3xl:text-[16px] 2xl:text-[14px] lg:text-[14px] sm:text-[12px]'>
                Buying a new Icon Sleep is easier than ever <br />
                thanks to flexible financing by Affirm.
              </span>
            </div>
            <button className='bg-clr pt-[.5em] pb-[.5em] pl-[3.5em] pr-[3.5em] rounded-[10px] tracking-[1px] flex mt-[15px]'>
              <span className='text-white 3xl:text-[16px] xl:text-[14px]'>Learn More</span>
            </button>
          </div>
        </div>

        <div className='flex flex-row xxs sm:flex-nowrap xxs:flex-wrap items-center lg:justify-between sm:justify-around mt-[25px] mb-[25px]'>
          <div className='bg-parallax-2 h-[370px] lg:w-[32.2%] sm:w-[48%] xxs:w-[100%] lg:my-[0rem] xxs:my-[.3rem] bg-fixed bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center'>
            <img className='h-auto 3xl:w-auto 2xl:w-[120px] sm:w-[100px] object-contain' src={hpcontent['truck-img']} />
            <h2 className='text-white mt-[1.5rem] mb-[.78571rem] 3xl:text-[20px] 2xl:text-[17px] sm:text-[17px]'>Free Shipping & Returns</h2>
            <p className='text-center text-white 3xl:text-[14px] 2xl:text-[14px] sm:text-[12px]'>
              Rest easy as we deliver your mattress right at <br /> your doorstep for free – always on time, <br /> anywhere in the US.
            </p>
          </div>
          <div className='bg-parallax-2 h-[370px] lg:w-[32.2%] sm:w-[48%] xxs:w-[100%] lg:my-[0rem] xxs:my-[.3rem] bg-fixed bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center'>
            <img className='h-auto 3xl:w-auto 2xl:w-[120px] sm:w-[100px] object-contain' src={hpcontent['scroll-img']} />
            <h2 className='text-white mt-[1.5rem] mb-[.78571rem] 3xl:text-[20px] 2xl:text-[17px] sm:text-[17px]'>Quick & Easy Setup</h2>
            <p className='text-center text-white 3xl:text-[14px] 2xl:text-[14px] sm:text-[12px]'>
              The mattress can be used within a few minutes <br /> upon opening the package. Setup is just a few <br /> easy steps.
            </p>
          </div>
          <div className='bg-parallax-2 h-[370px] lg:w-[32.2%] sm:w-[48%] xxs:w-[100%] lg:my-[0rem] xxs:my-[.3rem] bg-fixed bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center'>
            <img className='h-auto 3xl:w-auto 2xl:w-[120px] sm:w-[100px] object-contain' src={hpcontent['lifetime-img']} />
            <h2 className='text-white mt-[1.5rem] mb-[.78571rem] 3xl:text-[20px] 2xl:text-[17px] sm:text-[17px]'>Forever Warranty</h2>
            <p className='text-center text-white 3xl:text-[14px] 2xl:text-[14px] sm:text-[12px]'>
              Feel safe and secure with our Forever Warranty <br /> that covers defects in workmanship and <br /> materials. Warranty policies apply.
            </p>
          </div>
        </div>
      </div>

      <Slider />

      <div className='h-auto 2xl:mt-[25px] xl:mt-[0px] 2xl:mb-[25px] xl:mb-[0px] lg:px=[8vw] xxs:px-[7vw] flex flex-row'>
        <div className='w-[35%] flex flex-col items-start justify-center xxs:hidden lg:flex'>
          <h2 className='text-[#132448] font-[700] leading-[24px] 2xl:text-[28px] xl:text-[25px]'>
            Still in doubt?
            <br />
            Put us to the test.
          </h2>
          <p className='text-[#132448] font-[900] mt-[16px] mb-[16px] 2xl:text-[16px] xl:text-[14px]'>
            Jaw-dropping prices, same
            <br />
            iconic experience.
          </p>
          <button>
            <span className='text-white font-[400] capitalize inline-block bg-[#264da3] border-[#264da3] pt-[12px] pb-[12px] 2xl:pl-[115px] 2xl:pr-[115px] xl:pl-[90px] xl:pr-[90px] md:pl-[50px] md:pr-[50px] rounded-[8px] text-center'>
              Shop Mattresses
            </span>
          </button>
        </div>
        <div className='bg-white lg:w-[65%] xxs:w-[100%] lg:mt-[0px] xxs:mt-[4vh] lg:my-[0rem] flex flex-row items-center justify-start'>
          <img className='xl:h-[22.5rem] lg:h-[15.5rem] xxs:h-auto w-auto object-contain' src={hpcontent['bed-img']} />
        </div>
      </div>
      <div className='px-[7vw] my-[1.5rem] pb-[2rem]'>
        <div className='w-[100%] flex flex-col items-start justify-center xxs:flex lg:hidden'>
          <h2 className='text-[#132448] font-[700] leading-[24px] 2xl:text-[28px] xl:text-[25px] sm:text-[23px] xxs:text-[23px]'>
            Still in doubt?
            <br />
            Put us to the test.
          </h2>
          <p className='text-[#132448] font-[900] mt-[16px] mb-[16px] 2xl:text-[16px] xl:text-[14px]'>
            Jaw-dropping prices, same
            <br />
            iconic experience.
          </p>
          <button>
            <span className='text-white font-[400] capitalize inline-block bg-[#264da3] border-[#264da3] pt-[12px] pb-[12px] 2xl:pl-[115px] 2xl:pr-[115px] xl:pl-[80px] xl:pr-[80px] xxs:pl-[20vw] xxs:pr-[20vw] rounded-[5px] text-center'>
              Shop Mattresses
            </span>
          </button>
        </div>
      </div>

      <div className='pl-[8vw] pr-[8vw] 2xl:mt-[75px] xl:mt-[0px]'>
        <h2 className='text-[#132448] font-[900] inline 2xl:text-[25px] xl:text-[22px] sm:text-[20px]'>Have questions?</h2>
        <p className='text-[#132448] font-[699] inline ml-[1rem] 2xl:text-[20px] xl:text-[17px]'>Here are some frequently asked questions.</p>
        <div className='flex flex-wrap justify-between lg:w-[90%] xxs:w-[100%] m-auto pt-[5px]'>
          {FaqArr && FaqArr.map(item => {
            return (
              <div className='sm:w-[48%] xxs:w-[100%] mt-[25px]' key={item.id}>
                <div className='flex items-center'>
                  <img src='https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/question-mark-icon.png?t=1647925466&_gl=1*8pzu4b*_ga*Nzk0NzIwMzUxLjE2NDY2MzgxMzc.*_ga_WS2VZYPC6G*MTY0NzkyNTA4Mi41MS4xLjE2NDc5MjU0NTUuNTU.' />
                  <h2 className='ml-[1rem] text-[#132448] font-[600] mt-[0px] 2xl:text-[20px] xl:text-[17px]'>
                    {item.title}
                  </h2>
                </div>
                <p className='border-l-[#264da3] border-t-[#fff] border-b-[#fff] border-r-[#fff] border-[1px] pl-[2rem] ml-[1rem] mt-[16px] mb-[16px] 2xl:text-[16px] xl:text-[15px]'>
                  {item.text}
                  <br />
                  <br />
                  <a className='text-[#264da3] font-[700] 2xl:text-[16px] xl:text-[15px]' href='#'>
                    Read More
                  </a>
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className='bg-[#11298a]'>
        <div className='w-[75%] mx-auto 2xl:py-[3rem] xxs:py-[2.5rem] grid'>
          <h2 className='text-center font-[700] text-inherit mt-[0px] tracking-[.25px] mb-[.78571rem] !text-white 2xl:text-[25px] xl:text-[22px] xxs:text-[23px]'>
            Get In Touch
          </h2>
          <p className='text-white text-center mb-[1.5em] 2xl:text-[18px] xl:text-[15px] xxs:text-[13px]'>
            We keep our lines open to customers who need assistance.
            <br />
            Feel free to reach us by using this inquiry form or by visiting our Support Center.
          </p>
          <button className='bg-white inline-flex mx-auto rounded-[5px]'>
            <span className='py-[14px] px-[25px] inline-block text-center font-[700] 2xl:text-[16px] xl:text-[14px]'>
              Get In Touch
            </span>
          </button>
        </div>
      </div>

      <div id="stamped-main-widget"
        data-product-id="##product.id##"
        data-name="##product.title##"
        data-url="##product.url##"
        data-image-url="##product.image##"
        data-description="##product.description##"
        data-product-sku="##product.handle##">
      </div>

    </>
  );
}

export const runtime = 'edge';
