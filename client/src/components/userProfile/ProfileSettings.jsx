import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import ChangePasswordModal from "./ChangePasswordModal";

const ProfileSettings = ({ user }) => {
  const { theme } = useTheme();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const handleChangePassword = () => {
    setIsChangePasswordModalOpen(true);
  };
  return (
    <>
      <div className="bg-base-100 rounded-xl shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Settings</h3>
        <div className="flex flex-col gap-4">
          <div>
            <span className="font-semibold">Theme:</span>
            <span className="badge badge-outline ml-2">
              { theme || "Default"}
            </span>
          </div>
          <div>
            <span className="font-semibold">Email:</span>
            <span className="ml-2">{user?.email || "No email provided"}</span>
          </div>
          <button 
            className="btn btn-sm btn-primary w-fit mt-2"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
        
        {/* Change Password Modal */}
        <ChangePasswordModal
          isOpen={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
        />
      </div>
    </>
  );
};

export default ProfileSettings;
