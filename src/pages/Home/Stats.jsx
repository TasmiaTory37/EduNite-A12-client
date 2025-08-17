import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const Stats = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({ users: 0, classes: 0, enrollments: 0 });

  useEffect(() => {
    axiosSecure.get('/site-stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Stats load failed:', err));
  }, [axiosSecure]);

  return (
    <section className="py-10 md:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600">
          Powering Progress in Online Learning
        </h2>
        <p className="text-base-content text-base sm:text-lg">
          Explore how EduNite is growing with active users, engaging classes, and student enrollments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
        <div className="bg-blue-50 p-5 sm:p-6 rounded shadow text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">Total Users</h3>
          <p className="text-3xl sm:text-4xl font-bold text-black">
            <CountUp end={stats.users} duration={2} separator="," />
          </p>
        </div>

        <div className="bg-blue-50 p-5 sm:p-6 rounded shadow text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">Total Classes</h3>
          <p className="text-3xl sm:text-4xl font-bold text-black">
            <CountUp end={stats.classes} duration={2} separator="," />
          </p>
        </div>

        <div className="bg-blue-50 p-5 sm:p-6 rounded shadow text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">Total Enrollments</h3>
          <p className="text-3xl sm:text-4xl font-bold text-black">
            <CountUp end={stats.enrollments} duration={2} separator="," />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
