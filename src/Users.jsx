import React, { useState, useEffect } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "./services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: ""
  });

  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    getUsers().then((res) => setUsers(res.data.users));
  };

  const handleAddUser = () => {
    if (
      !newUser.id ||
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.phone ||
      !newUser.image
    ) {
      return alert("Fill all fields...");
    }

    // Optimistically update UI
    const tempUser = { ...newUser };
    setUsers([...users, tempUser]);

    // Call API in background
    addUser(newUser)
      .then((res) => {
        // Replace temp user with response (if needed)
        setUsers((prev) =>
          prev.map((u) => (u.id === tempUser.id ? { ...res.data, id: newUser.id } : u))
        );
      })
      .catch(() => {
        // Rollback if failed
        alert("Failed to add user");
        setUsers((prev) => prev.filter((u) => u.id !== tempUser.id));
      });

    // Reset form
    setNewUser({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      image: ""
    });
  };



  const handleDeleteUser = (id) => {
    // Optimistically remove from UI
    const oldUsers = [...users];
    setUsers(users.filter((u) => u.id !== id));

    if (id <= 100) {
      deleteUser(id)
        .then((res) => {
          if (!res.data.isDeleted) {
            alert("Failed to delete user");
            setUsers(oldUsers); // rollback
          }
        })
        .catch(() => {
          alert("Failed to delete user");
          setUsers(oldUsers); // rollback
        });
    }
  };


  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleUpdateUser = () => {
    if (
      !editUser.firstName ||
      !editUser.lastName ||
      !editUser.email ||
      !editUser.phone ||
      !editUser.image
    ) {
      return alert("Fill all fields...");
    }

    if (editUser.id <= 100) {
      // API users
      updateUser(editUser.id, editUser).then((res) => {
        setUsers(users.map((u) => (u.id === editUser.id ? res.data : u)));
        setEditUser(null);
      });
    } else {
      // Local users → update in state directly
      setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
      setEditUser(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px" ,marginTop:"0px"}}>
        Employee Management App
      </h2>

      {/* Wrapper to align side by side */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "30px"
        }}
      >
        {/* Add/Edit User Form */}
        <div
          style={{
            flex: "1",
            border: "1px solid #ddd",
            padding: "20px",
            // paddingTop:"0px",
            // marginTop:"10px",
            borderRadius: "8px"
          }}
        >
          {!editUser ? (
            <>
              <h3 style={{ marginBottom: "15px" }}>Add Employee</h3>
              <input
                placeholder="ID"
                value={newUser.id}
                onChange={(e) =>
                  setNewUser({ ...newUser, id: e.target.value })
                }
                style={{
                  display: "block",
                  width: "95%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />

              <input
                placeholder="First Name"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                style={{
                  display: "block",
                  width: "95%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <input
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                style={{
                  display: "block",
                  width: "95%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <input
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                style={{
                  display: "block",
                  width: "95%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <input
                placeholder="Phone"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
                style={{
                  display: "block",
                  width: "95%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <input
                placeholder="Image URL"
                value={newUser.image}
                onChange={(e) =>
                  setNewUser({ ...newUser, image: e.target.value })
                }
                style={{
                  display: "block",
                  width: "95%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <button
                onClick={handleAddUser}
                style={{
                  padding: "8px 15px",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Add Employee
              </button>
            </>
          ) : (
            <>
              <h3 style={{ marginBottom: "15px" }}>Edit Employee</h3>
              <input
                value={editUser.firstName}
                onChange={(e) =>
                  setEditUser({ ...editUser, firstName: e.target.value })
                }
                style={{
                  display: "block",
                  width: "95%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <input
                value={editUser.lastName}
                onChange={(e) =>
                  setEditUser({ ...editUser, lastName: e.target.value })
                }
                style={{
                  display: "block",
                  width: "95%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <input
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                style={{
                  display: "block",
                  width: "95%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <input
                value={editUser.phone}
                onChange={(e) =>
                  setEditUser({ ...editUser, phone: e.target.value })
                }
                style={{
                  display: "block",
                  width: "95%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <input
                value={editUser.image}
                onChange={(e) =>
                  setEditUser({ ...editUser, image: e.target.value })
                }
                style={{
                  display: "block",
                  width: "95%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <button
                onClick={handleUpdateUser}
                style={{
                  padding: "5px 10px",
                  marginRight: "5px",
                  background: "#17a2b8",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Update
              </button>
              <button
                onClick={() => setEditUser(null)}
                style={{
                  padding: "5px 10px",
                  background: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "5px"
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* Table */}
        <div style={{ flex: "2" }}>
          <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
            Employees List
          </h3>
          <table
            style={{ borderCollapse: "collapse", width: "100%" }}
            border={1}
            cellPadding={8}
          >
            <thead style={{ background: "#f4f4f4" }}>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>
                    <img
                      src={u.image}
                      alt={u.firstName}
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%" }}
                    />
                  </td>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <button
                      onClick={() => handleEditUser(u)}
                      style={{
                        padding: "5px 10px",
                        marginRight: "5px",
                        background: "#17a2b8",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      style={{
                        padding: "5px 10px",
                        background: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
