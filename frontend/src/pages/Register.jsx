import { useState } from "react";
import { Link } from "react-router-dom";

const Registe = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        rememberMe: false,
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };
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
                                    value={formData.name}
                                    onChange={handleChange}
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
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-600 text-sm mb-2 block">Confirm Password</label>
                            <div className="relative flex items-center">
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="mt-8">
                        <button
                            type="button"
                            className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none"
                        >
                            Create an account
                        </button>
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

export default Registe