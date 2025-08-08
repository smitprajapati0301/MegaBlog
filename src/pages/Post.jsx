import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState(post?.likes || 0)
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

   

    const deletePost = () => {
        if (!post) return;
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                if (post.featuredImage) {
                    appwriteService.deleteFile(post.featuredImage);
                }
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10 bg-gray-50 min-h-screen">
            <Container>
                <div className="bg-white border rounded-xl shadow p-6 max-w-3xl mx-auto">
                    {/* Image */}
                    {post?.featuredImage && (
                        <div className="mb-6 flex justify-center">
                            <img
                                src={appwriteService.getFileView(post.featuredImage)}
                                alt={post?.title || "Post Image"}
                                className="max-h-64 w-auto rounded"
                            />
                        </div>
                    )}

                    {/* Title & Author */}
                    <h1 className="text-3xl font-bold mb-2">{post?.title || "Untitled Post"}</h1>
                    {post?.author && (
                        <div className="flex items-center mb-4">
                            <span className="text-gray-500 text-sm mr-2">By</span>
                            <span className="text-lg font-semibold text-green-600">{post.author}</span>
                        </div>
                    )}

                    {/* Heart Button without Like Count */}
                    <div className="mb-4 flex items-center gap-2">
                        <Button
                            bgColor={likes > (post?.likes || 0) ? "bg-pink-600" : "bg-pink-500 hover:bg-pink-600"}
                            className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                                likes > (post?.likes || 0) ? "ring-2 ring-pink-400" : ""
                            }`}
                            onClick={() => setLikes((prev) => prev + 1)}
                        >
                            <span
                                className={`text-lg ${
                                    likes > (post?.likes || 0) ? "text-pink-700" : "text-pink-500"
                                }`}
                            >
                                ❤️
                            </span>
                        </Button>
                    </div>

                    {/* Edit/Delete */}
                    {isAuthor && (
                        <div className="mb-4 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600 hover:bg-green-700" className="px-3 py-1 rounded text-sm">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-600 hover:bg-red-700" onClick={deletePost} className="px-3 py-1 rounded text-sm">
                                Delete
                            </Button>
                        </div>
                    )}

                    {/* Content */}
                    <div className="text-gray-800 text-base leading-relaxed mt-2">
                        {post?.content ? parse(post.content) : "No content available."}
                    </div>
                </div>
            </Container>
        </div>
    ) : (
        <div className="p-10 text-center text-gray-400 text-lg">Loading post...</div>
    );
}
