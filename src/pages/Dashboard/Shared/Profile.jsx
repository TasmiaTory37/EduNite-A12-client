import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const Profile = () => {
   useEffect(() => {
            document.title = "EduNite | Profile"; 
          }, []);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => setDbUser(res.data))
        .catch(err => console.error("Error fetching user info:", err));
    }
  }, [user, axiosSecure]);

  const profileImage = dbUser?.photoURL || user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png";
  const displayName = dbUser?.name || user?.displayName || "No Name Provided";

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
      <h2 className="text-center text-xl font-bold mt-4">{displayName}</h2>
      <p className="text-center text-gray-600">{user?.email}</p>
      <p className="text-center">Role: {dbUser?.role || "student"}</p>
      <p className="text-center mt-2">Phone: {dbUser?.phone || "Not Provided"}</p>
    </div>
  );
};

export default Profile;
