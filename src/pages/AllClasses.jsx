import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { useNavigate } from 'react-router';
import usePagination from '../Hook/usePagination';
import Pagination from '../components/Pagination';

const AllClasses = () => {
  useEffect(() => {
    document.title = "EduNite | All Classes"; 
  }, []);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState(""); // sorting state

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['approved-classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/approved-classes');
      return res.data;
    },
  });

  // sort logic
  const sortedClasses = [...classes].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const {
    paginatedData,
    currentPage,
    totalPages,
    goToPage
  } = usePagination(sortedClasses, 10); // sorted data paginate

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (isLoading) return <p className="text-center py-20 font-semibold">Loading Classes...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">Explore All Classes</h2>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-6">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Sort By</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {paginatedData.map(cls => (
          <div
            key={cls._id}
            className="bg-white rounded-lg shadow hover:shadow-md transition flex flex-col h-full"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-48 object-cover rounded-t"
            />
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div className="space-y-2 mb-4">
                <h3 className="text-xl font-semibold text-blue-700">{cls.title}</h3>
                <p><strong>Instructor:</strong> {cls.name}</p>
                <p><strong>Price:</strong> ${cls.price}</p>
                <p className="text-sm text-gray-600">
                  {cls.description.slice(0, 80)}...
                </p>
                <p><strong>Enrolled:</strong> {cls.enrollCount || 0}</p>
              </div>
              <button
                onClick={() => navigate(`/class/${cls._id}`)}
                className="w-full mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};

export default AllClasses;
