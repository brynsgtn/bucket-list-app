import "@fontsource/inter";
import "@fontsource/roboto";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Landing = () => {
    return (
        <>
            <Header />
            <div className="h-fit bg-gradient-to-b from-gray-100 via-white to-indigo-56">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-54 font-sans">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
                    <div className="text-center">
                        <h1 className="text-5xl font-black text-gray-900 sm:text-7xl transform rotate-1 scale-110 tracking-tight shadow-2xl">
                            Bucket Board
                        </h1>

                        <p className="mt-8 text-lg leading-relaxed font-medium text-gray-600 sm:text-xl">
                            Your personal guide to setting, tracking, and accomplishing every goal on your bucket list—because life is too short to wait.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to='/login' className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>
                                Sign in
                            </Link>
                            <Link to='register' className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Landing;
