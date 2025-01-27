import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from '../slices/userApiSlice';
import { setCredentials } from "../slices/authSlice";
import Spinner from '../components/Spinner';
import { toast } from "react-toastify";

const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateUserMutation();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

    const showPassword = () => {
        setVisiblePassword(!visiblePassword);
    }
    const showConfirmassword = () => {
        setVisibleConfirmPassword(!visibleConfirmPassword);
    }


    useEffect(() => {
        console.log(userInfo)
    })
    const openModal = () => {
        setIsOpen(true);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile updated')
                setIsOpen(false);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }
    return (
        <>
            <div className="flex flex-col h-screen">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <div className="flex-grow flex items-center justify-center">
                    <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg rounded-lg transform duration-200 ease-in-out">
                        {/* Cover Image */}
                        <div className="h-32 overflow-hidden rounded-t-lg">
                            <img
                                className="w-full"
                                src="https://images.unsplash.com/photo-1571685330508-bbde9940b0da?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Cover"
                            />
                        </div>
                        {/* Profile Picture */}
                        <div className="flex justify-center px-5 -mt-12">
                            <img
                                className="h-32 w-32 bg-white p-2 rounded-full shadow-md"
                                src="https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Profile"
                            />
                        </div>
                        {/* User Info */}
                        <div>
                            <div className="text-center px-14 mt-5">
                                <h2 className="text-gray-800 text-3xl font-bold">{name}</h2>
                                <p
                                    className="text-gray-400 mt-2"
                                >
                                    {email}
                                </p>
                            </div>
                            {/* Divider */}
                            <hr className="mt-6" />
                            {/* Stats */}
                            <div className="flex bg-gray-50 rounded-b-lg">
                                <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                                    <Link to="/bucket" className="font-semibold">
                                        My Bucket List
                                    </Link>
                                </div>
                                <div className="border"></div>
                                <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                                    <button className="font-semibold" onClick={openModal}>
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {isOpen && (
                    <div
                        className="fixed inset-0 z-10 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Modal Container */}
                        <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                                aria-label="Close Modal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>

                            {/* Modal Content */}
                            <h3 className="text-lg font-semibold text-gray-800">
                                Edit your profile
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Update your personal information to keep your profile up to date.
                            </p>

                            {/* Form */}
                            <form className="mt-4 space-y-3">
                                <div>
                                    <label className="text-gray-600 text-sm mb-2 block">Full Name</label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                                            placeholder="Enter name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-gray-600 text-sm mb-2 block">Email Address</label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-gray-600 text-sm mb-2 block">Password</label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="password"
                                            type={visiblePassword ? 'text' : 'password'}
                                            required
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        {password && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="#bbb"
                                                stroke="#bbb"
                                                className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                                                viewBox="0 0 128 128"
                                                onClick={showPassword}
                                            >
                                                <path
                                                    d={
                                                        visiblePassword
                                                            ? "M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM32 64c-8 0-15.732 7.732-17.078 9.353C28.268 79.268 37.732 88 48 88c10.732 0 20.195-8.924 25.078-14.647C48.268 64.732 40.732 64 32 64zm32 16a16 16 0 110-32 16 16 0 010 32z"
                                                            : "M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                                    }
                                                ></path>
                                            </svg>
                                        )}

                                    </div>
                                </div>

                                <div>
                                    <label className="text-gray-600 text-sm mb-2 block">Confirm Password</label>
                                    <div className="relative flex items-center">
                                        <input
                                            name="confirmPassword"
                                            type={visibleConfirmPassword ? 'text' : 'password'}
                                            required
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                                            placeholder="Confirm password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        {confirmPassword && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="#bbb"
                                                stroke="#bbb"
                                                className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                                                viewBox="0 0 128 128"
                                                onClick={showConfirmassword}
                                            >
                                                <path
                                                    d={
                                                        visibleConfirmPassword
                                                            ? "M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM32 64c-8 0-15.732 7.732-17.078 9.353C28.268 79.268 37.732 88 48 88c10.732 0 20.195-8.924 25.078-14.647C48.268 64.732 40.732 64 32 64zm32 16a16 16 0 110-32 16 16 0 010 32z"
                                                            : "M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                                    }
                                                ></path>
                                            </svg>
                                        )}
                                    </div>
                                </div>

                            </form>

                            {/* Action Buttons */}
                            <div className="mt-6 flex justify-end space-x-2">
                                {isLoading ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                            onClick={submitHandler}
                                        >
                                            Edit Profile
                                        </button>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                )}
                Ï
            </div>
        </>

    )
}

export default Profile