import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ProfilePage.css";
import { FaUserEdit } from "react-icons/fa";
import { FaCopy } from "react-icons/fa"; // Copy icon
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const data = {
  user: {
    firstName: "Mini",
    lastName: "KM",
    email: "Mini0403@gmail.com",
    contactNumber: "9020050820",
    birthdate: { day: "20", month: "08", year: "2023" },
    gender: "Female",
  },
  sidebarMenu: [
    { id: "profile", label: "My Profile" },
    { id: "address", label: "Delivery Address" },
    { id: "orders", label: "My Orders" },
    { id: "refer", label: "Refer Friend" }, // New section
    { id: "password", label: "Change Password" },
    { id: "logout", label: "Log Out", className: "logout" }, // Logout button
  ],
};

const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize navigation function
  const [isEditable, setIsEditable] = useState(false);
  const [user] = useState(data.user);
  const [activeSection, setActiveSection] = useState("profile");
  const [showMessage, setShowMessage] = useState(false);
  
  const referralCode = "REF12345"; // Dummy referral code
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Copy Referral Code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied!", {
      position: "top-right",
      autoClose: 2000, // Close after 2 seconds
    });
  };

  // Change Password
  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      console.log("Password changed successfully!");
      toast.success("Password changed successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error("New passwords do not match!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Handle Logout and Navigate to Home Page
  const handleLogout = () => {
    console.log("User logged out!");
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-info">
          <div className="profile-img">
            <span>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</span>
          </div>
          <h3>{user.firstName} {user.lastName}</h3>
          <p>Good Evening!</p>
        </div>
        <ul className="menu">
          {data.sidebarMenu.map((item) => (
            <li
              key={item.id}
              className={item.className || ""}
              onClick={() =>
                item.id === "logout" ? handleLogout() : setActiveSection(item.id)
              }
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Profile Section */}
        {activeSection === "profile" && (
          <div className="profile-card">
            <div className="edit-icon" onClick={() => setIsEditable(!isEditable)}>
              <FaUserEdit />
            </div>
            <h2>Good Evening! {user.firstName}</h2>
            <div className="profile-details">
              {Object.entries(user).map(([key, value]) =>
                key !== "birthdate" && key !== "gender" ? (
                  <div className="form-group" key={key}>
                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <input type="text" value={value} disabled={!isEditable} />
                  </div>
                ) : null
              )}
              <div className="form-group">
                <label>Birthdate</label>
                <div className="birthdate">
                  {Object.values(user.birthdate).map((datePart, index) => (
                    <input key={index} type="text" value={datePart} disabled={!isEditable} />
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Gender</label>
                <div className="gender-options">
                  {["Male", "Female", "Other"].map((gender) => (
                    <label key={gender}>
                      <input type="radio" name="gender" checked={user.gender === gender} disabled={!isEditable} />
                      {gender}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Refer a Friend Section */}
        {activeSection === "refer" && (
          <div className="refer-card">
            <h2>Refer a Friend</h2>
            <p>Invite your friends and earn rewards!</p>
            <div className="referral-box">
              <span className="referral-code">{referralCode}</span>
              <button className="copy-btn" onClick={handleCopyCode}>
                <FaCopy /> Copy
              </button>
            </div>
            <button className="share-btn">Share Referral</button>
          </div>
        )}

        {/* Address Section */}
        {activeSection === "address" && (
          <div className="address-card">
            <h2>Delivery Address</h2>
            <div className="add-address">
              <button onClick={() => setShowMessage(!showMessage)}>Add Address</button>
            </div>
            {showMessage && <p className="success-message">Address section coming soon!</p>}
          </div>
        )}

        {/* My Orders Section */}
        {activeSection === "orders" && (
          <div className="orders-card">
            <h2>My Orders</h2>
            <div className="no-orders">
              <img src="/images/EmptyCart.png" alt="No Orders" className="no-orders-img" />
              <p>You haven't placed any orders yet.</p>
              <strong>Take a look at our products here</strong>
              <button className="view-products-btn">View Products</button>
            </div>
          </div>
        )}

        {/* Change Password Section */}
        {activeSection === "password" && (
          <div className="change-password-card">
            <h2>Change Password</h2>
            <div className="form-group1">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="form-group1">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group1">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="save-btn" onClick={handleChangePassword}>
              Save
            </button>
          </div>
        )}
      </div>
      <ToastContainer /> {/* Toast Notifications */}
    </div>
  );
};

export default ProfilePage;
