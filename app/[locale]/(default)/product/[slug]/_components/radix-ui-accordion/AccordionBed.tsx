"use client";

import React, { useEffect, useState } from "react";

const AccordionBed = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [media, setMedia] = useState<any>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        let AccordionCheck = window.matchMedia("(max-width: 1000px)");
        if (AccordionCheck.matches) {
            document.querySelectorAll('.AccordionBtn')?.forEach(btn => {
                btn.classList.add('hide');
            });
        }
    }, [])

    return (
        <div className="accordion xxs:max-w-[90%] lg:max-w-[45rem] mx-auto xxs:my-[40px] lg:my-[0px]">
            {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className={`border-t ${index === 4 ? 'border-b' : ''}`}>
                    <h3
                        className={`border-3 border-[#132448] cursor-pointer rounded-full w-[35px] h-[35px] text-center font-bold bg-[#132448] text-white text-[18px] flex items-center justify-center
                            ${index === 0 ? 'absolute top-[19%] right-[42%] z-10' : ''}
                            ${index === 1 ? 'absolute top-[34%] right-[42%] z-10' : ''}
                            ${index === 2 ? 'absolute top-[49%] right-[42%] z-10' : ''}
                            ${index === 3 ? 'absolute top-[66%] right-[42%] z-10' : ''}
                            ${index === 4 ? 'absolute top-[84%] right-[42%] z-10' : ''}
                            AccordionBtn
                            `}
                        onClick={() => toggleAccordion(index)}
                    >
                        {index + 1}
                    </h3>
                    <div className="pt-4 pb-4">
                        <h3 className={`text-[24px] text-[#132448] py-4 w-full ${openIndex === index ? 'font-[600]' : ''}`} onClick={() => toggleAccordion(index)}>
                            {index === 0 ? 'Knitted Jacquard Fabric' : ''}
                            {index === 1 ? 'Fire Resistant Base' : ''}
                            {index === 2 ? 'COOLest Gel-Infused Memory Foam' : ''}
                            {index === 3 ? 'Pressure Relief High-Density Foam' : ''}
                            {index === 4 ? 'Support High-Density Foam' : ''}
                        </h3>
                        <div className={`accordion-content transition-all duration-700 ease-in-out ${openIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}>
                            <div className={`mt-[15px] transition-opacity duration-500 ${openIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                                {index === 0 ? 'Intricately designed using precision knitting machines, the COOLest Gel mattress’ exterior fabric has a soft texture, greater extensibility and elasticity in addition to good wrinkle resistance and breathability.' : ''}
                                {index === 1 ? 'We’ve designed the COOLest Gel mattress to last even in extremely demanding and fire hazardous environments. The base layer contains a fabric that consists of fire retardant materials such as Aramid and rayon.' : ''}
                                {index === 2 ? 'Providing healthy support that helps you wake up free from aches and pains, our gel-infused memory foam regulates body temperature and promotes breathability – creating iconic sleep experiences every night.' : ''}
                                {index === 3 ? 'Having almost twice the density of conventional foams, this high-density layer returns to shape after compression, offering a good balance between the mattress’ softness and support and providing pressure relief during sleep.' : ''}
                                {index === 4 ? 'COOLest Gel’s ultra-solid base foam is packed with high-density polymer material that gives overall support and durability to the whole mattress while preventing sinking and sagging of the upper layers.' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccordionBed;
