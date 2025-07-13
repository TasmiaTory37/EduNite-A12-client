import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import s1 from '../../assets/b1.jpg';
import s2 from '../../assets/b2.jpg';
import s3 from '../../assets/b3.png';
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto h-[70vh] rounded-lg overflow-hidden shadow-lg">
      <Swiper
        effect={'flip'}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="w-full h-full"
      >
        <SwiperSlide className="relative h-full">
          <img src={s1} alt="Start Your Learning Journey" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-4 text-center">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Start Your Learning Journey</h1>
            <p className='text-white font-medium sm:font-semibold text-base sm:text-lg'>
              Learn from top instructors and build in-demand skills for your career.
            </p>
            <Link to='/all-classes' className="bg-blue-500 text-white hover:bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold">
              Browse Classes
            </Link>
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative h-full">
          <img src={s2} alt="Level Up with Practical Skills" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-4 text-center">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Level Up with Practical Skills</h1>
            <p className='text-white font-medium sm:font-semibold text-base sm:text-lg'>
              Get hands-on experience through real-world projects guided by mentors.
            </p>
            <Link to='/all-classes' className="bg-blue-500 text-white hover:bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold">
              Start Learning
            </Link>
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative h-full">
          <img src={s3} alt="Earn Certificates & Grow" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-4 text-center">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Earn Certificates & Grow</h1>
            <p className='text-white font-medium sm:font-semibold text-base sm:text-lg'>
              Complete courses and earn certificates that boost your resume and confidence.
            </p>
            <Link to='/all-classes' className="bg-blue-500 text-white hover:bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold">
              Join Now
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
