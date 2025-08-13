import React, { useEffect, useState } from 'react'
import { FiX } from "react-icons/fi";
import api from '../config/api';
import toast from 'react-hot-toast';

const NewChatPage = ({isOpen, isClose, onFriendshipChange}) => {
  const [activeTab, setActiveTab] = useState('addFriends');
  const [users, setUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [requestedUsers, setRequestedUsers] = useState(new Set());

  const USERS_API = "/user/getAllUsersForFriendRequest";
  const FRIEND_REQUESTS_API = "/user/getFriendRequests";

  useEffect(() => {
    if(!isOpen) return;
    setLoading(true);
    setError("");
    // Clear requested users when modal opens or tab changes
    setRequestedUsers(new Set());

    if(activeTab === 'addFriends') {
      api.get(USERS_API)
        .then(res => setUsers(res.data.data))
        .catch((error) => {
          setError("Failed to fetch users");
          console.log(error);
          
        }).finally(() => setLoading(false));
    }else {
        api.get(FRIEND_REQUESTS_API)
            .then(res => setFriendRequests(res.data.data))
            .catch((error) => {
            setError("Failed to fetch friend requests");
            console.log(error);
            }).finally(() => setLoading(false));
    }
  }, [isOpen, activeTab]);

  const handleAddFriend = async (userId) => {
    try {
        const res =  await api.post(`/user/sendFriendRequest/${userId}`);
        toast.success(res.data.message);
        // Add user to requested set to show "Requested" button
        setRequestedUsers(prev => new Set([...prev, userId]));
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to send friend request");
    }
  };

  const handleAcceptFriend = async (requestId) => {
    try {
        const res = await api.post(`/user/acceptFriendRequest/${requestId}`);
        toast.success(res.data.message);
        // Refresh friend requests after accepting
        setFriendRequests(prev => prev.filter(req => req._id !== requestId));
        // Notify parent component to refresh friends list
        if (onFriendshipChange) {
          onFriendshipChange();
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to accept friend request");
    }
  };

  const handleDeclineFriend = async (requestId) => {
    try {
        const res = await api.post(`/user/declineFriendRequest/${requestId}`);
        toast.success(res.data.message);
        // Refresh friend requests after declining
        setFriendRequests(prev => prev.filter(req => req._id !== requestId));
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to decline friend request");
    }
  };

  const handleBlockFriend = async (userId) => {
    try {
        const res = await api.post(`/user/blockUser/${userId}`);
        toast.success(res.data.message);
        setFriendRequests(prev => prev.filter(req => req._id !== userId));
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to block user");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center"
        onClick={isClose}
      >
        <div 
          className="bg-base-100 rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-base-300">
            <h2 className="text-xl font-semibold">New Chat</h2>
            <button 
              onClick={isClose}
              className="btn btn-ghost btn-circle btn-sm"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          <div className="flex border-b border-base-300">
            <button
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'addFriends' 
                  ? 'text-primary border-b-2 border-primary bg-primary/5' 
                  : 'text-base-content/70 hover:text-base-content hover:bg-base-200'
              }`}
              onClick={() => setActiveTab('addFriends')}
            >
              Find People
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'friendRequests' 
                  ? 'text-primary border-b-2 border-primary bg-primary/5' 
                  : 'text-base-content/70 hover:text-base-content hover:bg-base-200'
              }`}
              onClick={() => setActiveTab('friendRequests')}
            >
              Requests
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-6 ">
                loading...
            </div>
          ) : error ? (
            <div className="flex items-center justify-center p-6 ">
                {error}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'addFriends' ? (
                  users.length === 0 ? (
                    <div className="text-center text-base-content/70">
                      No users found.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search users by name or email..."
                          className="input input-bordered w-full"
                        />
                      </div>
                      <ul>
                          {users.map((user, index) => (
                              <li key={index} className="flex items-center justify-between p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors mb-2">
                                  <div className="flex items-center gap-3">
                                      <div className="avatar">
                                          <div className="w-10 h-10 rounded-full">
                                              <img src={user.profilePicture || `https://placehold.co/600x400?text=${user.fullname?.charAt(0)?.toUpperCase()}`} alt={user.fullname} />
                                          </div>
                                      </div>
                                      <div>
                                          <p className="font-medium">{user.fullname}</p>
                                          <p className="text-sm text-base-content/60">@{user.username}</p>
                                      </div>
                                  </div>
                                  <button 
                                      className={`btn btn-sm ${
                                        requestedUsers.has(user._id) 
                                          ? 'btn-disabled bg-gray-400 text-gray-600' 
                                          : 'btn-primary'
                                      }`}
                                      onClick={() => handleAddFriend(user._id)}
                                      disabled={requestedUsers.has(user._id)}
                                  >
                                      {requestedUsers.has(user._id) ? 'Requested' : 'Add Friend'}
                                  </button>
                              </li>
                          ))}
                      </ul>
                    </div>
                  )
                ) : (
                  friendRequests.length === 0 ? (
                      <div className="text-center text-base-content/70">
                          No friend requests found.
                      </div>
                  ) : (
                      <ul>
                          {friendRequests.map((req, index) => (
                              <li key={index} className="flex items-center justify-between p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors mb-2">
                                  <div className="flex items-center gap-3">
                                      <div className="avatar">
                                          <div className="w-10 h-10 rounded-full">
                                              <img src={req.userId?.profilePicture || `https://placehold.co/600x400?text=${req.userId?.fullname?.charAt(0)?.toUpperCase()}`} alt={req.userId?.fullname} />
                                          </div>
                                      </div>
                                      <div>
                                          <p className="font-medium">{req.userId?.fullname}</p>
                                          <p className="text-sm text-base-content/60">@{req.userId?.username}</p>
                                      </div>
                                  </div>
                                  <div className="flex gap-2">
                                      <button 
                                          className="btn btn-primary btn-sm"
                                          onClick={() => handleAcceptFriend(req._id)}
                                      >
                                          Accept
                                      </button>
                                      <button 
                                          className="btn btn-ghost btn-sm"
                                          onClick={() => handleDeclineFriend(req._id)}
                                      >
                                          Decline
                                      </button>
                                      <button 
                                          className="btn btn-error btn-sm"
                                          onClick={() => handleBlockFriend(req.userId?._id)}
                                      >
                                          Block
                                      </button>
                                  </div>
                              </li>
                          ))}         
                      </ul>
                  )
                )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewChatPage;