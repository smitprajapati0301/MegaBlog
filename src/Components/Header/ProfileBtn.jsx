import React from 'react'
import Button from '../Button'
import { useNavigate } from 'react-router-dom';
function ProfileBtn() {

    const navigate = useNavigate()
    const onProfile = () => {
        navigate('/profile')
    };
return (
    <button
    onClick={onProfile}
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    >Profile</button>
)
}

export default ProfileBtn