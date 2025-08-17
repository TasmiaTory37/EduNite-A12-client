import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import usePagination from "../../../Hook/usePagination";
import Pagination from "../../../components/Pagination";

const Users = () => {
   useEffect(() => {
            document.title = "EduNite | Users"; 
          }, []);
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get(`/users?search=${search}`);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleMakeAdmin = async (email) => {
    try {
      await axiosSecure.put(`/users/role/${email}`, { role: "admin" });
      fetchUsers();
    } catch (err) {
      console.error("Failed to make admin", err);
    }
  };

  const {
    paginatedData,
    currentPage,
    totalPages,
    goToPage
  } = usePagination(users, 10); // Show 10 users per page

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">All Users</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        className="input input-bordered w-full max-w-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((u) => (
              <tr key={u._id}>
                <td>
                  <img
                    src={u.photoURL || "https://i.ibb.co/MBtjqXQ/default-avatar.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{u.name || "No Name"}</td>
                <td>{u.email}</td>
                <td>
                  <button
                    disabled={u.role === "admin"}
                    onClick={() => handleMakeAdmin(u.email)}
                    className={`btn btn-sm ${u.role === "admin" ? "btn-disabled" : "btn-success"}`}
                  >
                    {u.role === "admin" ? "Admin" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
        </div>
      )}
    </div>
  );
};

export default Users;
