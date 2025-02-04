import React, { useState } from 'react';
import { User } from 'lucide-react';
import { AdminProfile } from '../types';

interface ProfileProps {
  profile: AdminProfile;
  onUpdateProfile: (profile: AdminProfile) => void;
  propertiesCount: number;
  totalRevenue: number;
}

const Profile: React.FC<ProfileProps> = ({
  profile,
  onUpdateProfile,
  propertiesCount,
  totalRevenue,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedProfile(prev => ({ ...prev, imageUrl }));
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {isEditing ? (
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-full overflow-hidden">
                {editedProfile.imageUrl ? (
                  <img 
                    src={editedProfile.imageUrl} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                className="block w-full rounded-lg border-blue-200 mb-2"
                placeholder="Name"
              />
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                className="block w-full rounded-lg border-blue-200"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-blue-600 hover:text-blue-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-semibold text-blue-900">Profile</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit Profile
            </button>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-20 w-20 rounded-full overflow-hidden">
              {profile.imageUrl ? (
                <img 
                  src={profile.imageUrl} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-900">{profile.name}</h3>
              <p className="text-blue-600">{profile.email}</p>
            </div>
          </div>
        </>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Properties Managed</h4>
          <p className="text-2xl font-bold text-blue-600">{propertiesCount}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Total Revenue</h4>
          <p className="text-2xl font-bold text-blue-600">KSH {totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;