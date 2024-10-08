import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { PropsWithChildren, Suspense } from 'react';

import { getSessionCustomerId } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { Footer, FooterFragment } from '~/components/footer/footer';
import { Header, HeaderFragment } from '~/components/header';
import { Cart } from '~/components/header/cart';
import { ProductSheet } from '~/components/product-sheet';
import { LocaleType } from '~/i18n';

interface Props extends PropsWithChildren {
  params: { locale: LocaleType };
}

const LayoutQuery = graphql(
  `
    query LayoutQuery {
      site {
        ...HeaderFragment
        ...FooterFragment
      }
    }
  `,
  [HeaderFragment, FooterFragment],
);

//! custom import 
import { cn } from '~/lib/utils';
import { Montserrat } from 'next/font/google'
import { cookies } from 'next/headers';

// ! need to export this to another file
const getNavRoutes = await client.fetch({
  document: LayoutQuery,
  fetchOptions: { next: { revalidate } },
});

export const getNavData = getNavRoutes.data.site.categoryTree[1]?.children;

//! setting font to use
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

export default async function DefaultLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const customerId = await getSessionCustomerId();

  const { data } = await client.fetch({
    document: LayoutQuery,
    fetchOptions: customerId ? { cache: 'no-store' } : { next: { revalidate } },
  });

  const messages = await getMessages({ locale });

  const cartId = cookies().get('cartId')?.value;

  return (
    <>
      <Header cart={<Cart />} data={data.site} />

      <main className={cn("flex-1 px-4 2xl:container sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0 xxs:!px-0", 'lg:max-w-none w-full lg:p-0 lg:mt-[135px]', montserrat.className)}>
        {/* <main className={cn("flex-1 px-4 2xl:container sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0")}> */}
        {children}
      </main>

      <Suspense fallback={null}>
        <NextIntlClientProvider
          locale={locale}
          messages={{ Product: messages.Product ?? {}, AddToCart: messages.AddToCart ?? {} }}>
          <ProductSheet />
        </NextIntlClientProvider>
      </Suspense>

      <Footer data={data.site} />
    </>
  );
}
