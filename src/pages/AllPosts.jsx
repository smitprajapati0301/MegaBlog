import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../Components'
import service from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <Container>
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Posts</h1>
                <div className="flex flex-wrap justify-center gap-6">
                    {posts.length === 0 ? (
                        <div className="text-gray-500 text-lg mt-10">No posts found.</div>
                    ) : (
                        posts.map((post) => (
                            <div
                                key={post.$id}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                            >
                                <PostCard
                                    $id={post.$id}
                                    title={post.title}
                                    featuredImage={post.featuredImage}
                                />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
