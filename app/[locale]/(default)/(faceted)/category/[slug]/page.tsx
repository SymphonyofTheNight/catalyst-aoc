import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Breadcrumbs } from '~/components/breadcrumbs';
import { ProductCard } from '~/components/product-card';
import { Pagination } from '~/components/ui/pagination';
import { LocaleType } from '~/i18n';

import { FacetedSearch } from '../../_components/faceted-search';
import { MobileSideNav } from '../../_components/mobile-side-nav';
import { SortBy } from '../../_components/sort-by';
import { fetchFacetedSearch } from '../../fetch-faceted-search';

import { CategoryViewed } from './_components/category-viewed';
import { SubCategories } from './_components/sub-categories';
import { getCategoryPageData } from './page-data';

//! custom import
import { cn } from '~/lib/utils';
import { categoryImgArr } from '../../../ArrData/categoryImgArr';

interface Props {
  params: {
    slug: string;
    locale: LocaleType;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryId = Number(params.slug);

  const data = await getCategoryPageData({
    categoryId,
  });

  const category = data.category;

  if (!category) {
    return {};
  }

  const { pageTitle, metaDescription, metaKeywords } = category.seo;

  return {
    title: pageTitle || category.name,
    description: metaDescription,
    keywords: metaKeywords ? metaKeywords.split(',') : null,
  };
}

export default async function Category({ params: { locale, slug }, searchParams }: Props) {

  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Category' });
  const messages = await getMessages({ locale });

  const categoryId = Number(slug);

  const [{ category, categoryTree }, search] = await Promise.all([
    getCategoryPageData({ categoryId }),
    fetchFacetedSearch({ ...searchParams, category: categoryId }),
  ]);

  if (!category) {
    return notFound();
  }

  const productsCollection = search.products;
  const products = productsCollection.items;
  const { hasNextPage, hasPreviousPage, endCursor, startCursor } = productsCollection.pageInfo;

  return (
    <div>
      {/* custom banner */}
      {category.name && category.name === 'Adjustable Frames' ? (
        <div className='h-[450px] w-full bg-adjustable-frame bg-cover bg-center flex items-center justify-center'>
          <h1 className='text-white capitalize font-[700] text-[36px] font-montserrat tracking-[5px]'>{category.name}</h1>
        </div>
      ) : null}
      <div className={cn('group', 'px-[3vw] py-[3vh] bg-[#f3f3f3]')}>
        <Breadcrumbs category={category} />
        <NextIntlClientProvider
          locale={locale}
          messages={{
            FacetedGroup: messages.FacetedGroup ?? {},
            Product: messages.Product ?? {},
            AddToCart: messages.AddToCart ?? {},
          }}
        >
          <div className="md:mb-8 lg:flex lg:flex-row lg:items-center lg:justify-between">

            <h1 className={cn('mb-4 text-4xl font-black lg:mb-0 lg:text-5xl', 'hidden')}>{category.name}</h1>

            <div className="flex flex-col items-center gap-3 whitespace-nowrap md:flex-row">
              <MobileSideNav>
                <FacetedSearch
                  facets={search.facets.items}
                  headingId="mobile-filter-heading"
                  pageType="category"
                >
                  <SubCategories categoryTree={categoryTree} />
                </FacetedSearch>
              </MobileSideNav>
              <div className={cn('flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:justify-end md:gap-6', 'hidden')}>
                <SortBy />
                <div className="order-3 py-4 text-base font-semibold md:order-2 md:py-0">
                  {t('sortBy', { items: productsCollection.collectionInfo?.totalItems ?? 0 })}
                </div>
              </div>
            </div>
          </div>

          <div className={cn('grid grid-cols-4 gap-8', 'grid-cols-3 px-[5vw]')}>

            {/* <FacetedSearch
              className="mb-8 hidden lg:block"
              facets={search.facets.items}
              headingId="desktop-filter-heading"
              pageType="category"
            >
              <SubCategories categoryTree={categoryTree} />
            </FacetedSearch> */}

            <section
              aria-labelledby="product-heading"
              className={cn('col-span-4 group-has-[[data-pending]]:animate-pulse lg:col-span-3')}
            >
              <h2 className="sr-only" id="product-heading">
                {t('products')}
              </h2>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
                {products.map((product, index) => (
                  <ProductCard
                    imagePriority={index <= 3}
                    imageSize="wide"
                    key={product.entityId}
                    product={product}
                  />
                ))}
              </div>

              {/* custom */}
              <div className='h-auto w-full mt-[50px] py-[7rem] px-[2rem] text-center bg-category-parallax bg-fixed bg-center bg-no-repeat'>
                <h2 className='text-white leading-[1.5] text-[2rem] font-montserrat'>
                  The Very Best in <br /> <strong>Comfort and Support</strong>
                </h2>
                <p className='text-white text-[1rem] font-[400] leading-[1.5] my-[16px]'>Improve your sleep and relaxation with an angled or elevated sleeping position.</p>
              </div>

              {/* custom */}
              <h2 className='text-[28px] font-[600] text-clr my-[3rem] text-center'>
                Related Categories
              </h2>
              <div className='h-auto w-full flex lg:flex-nowrap xxs:flex-wrap items-center lg:justify-between md:justify-around'>
                {categoryImgArr && categoryImgArr.map(val => (
                  <div className={`sm:h-[385px] xxs:h-[300px] lg:w-[32%] md:w-[48%] xxs:w-[100%] ${val.bgString} bg-cover bg-center bg-no-repeat relative lg:my-[0px] xxs:my-[10px]`} key={val.id}>
                    <span className='absolute top-[6%] left-[7%] text-white bg-[#264da3] px-[1rem] rounded-[12px] text-[14px]'>Starts at {val.price}</span>
                    <div className='h-[50px] flex justify-between items-center w-[88%] absolute bottom-[5%] left-[7%] mx-auto'>
                      <a className='text-white font-[600] text-[18px]' href='' target='_blank'>{val.name}</a>
                      <a className='bg-[#132448] text-white py-[.5em] px-[3.5em] inline-block rounded-[10px] tracking-[1px]' href='' target=''>Shop</a>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination
                endCursor={endCursor ?? undefined}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                startCursor={startCursor ?? undefined}
              />

            </section>

          </div>
        </NextIntlClientProvider>
        <CategoryViewed category={category} categoryId={categoryId} products={products} />
      </div>
    </div>
  );
}

export const runtime = 'edge';
