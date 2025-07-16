import React, { useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const PopularCourses = () => {
  const axiosSecure = useAxiosSecure();
  const [courses, setCourses] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    axiosSecure
      .get('/popular-classes')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Failed to fetch popular classes:', err));
  }, [axiosSecure]);

  return (
    <div className="px-4 sm:px-6 md:px-10 max-w-screen-xl mx-auto py-10 md:py-12 lg:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-indigo-600">
        Popular Courses
      </h2>

      <div className="relative">
        {/* Custom Navigation Arrows */}
        <button
          ref={prevRef}
          className="swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 text-indigo-600 text-2xl sm:text-3xl"
        ></button>
        <button
          ref={nextRef}
          className="swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 text-indigo-600 text-2xl sm:text-3xl"
        ></button>

        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            640: { slidesPerView: 1.1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination, Navigation]}
          className="pb-10"
        >
          {courses.map((cls) => (
            <SwiperSlide key={cls._id}>
              <div className="h-[360px] bg-white shadow-md rounded-xl overflow-hidden flex flex-col">
                {/* Image */}
                <div className="h-48 w-full">
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 px-4 py-3 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {cls.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-snug mb-auto">
                    {cls.description}
                  </p>
                  <p className="text-sm font-medium text-green-600 pt-2">
                    Enrolled: {cls.enrollCount}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularCourses;
