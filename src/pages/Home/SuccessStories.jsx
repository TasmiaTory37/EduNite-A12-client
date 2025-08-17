import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const stories = [
  {
    name: "Ayesha Rahman",
    role: "Frontend Developer at Pathao",
    image: "https://i.ibb.co/jZTVskHW/s1.jpg",
    story: "After completing the React Bootcamp on EduNite, I landed my first internship and quickly moved into a full-time job!",
  },
  {
    name: "Hasan Kabir",
    role: "Digital Marketer at Daraz",
    image: "https://i.ibb.co/VYsQbD9F/s2.jpg",
    story: "EduNite gave me the foundation in SEO and campaign strategy that helped me become a certified Google Ads expert.",
  },
  {
    name: "Nazia Alam",
    role: "QA Engineer at BJIT",
    image: "https://i.ibb.co/qMnLtytZ/s3.jpg",
    story: "The SQA roadmap was clear, well-structured, and helped me build a strong portfolio with real projects.",
  },
  {
    name: "Rashed Hossain",
    role: "App Developer at Sheba.xyz",
    image: "https://i.ibb.co/5WSTJyLZ/s4.jpg",
    story: "EduNite’s Flutter courses and mentorship got me hired in just 3 months after graduation.",
  },
];

const SuccessStories = () => {
  return (
    <section className="py-10 md:py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-600">
          Student Success Stories
        </h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
        >
          {stories.map((student, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 sm:p-8 flex flex-col items-center text-center max-w-xl mx-auto transition-all duration-300 hover:shadow-lg">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-blue-100 mb-4 sm:mb-6"
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{student.name}</h3>
                <p className="text-sm text-blue-600 mb-3 sm:mb-4">{student.role}</p>
                <p className="text-gray-600 text-base leading-relaxed">{student.story}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;
