import React from 'react';
import { useNavigate } from 'react-router';
import { FaChalkboardTeacher, FaGlobe, FaClock, FaStar } from 'react-icons/fa';
import teacherImg from '../../assets/tutor.jpg';

const Teacher = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/teach-on-edunite');
  };

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left: Image */}
        <div className="w-full flex justify-center">
          <img
            src={teacherImg}
            alt="Inspiring teacher"
            className="rounded-lg shadow-md w-full max-w-md md:max-w-full h-auto object-cover"
          />
        </div>

        {/* Right: Text & CTA */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600">
            Inspire Learners, Shape Futures
          </h2>

          <p className="text-base-content mb-6 max-w-xl mx-auto md:mx-0">
            Join our growing platform to teach what you love, connect with global learners, and make a lasting impact — all on your schedule.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-blue-500 mb-6 max-w-xs mx-auto md:mx-0">
            <div className="flex items-center gap-2">
              <FaChalkboardTeacher size={20} />
              <span className="text-sm">Teach Passionately</span>
            </div>
            <div className="flex items-center gap-2">
              <FaGlobe size={20} />
              <span className="text-sm">Reach Globally</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock size={20} />
              <span className="text-sm">Flexible Timing</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar size={20} />
              <span className="text-sm">Grow Your Brand</span>
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <button
              onClick={handleApplyClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow"
            >
              Apply as a Teacher
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teacher;
