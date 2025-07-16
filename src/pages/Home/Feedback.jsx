// File: src/pages/Home/Feedback.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/feedbacks")
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, [axiosSecure]);

  return (
    <section className="py-10 md:py-12 lg:py-16">
  <div className="max-w-6xl mx-auto text-center">
    <div className="flex gap-5 items-center justify-center">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-indigo-600">
        What Students Say
      </h2>
    </div>

    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <Swiper navigation={true} modules={[Navigation]} className="rounded-xl">
        {feedbacks.map((f) => (
          <SwiperSlide key={f._id}>
            <div className="bg-blue-50 shadow-lg p-8 flex flex-col items-center space-y-4">
              <img
                src={
                  f.userImage ||
                  `https://ui-avatars.com/api/?name=${f.userName || "User"}&background=random`
                }
                alt={f.userName}
                className="w-20 h-20 rounded-full object-cover shadow-md"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=User&background=random`;
                }}
              />

              <h3 className="text-xl font-semibold text-gray-700">
                {f.userName}
              </h3>

              {f.classTitle && (
                <p className="text-sm text-blue-500">
                  Reviewed: <span className="font-medium">{f.classTitle}</span>
                </p>
              )}

              <Rating
                initialRating={f.rating}
                readonly
                fullSymbol={<FaStar className="text-yellow-400 text-xl" />}
                emptySymbol={<FaRegStar className="text-gray-300 text-xl" />}
              />

              <p className="text-gray-600 max-w-xl italic">
                “{f.description}”
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
</section>

  );
};

export default Feedback;
