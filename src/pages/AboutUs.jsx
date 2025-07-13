import React from 'react';

const AboutUs = () => {
  return (
    <div className=" py-12 px-4 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-4">About EduNite</h1>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-10">
          EduNite is revolutionizing the way educational institutions, tutors, and students interact.
          Our goal is to make skill learning and class management more efficient, accessible, and future-ready.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-10">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Why EduNite?</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Because managing classes shouldn't be complex. EduNite brings together powerful tools for scheduling,
            student tracking, and communication — all in one place.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Who We Serve</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            From small coaching centers to large institutions, and from beginner tutors to expert educators — 
            EduNite is built for everyone involved in the learning ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
