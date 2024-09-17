// ! PLEASE TAKE NOTE, SETTING THIS UP REQUIRES SOME CONFIGURATION IN tsconfig.json AND NEED TO CREATE A SEPARATE FILE FOR TYPESCRIPT INTERFACE 
"use client";

import { useEffect } from 'react';
import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.min.js';

import { hpcontent } from '../ArrData/HomepageArr';
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

    console.log(fetchReviews());

    return (
        <div className='bg-parallax-3 bg-fixed bg-center bg-no-repeat bg-cover h-auto w-full pl-[8vw] pr-[8vw] mt-[50px] flex flex-col justify-start relative'>
            <h3 className='text-[26px] font-[700] text-white pt-[3vh] pb-[3vh]'>See what others think about ICON SLEEP</h3>
            <div className="slider mb-[3vh]">
                <div>
                    <div className='border-[2px] border-black h-[225px] flex flex-col justify-start'>

                    </div>
                </div>
                <div>
                    <div className='border-[2px] border-black h-[225px] flex flex-col justify-start'>

                    </div>
                </div>
                <div>
                    <div className='border-[2px] border-black h-[225px] flex flex-col justify-start'>

                    </div>
                </div>
                <div>
                    <div className='border-[2px] border-black h-[225px] flex flex-col justify-start'>

                    </div>
                </div>
                <div>
                    <div className='border-[2px] border-black h-[225px] flex flex-col justify-start'>

                    </div>
                </div>
                <div>
                    <div className='border-[2px] border-black h-[225px] flex flex-col justify-start'>

                    </div>
                </div>
                <div>
                    <div className='border-[2px] border-black h-[225px] flex flex-col justify-start'>

                    </div>
                </div>
                <div>
                    <div className='border-[2px] border-black h-[225px] flex flex-col justify-start'>

                    </div>
                </div>
            </div>
        </div>
    );

};

export default SlickSlider;