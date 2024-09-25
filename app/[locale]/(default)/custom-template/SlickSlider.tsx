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

const SlickSlider = () => {
    useEffect(() => {
        //! Type assertion to let TypeScript know `slick` method exists
        ($('.slider') as any).slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
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
            if ($('.slider').hasClass('slick-initialized')) {
                ($('.slider') as any).slick('unslick');
            }
        };
    }, []);

    //* BUTTON STYLING WILL BE ON GLOBAL CSS

    return (
        <div className='bg-parallax-2 bg-fixed bg-center bg-no-repeat bg-cover h-auto w-full pl-[8vw] pr-[8vw] lg:mt-[4.5vh] flex flex-col justify-start relative'>
            <h3 className='font-[700] text-white xl:pt-[5.5vh] xxs:pt-[3.5vh] pb-[3vh] 2xl:text-[26px] 1xl:text-[20px]'>See what others think about ICON SLEEP</h3>
            <div className="slider 2xl:mb-[4.5vh] 1xl:mb-[3vh] xl:mb-[3vh]">
                {ReviewCustomer && ReviewCustomer.map(val => {
                    return (
                        <div key={val.rating}>
                            <div className='h-auto flex flex-col justify-start mr-[2.5vw]'>
                                <img className='h-auto 2xl:w-[25%] xxs:w-[34%] object-contain' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/5star.png?t=1726556331' />
                                <h2 className='text-white font-[700] pt-[10px] 2xl:text-[20px] lg:text-[18px]'>{val.title}</h2>
                                <p className='text-white 2xl:text-[16px] 1xl:text-[14px] lg:text-[12px] sm:text-[14px]'>{val.text}</p>
                                <span className='text-white font-[700] 2xl:text-[13px] 1xl:text-[12px] lg:text-[14px] sm-text-[16px]'>{val.name}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );

};

export default SlickSlider;