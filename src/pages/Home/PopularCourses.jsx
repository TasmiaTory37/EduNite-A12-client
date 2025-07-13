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
            <div className="bg-white shadow rounded overflow-hidden">
              <img src={cls.image} alt={cls.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{cls.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{cls.description}</p>
                <p className="text-sm font-semibold mt-2 text-green-600">
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
