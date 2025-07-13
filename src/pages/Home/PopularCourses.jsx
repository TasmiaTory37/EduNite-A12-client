import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const PopularCourses = () => {
  const axiosSecure = useAxiosSecure();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axiosSecure.get('/popular-classes')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Failed to fetch popular classes:', err));
  }, [axiosSecure]);

  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Popular Courses</h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {courses.map(cls => (
        <SwiperSlide key={cls._id}>
            <div className="h-[350px] bg-white shadow-sm rounded-md overflow-hidden flex flex-col">
                <div className="h-48 w-full">
                <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="flex-1 px-3 py-2 flex flex-col gap-2">
                <div>
                    <h3 className="text-base font-semibold mb-1">{cls.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-snug">
                    {cls.description}
                    </p>
                </div>
                <p className="text-sm font-medium text-green-600">
                    Enrolled: {cls.enrollCount}
                </p>
                </div>
            </div>
        </SwiperSlide>


        ))}
      </Swiper>
    </div>
  );
};

export default PopularCourses;
