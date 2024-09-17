// ! PLEASE TAKE NOTE, SETTING THIS UP REQUIRES SOME CONFIGURATION IN tsconfig.json AND NEED TO CREATE A SEPARATE FILE FOR TYPESCRIPT INTERFACE 
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
        // Type assertion to let TypeScript know `slick` method exists
        ($('.slider') as any).slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        });

        // Cleanup function to destroy Slick Slider on component unmount
        return () => {
            if ($('.slider').hasClass('slick-initialized')) {
                ($('.slider') as any).slick('unslick');
            }
        };
    }, []);

    //* BUTTON STYLING WILL BE ON GLOBAL CSS

    return (
        <div className='bg-parallax-2 bg-fixed bg-center bg-no-repeat bg-cover h-auto w-full pl-[8vw] pr-[8vw] mt-[4.5vh] flex flex-col justify-start relative'>
            <h3 className='text-[26px] font-[700] text-white pt-[5.5vh] pb-[3vh]'>See what others think about ICON SLEEP</h3>
            <div className="slider mb-[4.5vh]">
                {ReviewCustomer && ReviewCustomer.map(val => {
                    return (
                        <div key={val.rating}>
                            <div className='h-auto flex flex-col justify-start mr-[2.5vw]'>
                                <img className='h-auto w-[25%] object-contain' src='https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/5star.png?t=1726556331' />
                                <h2 className='text-white text-[20px] font-[700] pt-[10px]'>{val.title}</h2>
                                <p className='text-white text-[16px]'>{val.text}</p>
                                <span className='text-white text-[13px] font-[700]'>{val.name}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );

};

export default SlickSlider;