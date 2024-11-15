import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { BcImage } from '~/components/bc-image';
import { Link as CustomLink } from '~/components/link';
import { cn } from '~/lib/utils';

import { type Locale, LocaleSwitcher } from './locale-switcher';
import { MobileNav } from './mobile-nav';

//! dynamic import
import dynamic from 'next/dynamic';

import { SearchForm } from '~/components/search-form';

const HeaderSlider = dynamic(() => import('../../../app/[locale]/(default)/custom-template/HeaderSlider'), { ssr: false })

interface Link {
  label: string;
  href: string;
}

interface Group {
  label: string;
  href: string;
  links?: Link[];
}

interface Image {
  src: string;
  altText: string;
}

interface Links {
  label: string;
  href: string;
  groups?: Group[];
}

interface Props extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  account?: ReactNode;
  activeLocale?: string;
  locales: Locale[];
  cart?: ReactNode;
  links: Links[];
  locale?: ReactNode;
  logo?: string | Image;
  search?: ReactNode;
}

const Header = async ({
  account,
  activeLocale,
  cart,
  className,
  links,
  locales,
  logo,
  search,
}: Props) => {
  const messages = await getMessages({ locale: activeLocale });

  return (
    <div className={cn('bg-white sticky top-0 w-auto z-50 shadow-bottom', className)}>
      <HeaderSlider />
      <header className={cn('flex h-[92px] items-center justify-between gap-1 overflow-y-visible bg-white px-4 2xl:container sm:px-10 lg:gap-8 lg:px-12 2xl:mx-auto 2xl:px-0', 'justify-start relative 5xl:max-w-[1740px] 4xl:max-w-[1650px]')}>
        <CustomLink className={cn('overflow-hidden text-ellipsis py-3', 'lg:hidden lgshow:block')} href="/">
          {typeof logo === 'object' ? (
            <BcImage
              alt={logo.altText}
              className="max-h-16 object-contain"
              height={32}
              priority
              src={logo.src}
              width={155}
            />
          ) : (
            <span className="truncate text-2xl font-black">{logo}</span>
          )}
        </CustomLink>

        {/* nav tag */}
        <NavigationMenuPrimitive.Root className="hidden lg:block">
          {/* div tag */}
          <NavigationMenuPrimitive.List className="flex items-center gap-2 lg:gap-4">
            {links.map((link) =>
              link.groups && link.groups.length > 0 ? (
                // li tag
                <NavigationMenuPrimitive.Item key={link.href}>

                  {/* button tag */}
                  <NavigationMenuPrimitive.Trigger className="group/button flex items-center font-semibold hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20">
                    {/* a tag */}
                    <CustomLink className={cn('p-3 font-semibold', 'font-[700] font-montserrat text-[#132448]')} href={link.href}>
                      {link.label}
                    </CustomLink>
                    <ChevronDown
                      aria-hidden="true"
                      className="cursor-pointer transition duration-200 group-data-[state=open]/button:-rotate-180"
                    />
                  </NavigationMenuPrimitive.Trigger>

                  <NavigationMenuPrimitive.Content className={cn('flex gap-20 2xl:container data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0', 'lg:gap-0')}>
                    {link.groups.map((group) => (
                      <div key={group.label}>
                        {group.label === 'Adjustable Frames' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/adjustable-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Metal Frames' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Mattress Protector' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Pillow' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Sheets' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Casket' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Blankets' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Engagement' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Sapphires' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Icon' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Arkansas' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Kansas' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Kansas State' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                        {group.label === 'Missouri' ? (
                          <ul className="flex flex-col" key={group.href}>
                            <li>
                              <NavigationMenuPrimitive.Link asChild>
                                <CustomLink className="block p-3 font-semibold" href={group.href}>
                                  <div className='h-auto w-auto flex flex-col justify-start'>
                                    {group.label}
                                    <img className='h-auto w-[300px] object-contain my-1' src='https://cdn11.bigcommerce.com/s-z2qdisybty/stencil/7667e0b0-2eaf-013c-af3b-4abdb73b9aa7/e/f0d8b320-4946-013c-e397-3eeae3bcde1f/img/nav/metal-frames.webp' />
                                    <span className='text-[#4a72c6] text-[16px] font-[400]'>Starts at $299</span>
                                  </div>
                                </CustomLink>
                              </NavigationMenuPrimitive.Link>
                            </li>
                            {group.links &&
                              group.links.length > 0 &&
                              group.links.map((nestedLink) => (
                                <li key={nestedLink.href}>
                                  <NavigationMenuPrimitive.Link asChild>
                                    <CustomLink className="block p-3" href={nestedLink.href}>
                                      {nestedLink.label}
                                    </CustomLink>
                                  </NavigationMenuPrimitive.Link>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}

                    {/* original */}
                    {/* {link.groups.map((group) => (
                      <ul className="flex flex-col" key={group.href}>
                        <li>
                          <NavigationMenuPrimitive.Link asChild>
                            <CustomLink className="block p-3 font-semibold" href={group.href}>
                              {group.label}
                            </CustomLink>
                          </NavigationMenuPrimitive.Link>
                        </li>
                      </ul>
                    ))} */}

                  </NavigationMenuPrimitive.Content>

                </NavigationMenuPrimitive.Item>
              ) : (
                <NavigationMenuPrimitive.Item key={link.href}>
                  <NavigationMenuPrimitive.Link asChild>
                    <CustomLink className={cn('p-3 font-semibold', 'font-[700] font-montserrat text-[#132448]')} href={link.href}>
                      {link.label}
                    </CustomLink>
                  </NavigationMenuPrimitive.Link>
                </NavigationMenuPrimitive.Item>
              ),
            )}
          </NavigationMenuPrimitive.List>

          <NavigationMenuPrimitive.Viewport className="absolute start-0 top-full z-50 w-full bg-white pb-12 pt-6 shadow-xl duration-200 animate-in slide-in-from-top-5" />
        </NavigationMenuPrimitive.Root>

        {/* custom import */}
        {/* <SearchForm /> */}

        <div className={cn('flex items-center gap-2 lg:gap-4', 'absolute right-0')}>
          {search}
          <nav className="flex gap-2 lg:gap-4">
            {account}
            {cart}
          </nav>

          {activeLocale && locales.length > 0 ? (
            <NextIntlClientProvider
              locale={activeLocale}
              messages={{ Header: messages.Header ?? {} }}
            >
              <LocaleSwitcher activeLocale={activeLocale} locales={locales} />
            </NextIntlClientProvider>
          ) : null}

          <MobileNav links={links} logo={logo} />
        </div>

      </header>
    </div>
  );
};

Header.displayName = 'Header';

export { Header, type Links };
