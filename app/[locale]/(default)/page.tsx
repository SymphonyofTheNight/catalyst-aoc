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

      <div className='w-full h-[auto] flex flex-row flex-wrap'>
        <div className='w-full h-auto pl-[7vw] pr-[7vw]'>
          <h2 className='text-clr 2xl:text-[28px] font-[900] pl-[25px]'>Shop Our Best Sellers</h2>
        </div>
        <div className='w-full h-[auto] pl-[7vw] pr-[7vw] flex flex-row items-start justify-between mt-[30px] mb-[30px]'>
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
                <div className='h-auto'>
                  <h2 className='text-clr ml-[25px] mt-[25px] text-[18px] font-[800]'>
                    {val.name}
                  </h2>
                  <p className='ml-[25px]'>
                    {val.plainTextDescription}
                  </p>
                </div>
                <div className='mt-[25px]'>
                  <a href={val.path} className='bg-btnclr text-white px-4 py-2 rounded-[10px] ml-[25px] pl-[50px] pr-[50px] pt-[10px] pb-[10px]'>
                    <span>View Item</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='w-full h-[auto] flex flex-col pl-[8.2vw] pr-[8.2vw] mt-[25px]'>
        <div className='bg-hp-content-bg h-[170px] w-full bg-contain flex flex-col items-center justify-center'>
          <h2 className='text-[28px] text-white font-[800]'>Icon Sleep vs The Competition</h2>
          <p className='text-[20px] font-[400] text-white'>We don't claim we're better. We just offer the same value for less</p>
        </div>

        <div>
          <video width="100%" height="auto" autoPlay loop muted>
            <source src={hpcontent['hp-vid']} type="video/mp4" />
          </video>
        </div>

        <div className='h-auto w-full mt-[25px]'>
          <div className='bg-parallax-1 h-[650px] bg-fixed bg-center bg-no-repeat bg-cover'>
            <div className='h-[650px] w-full flex flex-row justify-start items-center'>
              <div className='bg-kid-sleep h-[650px] w-[50%] bg-center bg-no-repeat bg-cover'></div>
              <div className='h-[650px] w-[50%] flex flex-col items-center justify-center pl-[5%] pr-[5%]'>
                <div>
                  <h4 className='text-[24px] font-[400] text-white uppercase'>
                    WE LEARNED THE HARD WAY!
                  </h4>
                  <p className='text-[18px] font-[400] text-white mt-[25px]'>
                    Buying an overseas mattress may save a few bucks today, but those savings will not help if it needs to be replaced in a few years. We know from experience! Prior to 2018, we imported from China. The quality was inferior and the costs we have saved were not enough to offset all the warranty claims that followed. Today, we proudly manufacture from McDonough, GA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='h-auto w-full mt-[35px] flex flex-row mb-[25px]'>
          <div className='w-[70vw] pr-[35px] relative'>
            <img src={hpcontent['bed-sleep']} />
            <div className='absolute left-0 top-[40%] h-auto w-[100%] pl-[50px]'>
              <div>
                <img src={hpcontent['calendar-img']} />
              </div>
              <div>
                <h3 className='uppercase text-white text-[24px] font-[600] mt-[10px]'>100-Night Sleep Trial</h3>
                <p className='w-[48%] text-white text-[15px] mt-[15px]'>Why settle for a 10-minute mattress trial in-store where everyone's looking when you can try it out for 100 nights in the comfort of your own home?</p>
                <a className='text-blue-400 text-[18px]' href='#'>
                  Learn More...
                </a>
              </div>
            </div>
          </div>
          <div className='w-[30vw] relative'>
            <img className='h-[100%] w-[100%]' src={hpcontent['certified-prod']} />
            <div className='absolute left-0 top-[40%] h-auto w-[100%] pl-[50px]'>
              <div>
                <img src={hpcontent['purified-img']} />
              </div>
              <div>
                <h3 className='uppercase text-[#132448] text-[24px] font-[600] mt-[10px] tracking-[4px] leading-[1.3]'>CERTIFIED <br />
                  PRODUCTS</h3>
                <p className='w-[100%] text-[#132448] text-[15px] mt-[15px]'>
                  Our mattresses are <span className='font-[900]'>CertiPUR-US®</span> and <br /> STANDARD 100 <span className='font-[900]'> OEKO-TEX® certified.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='h-auto w-full mt-[15px] flex flex-row mb-[25px]'>
          <div className='w-[30vw] relative'>
            <img className='h-[100%] w-[100%]' src={hpcontent['sofa-img']} />
            <div className='absolute left-0 top-[40%] h-auto w-[100%] pl-[50px]'>
              <div>
                <img src={hpcontent['loop-img']} />
              </div>
              <div>
                <h3 className='uppercase text-white text-[24px] font-[600] mt-[10px] tracking-[4px] leading-[1.3]'>FOREVER <br />
                  WARRANTY</h3>
                <p className='w-[100%] text-white text-[15px] mt-[15px]'>
                  Icon Sleep products come with an honest <br />
                  Forever warranty.
                </p>
              </div>
            </div>
          </div>
          <div className='w-[70vw] pl-[35px] relative'>
            <img src={hpcontent['matt-img']} />
            <div className='absolute left-0 top-[40%] h-auto w-[100%] pl-[90px]'>
              <div>
                <img src={hpcontent['stack-img']} />
              </div>
              <div>
                <h3 className='uppercase text-white text-[24px] font-[600] mt-[10px]'>100-Night Sleep Trial</h3>
                <p className='w-[48%] text-white text-[15px] mt-[15px]'>Why settle for a 10-minute mattress trial in-store where everyone's looking when you can try it out for 100 nights in the comfort of your own home?</p>
                <a className='text-blue-400 text-[18px]' href='#'>
                  Learn More...
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-red-700 h-auto w-full flex flex-row relative'>
          <div>
            <img src={hpcontent['affirm-img']} />
          </div>
          <div className='absolute h-[200px] min-w-[250px] transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[30%]'>
            <h2 className='flex flex-row text-[#132448] font-[800] leading-[1.5] text-[25px]'>
              Buy Now, pay later. <br />
            </h2>
            <h2 className='flex flex-row items-end justify-center text-[#132448] font-[800] leading-[1] text-[25px]'>
              <img className='mr-[15px]' src={hpcontent['text-affirm']} /> is now available.
            </h2>
            <div className='h-auto w-full mt-[25px]'>
              <span className='text-[#132448] font-[400]'>
                Buying a new Icon Sleep is easier than ever <br />
                thanks to flexible financing by Affirm.
              </span>
            </div>
            <button className='bg-clr pt-[.5em] pb-[.5em] pl-[3.5em] pr-[3.5em] rounded-[10px] tracking-[1px] flex mt-[15px]'>
              <span className='text-white'>Learn More</span>
            </button>
          </div>
        </div>

        <div className='flex flex-row items-center justify-between mt-[25px] mb-[25px]'>
          <div className='bg-parallax-2 h-[370px] w-[32.2%] bg-fixed bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center'>
            <img src={hpcontent['truck-img']} />
            <h2 className='text-white text-[20px] mt-[1.5rem] mb-[.78571rem]'>Free Shipping & Returns</h2>
            <p className='text-center text-white'>
              Rest easy as we deliver your mattress right at <br /> your doorstep for free – always on time, <br /> anywhere in the US.
            </p>
          </div>
          <div className='bg-parallax-2 h-[370px] w-[32.2%] bg-fixed bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center'>
            <img src={hpcontent['scroll-img']} />
            <h2 className='text-white text-[20px] mt-[1.5rem] mb-[.78571rem]'>Quick & Easy Setup</h2>
            <p className='text-center text-white'>
              The mattress can be used within a few minutes <br /> upon opening the package. Setup is just a few <br /> easy steps.
            </p>
          </div>
          <div className='bg-parallax-2 h-[370px] w-[32.2%] bg-fixed bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center'>
            <img src={hpcontent['lifetime-img']} />
            <h2 className='text-white text-[20px] mt-[1.5rem] mb-[.78571rem]'>Forever Warranty</h2>
            <p className='text-center text-white'>
              Feel safe and secure with our Forever Warranty <br /> that covers defects in workmanship and <br /> materials. Warranty policies apply.
            </p>
          </div>
        </div>
      </div>

      <Slider />

      <div className='h-auto mt-[25px] mb-[25px] pl-[8vw] pr-[8vw] flex flex-row'>
        <div className='w-[35%] flex flex-col items-start justify-center'>
          <h2 className='text-[#132448] font-[700] text-[28px] leading-[24px]'>
            Still in doubt?
            <br />
            Put us to the test.
          </h2>
          <p className='text-[#132448] font-[900] text-[16px] mt-[16px] mb-[16px]'>
            Jaw-dropping prices, same
            <br />
            iconic experience.
          </p>
          <button>
            <span className='text-white font-[400] capitalize inline-block bg-[#264da3] border-[#264da3] pt-[12px] pb-[12px] pl-[115px] pr-[115px] rounded-[8px] text-center'>
              Shop Mattresses
            </span>
          </button>
        </div>
        <div className='bg-white w-[65%] flex flex-row items-center justify-start'>
          <img className='h-[22.5rem] w-auto object-contain' src={hpcontent['bed-img']} />
        </div>
      </div>

      <div className='pl-[8vw] pr-[8vw] mt-[75px]'>
        <h2 className='text-[#132448] font-[900] inline text-[25px]'>Have questions?</h2>
        <p className='text-[#132448] font-[699] inline text-[20px] ml-[1rem]'>Here are some frequently asked questions.</p>
        <div className='flex flex-wrap justify-between w-[90%] m-auto pt-[5px]'>
          {FaqArr && FaqArr.map(item => {
            return (
              <div className='w-[48%] mt-[25px]' key={item.id}>
                <div className='flex items-center'>
                  <img src='https://cdn11.bigcommerce.com/s-z2qdisybty/product_images/uploaded_images/question-mark-icon.png?t=1647925466&_gl=1*8pzu4b*_ga*Nzk0NzIwMzUxLjE2NDY2MzgxMzc.*_ga_WS2VZYPC6G*MTY0NzkyNTA4Mi41MS4xLjE2NDc5MjU0NTUuNTU.' />
                  <h2 className='ml-[1rem] text-[#132448] font-[600] mt-[0px] text-[20px]'>
                    {item.title}
                  </h2>
                </div>
                <p className='border-l-[#264da3] border-t-[#fff] border-b-[#fff] border-r-[#fff] border-[1px] pl-[2rem] ml-[1rem] mt-[16px] mb-[16px]'>
                  {item.text}
                  <br />
                  <br />
                  <a className='text-[#264da3] font-[700]' href='#'>
                    Read More
                  </a>
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className='bg-[#11298a]'>
        <div className='w-[75%] mx-auto py-5'>
          <h2 className='text-center font-[700] text-inherit mt-[0px] tracking-[.25px] mb-[.78571rem] text-[25px] !text-white'>
            Get In Touch
          </h2>
          <p className='text-white text-center text-[18px] mb-[1.5em]'>
            We keep our lines open to customers who need assistance.
            <br />
            Feel free to reach us by using this inquiry form or by visiting our Support Center.
          </p>
          <button className='h-auto w-auto bg-white'>
            <span className='py-[14px] px-[25px] inline-block text-center'>
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
