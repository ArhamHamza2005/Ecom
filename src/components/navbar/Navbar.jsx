import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("users"));
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);

    const logout = () => {
        localStorage.removeItem("users");
        navigate("/login");
    };

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    const navList = (
        <ul className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 font-bold text-lg text-[#AB886D]">
            <li>
                <Link to="/" className="hover:text-[#D6C0B3] hover:underline">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/allproduct" className="hover:text-[#D6C0B3] hover:underline">
                    Products
                </Link>
            </li>
            {!user && (
                <>
                    <li>
                        <Link to="/signup" className="hover:text-[#D6C0B3] hover:underline">
                            Signup
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:text-[#D6C0B3] hover:underline">
                            Login
                        </Link>
                    </li>
                </>
            )}
            {user?.role === "user" && (
                <>
                    <li>
                        <Link to="/user-dashboard" className="hover:text-[#D6C0B3] hover:underline">
                            User
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="hover:text-[#D6C0B3] hover:underline">
                            Cart ({cartItems.length})
                        </Link>
                    </li>
                </>
            )}
            {user?.role === "admin" && (
                <li>
                    <Link to="/admin-dashboard" className="hover:text-[#D6C0B3] hover:underline">
                        Admin
                    </Link>
                </li>
            )}
            {user && (
                <li
                    className="cursor-pointer hover:text-[#D6C0B3] hover:underline"
                    onClick={logout}
                >
                    Logout
                </li>
            )}
        </ul>
    );

    return (
        <nav className="bg-[#493628] shadow-md sticky top-0 z-50 transition-all duration-300">
            <div className="flex items-center justify-between py-4 px-6 md:px-12">
                {/* Logo */}
                <div className="text-3xl font-bold text-[#D6C0B3] hover:text-[#AB886D]">
                    <Link to="/">HEXYMART</Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center">{navList}</div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMobileMenu}
                >
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 bg-black bg-opacity-90 transform ${
                        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-500 ease-in-out`}
                >
                    <div className="flex flex-col items-center py-10 space-y-6 text-xl text-white font-semibold">
                        {navList}
                        <button
                            className="absolute top-4 right-4 text-white"
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                className="w-7 h-7"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="md:hidden px-6 pb-4">
                <SearchBar />
            </div>
        </nav>
    );
};

export default Navbar;
