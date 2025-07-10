import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const stories = [
  {
    name: "Ayesha Rahman",
    role: "Frontend Developer at Pathao",
    image: "https://i.ibb.co/p4YyBxr/student1.jpg",
    story: "After completing the React Bootcamp on EduNite, I landed my first internship and quickly moved into a full-time job!",
  },
  {
    name: "Hasan Kabir",
    role: "Digital Marketer at Daraz",
    image: "https://i.ibb.co/mzdm8d5/student2.jpg",
    story: "EduNite gave me the foundation in SEO and campaign strategy that helped me become a certified Google Ads expert.",
  },
  {
    name: "Nazia Alam",
    role: "QA Engineer at BJIT",
    image: "https://i.ibb.co/ykYp8vh/student3.jpg",
    story: "The SQA roadmap was clear, well-structured, and helped me build a strong portfolio with real projects.",
  },
  {
    name: "Rashed Hossain",
    role: "App Developer at Sheba.xyz",
    image: "https://i.ibb.co/BLZftWk/student4.jpg",
    story: "EduNite’s Flutter courses and mentorship got me hired in just 3 months after graduation.",
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-10">Student Success Stories</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
        >
          {stories.map((student, index) => (
            <SwiperSlide key={index}>
              <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-blue-300"
                />
                <h3 className="text-xl font-semibold text-gray-800">{student.name}</h3>
                <p className="text-sm text-blue-600 mb-2">{student.role}</p>
                <p className="text-gray-700 text-base max-w-xl mx-auto">{student.story}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;