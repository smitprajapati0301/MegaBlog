import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../Components'
import { useSelector } from "react-redux";

function Home() {
    const [posts, setPosts] = useState([]);
    const userLoggedIn = useSelector((state) => state.auth.status);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    // No posts yet & user is logged in
    if (posts.length === 0 && userLoggedIn) {
        return (
            <div className="w-full py-12 mt-8 flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 min-h-[40vh]">
                <Container>
                    <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-lg mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl border border-gray-700">
                        <h1 className="text-3xl font-bold text-purple-400">
                            🚀 No Posts Yet!
                        </h1>
                        <p className="text-gray-300 text-lg">
                            It looks like there are no posts available. Be the first to share something awesome with the community!
                        </p>
                        <a
                            href="/add-post"
                            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition"
                        >
                            Create Your First Post
                        </a>
                    </div>
                </Container>
            </div>
        );
    }

    // No posts yet & user is not logged in
    if (posts.length === 0 && !userLoggedIn) {
        return (
            <div className="w-full py-12 mt-8 flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 min-h-[40vh]">
                <Container>
                    <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl border border-gray-700">
                        <h1 className="text-3xl font-bold text-purple-400">
                            👋 Welcome to MegaBlog!
                        </h1>
                        <p className="text-gray-300 text-lg">
                            Please <span className="text-blue-400 font-semibold">log in</span> to unlock amazing posts and join our awesome community.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a
                                href="/login"
                                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition"
                            >
                                Log In
                            </a>
                            <a
                                href="/signup"
                                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg shadow transition"
                            >
                                Sign Up
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Posts available
    return (
        <div className='w-full py-8 bg-gray-50 dark:bg-gray-900 min-h-screen'>
            <Container>
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
                    📢 Latest Posts
                </h1>
                <div className='flex flex-wrap gap-4 justify-center'>
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className='w-full sm:w-1/2 lg:w-1/4'
                        >
                            <PostCard
                                $id={post.$id}
                                title={post.title}
                                featuredImage={post.featuredImage}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
