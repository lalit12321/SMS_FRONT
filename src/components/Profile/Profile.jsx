// src/pages/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom'; // To fetch the dynamic user profile
import { Link } from 'react-router-dom';

const Profile = ({ user }) => {
  // The profile data could be fetched from an API or context
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Simulating fetching user profile data (in real use case, fetch it from an API)
    const fetchProfile = () => {
      // Assuming user has role, name, email, and profile picture
      const fetchedData = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "admin", // Could be 'admin', 'teacher', or 'student'
        profilePicture: "https://via.placeholder.com/150",
        class: "12th Grade", // Available for students only
        dashboardInfo: {
          studentsManaged: 30, // For admin
          assignedSubjects: ["Math", "Science"], // For teacher
          performance: "A+" // For student
        }
      };
      setUserProfile(fetchedData);
    };

    fetchProfile();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container p-8">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="profile-header flex items-center mb-6">
        <img src={userProfile.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mr-6" />
        <div>
          <h3 className="text-xl font-bold">{userProfile.name}</h3>
          <p className="text-gray-600">{userProfile.role}</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="mb-4">
          <p className="font-medium">Email:</p>
          <p>{userProfile.email}</p>
        </div>

        {userProfile.role === "student" && (
          <div className="mb-4">
            <p className="font-medium">Class:</p>
            <p>{userProfile.class}</p>
          </div>
        )}

        {userProfile.role === "admin" && (
          <div className="mb-4">
            <p className="font-medium">Students Managed:</p>
            <p>{userProfile.dashboardInfo.studentsManaged}</p>
          </div>
        )}

        {userProfile.role === "teacher" && (
          <div className="mb-4">
            <p className="font-medium">Assigned Subjects:</p>
            <ul>
              {userProfile.dashboardInfo.assignedSubjects.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
          </div>
        )}

        {userProfile.role === "student" && (
          <div className="mb-4">
            <p className="font-medium">Performance:</p>
            <p>{userProfile.dashboardInfo.performance}</p>
          </div>
        )}

        <Link to="/profile/edit" className="text-blue-600 underline">Edit Profile</Link>
      </div>
    </div>
  );
};

export default Profile;
