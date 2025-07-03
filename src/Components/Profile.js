import React, { useState, useEffect } from "react";
import { auth, fs } from "../Config/Config";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Navbar } from "./Navbar";
import { arrowLeft } from "react-icons-kit/feather/arrowLeft";
import { Icon } from "react-icons-kit";

export const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const history = useHistory();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      fs.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserProfile(doc.data());
            setEditedProfile(doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  const enableEditing = () => {
    setEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const saveEditedProfile = () => {
    const isProfileChanged =
      JSON.stringify(editedProfile) !== JSON.stringify(userProfile);
    if (isProfileChanged) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update your profile details?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fs.collection("users")
            .doc(auth.currentUser.uid)
            .update(editedProfile)
            .then(() => {
              setUserProfile(editedProfile);
              setEditing(false);
              Swal.fire(
                "Success!",
                "Your profile has been updated.",
                "success"
              );
            })
            .catch((error) => {
              console.error("Error updating document:", error);
              Swal.fire(
                "Error",
                "An error occurred while updating your profile.",
                "error"
              );
            });
        }
      });
    } else {
      Swal.fire({
        title: "No Changes",
        text:
          "You haven't made any changes to your profile. Do you want to proceed anyway?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          setEditing(false);
        }
      });
    }
  };

  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  }, []);

  const deleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        auth.currentUser
          .delete()
          .then(() => {
            history.push("/");
          })
          .catch((error) => {
            console.error("Error deleting account:", error);
          });
      }
    });
  };

  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const user = GetCurrentUser();

  return (
    <div style={{ backgroundColor: "#F0F8FC", minHeight: "100vh" }}>
      <Navbar user={user} totalProducts={totalProducts} />
      <div
        style={{
          marginTop: "6%",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "768px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <button
          onClick={() => history.goBack()}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Icon icon={arrowLeft} size={34} style={{ color: "#000000" }} />
        </button>
        <center>
          <h1>User Profile</h1>
        </center>
        {userProfile && (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "5%",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: "44px",
                  }}
                >
                  {userProfile.FullName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
            <div>
              {editing ? (
                <form>
                  <table
                    style={{
                      width: "100%",
                      marginTop: "3%",
                      marginLeft: "2%",
                    }}
                  >
                    <tbody>
                      <tr>
                        <th style={{ width: "25%" }}>Full Name:</th>
                        <td>
                          <input
                            type="text"
                            style={{ width: "100%" }}
                            className="form-control"
                            id="FullName"
                            name="FullName"
                            value={editedProfile.FullName}
                            onChange={handleEditChange}
                          />
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <th>Email:</th>
                        <td>
                          <input
                            type="email"
                            style={{ width: "100%" }}
                            className="form-control"
                            id="Email"
                            name="Email"
                            value={editedProfile.Email}
                            onChange={handleEditChange}
                          />
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <th>Contact Number:</th>
                        <td>
                          <input
                            type="text"
                            style={{ width: "100%" }}
                            className="form-control"
                            id="ContactNumber"
                            name="ContactNumber"
                            value={editedProfile.ContactNumber}
                            onChange={handleEditChange}
                          />
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <th>Address:</th>
                        <td>
                          <input
                            type="text"
                            style={{ width: "100%" }}
                            className="form-control"
                            id="Address"
                            name="Address"
                            value={editedProfile.Address}
                            onChange={handleEditChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              ) : (
                <table
                  style={{
                    width: "100%",
                    marginTop: "5%",
                    marginLeft: "32%",
                    marginBottom: "10%",
                  }}
                >
                  <tbody>
                    <tr>
                      <th style={{ width: "25%" }}>Full Name</th>
                      <td>{userProfile.FullName}</td>
                    </tr>
                    <br />
                    <tr>
                      <th>Email</th>
                      <td>{userProfile.Email}</td>
                    </tr>
                    <br />
                    <tr>
                      <th>Contact Number</th>
                      <td>{userProfile.ContactNumber}</td>
                    </tr>
                    <br />
                    <tr>
                      <th>Address</th>
                      <td>{userProfile.Address}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
            <center>
              <div style={{ marginTop: "30px" }}>
                {editing ? (
                  <button
                    className="btn btn-success"
                    onClick={saveEditedProfile}
                    style={{ marginLeft: "20px" }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={enableEditing}
                    style={{ marginLeft: "25px" }}
                  >
                    Edit Profile
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={deleteAccount}
                  style={{ marginLeft: "20px" }}
                >
                  Delete Account
                </button>
              </div>
            </center>
          </div>
        )}
        {!userProfile && <p>Loading...</p>}
      </div>
    </div>
  );
};
