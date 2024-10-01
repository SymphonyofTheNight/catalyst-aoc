// ! PLEASE TAKE NOTE, SETTING THIS UP REQUIRES SOME CONFIGURATION IN tsconfig.json AND NEED TO CREATE A SEPARATE FILE FOR TYPESCRIPT INTERFACE 
// ! using use client needs to be import dynamically
"use client";

import { useEffect } from 'react';
import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.min.js';

import { ReviewCustomer } from '../ArrData/SlickData';
import { fetchReviews } from '../api/stamped';

const HeaderSlider = () => {
    useEffect(() => {
        //! Type assertion to let TypeScript know `slick` method exists
        ($('.headSlider') as any).slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
            ]
        });

        //! Cleanup function to destroy Slick Slider on component unmount
        return () => {
            if ($('.headSlider').hasClass('slick-initialized')) {
                ($('.headSlider') as any).slick('unslick');
            }
        };
    }, []);

    //* BUTTON STYLING WILL BE ON GLOBAL CSS

    return (
        <div className='bg-[#132448] xxs:hidden md:block'>
            <div className="headSlider flex flex=row">
                <div>
                    <span className='text-white flex flex-row !text-center'>
                        Limited Time Offer: Up to
                        <span className='font-[600]'>&nbsp;500$ off&nbsp;</span>
                        on the
                        <span className='font-[600]'>&nbsp;Mattresses&nbsp;</span>
                    </span>
                </div>
                <div>
                    <span className='text-white flex flex-row !text-center'>
                        Last chance to save BIG! Use voucher code
                        <span className='font-[600]'>&nbsp;CLEARANCE12&nbsp;</span>
                        to get
                        <span className='font-[600]'>&nbsp;12% OFF&nbsp;</span>
                        on your next mattress.
                    </span>
                </div>
            </div>
        </div>
    );

};

export default HeaderSlider;