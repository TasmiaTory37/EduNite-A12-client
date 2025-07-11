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

  const cardStyles = "bg-white p-6 rounded-xl shadow-md text-center ";

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-700">Powering Progress in Online Learning</h2>
        <p className="text-gray-600 mt-3 text-lg">
          Explore how EduNite is growing with active users, engaging classes, and student enrollments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className={`${cardStyles}`}>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Total Users</h3>
          <p className="text-4xl font-bold text-green-600">
            <CountUp end={stats.users} duration={2} separator="," />
          </p>
        </div>

        <div className={`${cardStyles}`}>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Total Classes</h3>
          <p className="text-4xl font-bold text-blue-600">
            <CountUp end={stats.classes} duration={2} separator="," />
          </p>
        </div>

        <div className={`${cardStyles} `}>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Total Enrollments</h3>
          <p className="text-4xl font-bold text-purple-600">
            <CountUp end={stats.enrollments} duration={2} separator="," />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
