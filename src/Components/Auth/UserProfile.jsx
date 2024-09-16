// UserProfile.jsx
import React from "react";

const UserProfile = () => {
  // Dummy user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Software Engineer at XYZ Corp.",
    profilePicture: "https://via.placeholder.com/150", // Placeholder image
    location: "New York, USA",
    followers: 320,
    following: 180,
    posts: 45,
    recentActivities: [
      "Completed a project milestone",
      "Updated profile picture",
      "Joined a new group",
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-6">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-gray-300"
        />
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-500">{user.location}</p>
          <p className="mt-2 text-gray-700">{user.bio}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-blue-600">Followers</h2>
          <p className="text-2xl font-bold text-blue-800">{user.followers}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-green-600">Following</h2>
          <p className="text-2xl font-bold text-green-800">{user.following}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-purple-600">Posts</h2>
          <p className="text-2xl font-bold text-purple-800">{user.posts}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Recent Activities</h2>
        <ul className="mt-4 space-y-2">
          {user.recentActivities.map((activity, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm">
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
