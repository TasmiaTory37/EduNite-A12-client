import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hook/useAxiosSecure"; 


const MyEnrollClass = () => {
  const axiosSecure =useAxiosSecure ();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axiosSecure.get("/enrolled-classes")
      .then(res => setClasses(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map(cls => (
        <div key={cls._id} className="bg-white rounded shadow p-4">
          <img src={cls.image} alt={cls.title} className="h-40 w-full object-cover rounded" />
          <h3 className="text-xl font-semibold mt-3">{cls.title}</h3>
          <p className="text-sm text-gray-600">By: {cls.instructor}</p>
          <Link
            to={`/dashboard/myenroll-class/${cls._id}`}
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Continue
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyEnrollClass;