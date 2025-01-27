import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

    const { userInfo } = useSelector((state) => state.auth);

    const [register, { isLoading }] = useRegisterMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate])

    const showPassword = () => {
        setVisiblePassword(!visiblePassword);
    }
    const showConfirmassword = () => {
        setVisibleConfirmPassword(!visibleConfirmPassword);
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate('/');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }
    return (
        <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
            <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
                <div className="max-md:order-1 flex flex-col justify-center md:space-y-16 space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-blue-900 to-blue-700 lg:px-8 px-4 py-4">
                    <div>
                        <h4 className="text-white text-lg">Create Your Account</h4>
                        <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                            Welcome to our registration page! Get started by creating your
                            account.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white text-lg">Simple & Secure Registration</h4>
                        <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                            Our registration process is designed to be straightforward and
                            secure. We prioritize your privacy and data security.
                        </p>
                    </div>
                </div>

                <form className="md:col-span-2 w-full py-6 px-6 sm:px-16 max-md:max-w-xl mx-auto">
                    <div className="mb-6">
                        <h3 className="text-gray-800 text-xl font-bold">Create an account</h3>
                    </div>

                    <div className="space-y-6">
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
                                    type={ visiblePassword ? 'text' : 'password'}
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
                                    type={ visibleConfirmPassword ? 'text' : 'password'}
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


                    </div>

                    <div className="mt-8">
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <button
                                type="button"
                                className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none"
                                onClick={submitHandler}
                            >
                                Create an account
                            </button>
                        )}

                    </div>
                    <p className="text-gray-600 text-sm mt-6 text-center">
                        Already have an account?{" "}
                        <Link
                            to='/login'
                            className="text-blue-600 font-semibold hover:underline ml-1"
                        >
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register;