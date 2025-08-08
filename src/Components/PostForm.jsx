import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from ".";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            author: post?.author || "",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (!userData || !userData.$id) {
            console.error("User not logged in or session expired.");
            return;
        }

        try {
            if (post) {
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (!file || !file.$id) {
                    console.error("File upload failed.");
                    return;
                }

                const fileId = file.$id;
                data.featuredImage = fileId;

                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                    author: userData.name,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error while submitting post:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                const newSlug = slugTransform(value.title);
                const currentSlug = getValues("slug");

                if (newSlug !== currentSlug) {
                    setValue("slug", newSlug, { shouldValidate: true });
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue, getValues]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="bg-white text-gray-900 rounded-lg shadow-lg p-4 md:p-8 max-w-3xl mx-auto my-6 flex flex-col gap-6"
        >
            <div className="flex flex-col gap-4">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-2 text-gray-900 bg-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Author Name:"
                    placeholder={userData?.name || "Your name"}
                    className="mb-2 text-gray-900 bg-gray-100 rounded-md px-3 py-2"
                    value={userData?.name || ""}
                    readOnly
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-2 text-gray-900 bg-gray-100 rounded-md px-3 py-2"
                    {...register("slug", { required: true })}
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    className="mb-2"
                />
            </div>

            <div className="flex flex-col gap-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-2 text-gray-900 bg-gray-100 rounded-md px-3 py-2"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {post?.featuredImage && (
                    <div className="w-full mb-2">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full h-auto max-h-48 object-cover border"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-2 text-gray-900 bg-gray-100 rounded-md px-3 py-2"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : "bg-blue-600"}
                    className="w-full py-3 text-lg font-semibold rounded-md text-white hover:bg-blue-700 transition"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
