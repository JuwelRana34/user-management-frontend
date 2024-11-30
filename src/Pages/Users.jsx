import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

function Users() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null); // Track which user is being edited
  const [editedUser, setEditedUser] = useState({ name: "", email: "" }); // Hold the edited user data
  const [loading, setLoading] = useState(true); // Flag to show loading spinner
 
 
  // Fetch users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://user-management-xi-two.vercel.app/"
        );
        setLoading(false); // Set loading flag to false after data is fetched
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://user-management-xi-two.vercel.app/user/${id}`
      );
      if (response.data.acknowledged === true) {
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Enter edit mode
  const handleEditClick = (user) => {
    setEditUserId(user._id);
    setEditedUser({ name: user.name, email: user.email }); // Populate fields with current data
  };

  // Save edited user
  const saveUser = async (id) => {
    try {
      const response = await axios.patch(
        `https://user-management-xi-two.vercel.app/user/${id}`,
        editedUser
      );
      if (response.data.acknowledged === true) {
        setUsers(
          users.map((user) =>
            user._id === id ? { ...user, ...editedUser } : user
          )
        );
        setEditUserId(null); // Exit edit mode
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  if(loading){
    return <div className="flex justify-center items-center mt-10 text-xl"> Loading...  <span className="   loading loading-bars text-violet-500 loading-lg"></span></div>  // Show loading spinner while data is being fetched
  }

  return (
    <div className="overflow-x-auto container mx-auto">
      <table className="table table-zebra">
        {/* Table Head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>
                {editUserId === user._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    className="input input-bordered"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editUserId === user._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="input input-bordered"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                <div className="flex justify-start items-center gap-4">
                  {editUserId === user._id ? (
                    <>
                      <button
                        onClick={() => saveUser(user._id)}
                        className="btn btn-success btn-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditUserId(null)}
                        className="btn btn-warning btn-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="btn btn-info btn-sm"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="btn btn-error btn-sm"
                      >
                        <MdDeleteForever />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
