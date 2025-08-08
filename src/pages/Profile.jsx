import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import authService from '../appwrite/auth';
import { Query } from 'appwrite';
import appwriteService from '../appwrite/config';
import PostCard from '../Components/PostCard';

function Profile() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);

    const [newName, setNewName] = useState('');
    const [message, setMessage] = useState('');
    const [userPosts, setUserPosts] = useState([]);
    const [editing, setEditing] = useState(false);

    // Set initial name
    useEffect(() => {
        if (userData?.name) {
            setNewName(userData.name);
        }
    }, [userData]);

    // Fetch user posts
    useEffect(() => {
        if (userData?.$id) {
            appwriteService
                .getPosts([Query.equal("userId", userData.$id)])
                .then((res) => {
                    if (res) setUserPosts(res.documents);
                });
        }
    }, [userData]);

    // Handle name update
    const handleNameUpdate = async () => {
        try {
            await authService.account.updateName(newName);
            const updatedUser = await authService.getCurrentUser();
            dispatch(login({ userData: updatedUser }));
            setMessage("✅ Name updated successfully!");
        } catch (error) {
            console.error("Failed to update name:", error);
            setMessage("❌ Failed to update name.");
        }
    };

    // Prevent rendering before userData is ready
    if (!userData) return <p className="p-6 text-center text-gray-600">Loading...</p>;

    return (
        <div className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-xl border border-blue-200 mt-10">
            {message && (
                <p className={`text-sm mb-4 font-medium ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
            <h1 className="text-3xl font-extrabold mb-6 text-blue-800 tracking-tight">Your Profile</h1>

            <div className="space-y-8">
                {/* Name section */}
                <div>
                    <label className="block font-semibold mb-2 text-blue-700">Current Name</label>
                    <p className="text-gray-900 mb-3 text-lg font-medium">{userData.name}</p>

                    {editing ? (
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            />
                            <button
                                onClick={async () => {
                                    await handleNameUpdate();
                                    setEditing(false);
                                }}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setNewName(userData.name);
                                    setEditing(false);
                                }}
                                className="text-blue-600 px-4 py-2 rounded-lg font-semibold hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setEditing(true)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Update Name
                        </button>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block font-semibold mb-2 text-blue-700">Email</label>
                    <p className="text-gray-900 text-lg">{userData.email}</p>
                </div>
            </div>

            {/* Posts */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4 text-blue-800">Your Posts</h2>
                {userPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userPosts.map((post) => (
                            <PostCard
                                key={post.$id}
                                $id={post.$id}
                                title={post.title}
                                featuredImage={post.featuredImage}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">You haven't written any posts yet.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
