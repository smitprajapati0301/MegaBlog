import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../Components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
return post ? (
    <div className="py-12 flex justify-center items-center min-h-screen bg-gray-50">
        <Container>
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <PostForm post={post} />
            </div>
        </Container>
    </div>
) : null
}

export default EditPost