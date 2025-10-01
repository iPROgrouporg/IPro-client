import NumTwo from "../../assets/images/2.png";
import NumZero from "../../assets/images/0.png";
import NumOne from "../../assets/images/1.png";
import React from "react";

export const YearNumber=()=>{
    return (
        <div className="flex justify-center lg:justify-end w-full lg:w-1/2 gap-6 flex-wrap">
            <div className="flex flex-col gap-6">
                <img
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    data-aos-delay="0"
                    src={NumTwo}
                    alt=""
                    className="w-20 sm:w-28 md:w-32 object-contain"
                />
                <img
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    data-aos-delay="500"
                    src={NumTwo}
                    alt=""
                    className="w-20 sm:w-28 md:w-32 object-contain"
                />
            </div>
            <div className="flex flex-col gap-6  sm:mt-14">
                <img
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    data-aos-delay="1000"
                    src={NumZero}
                    alt=""
                    className="w-20 sm:w-28 md:w-32 object-contain"
                />
                <img
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    data-aos-delay="1500"
                    src={NumOne}
                    alt=""
                    className="w-14 sm:w-20 object-contain"
                />
            </div>
        </div>
    )
}