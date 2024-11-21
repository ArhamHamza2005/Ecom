/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const userSignupFunction = async () => {
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            // Firebase createUserWithEmailAndPassword for signup
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // Create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
            };

            const userRefrence = collection(fireDB, "user");

            // Save user data to Firestore
            await addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: "",
            });

            toast.success("Signup Successfully");

            setLoading(false);
            navigate("/");
        } catch (error) {
            setLoading(false);

            // Handle Firebase error codes
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email is already registered. Please login or use another email.");
            } else {
                toast.error("Signup failed. Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#AB886D]">
            {loading && <Loader />}
            <div className="login_Form bg-[#493628] px-8 py-6 rounded-lg shadow-md max-w-md w-full">
                <div className="mb-5">
                    <h2 className="text-center text-2xl font-bold text-[#AB886D] hover:text-[#D6C0B3]">Signup</h2>
                </div>
    
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={userSignup.name}
                        onChange={(e) => {
                            setUserSignup({ ...userSignup, name: e.target.value });
                        }}
                        className="bg-[#AB886D]  px-3 py-2 w-full sm:w-96 rounded-md outline-none placeholder-[#493628]"
                    />
                </div>
    
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={userSignup.email}
                        onChange={(e) => {
                            setUserSignup({ ...userSignup, email: e.target.value });
                        }}
                        className="bg-[#AB886D] px-3 py-2 w-full sm:w-96 rounded-md outline-none placeholder-[#493628]"
                    />
                </div>
    
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder="Password"
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({ ...userSignup, password: e.target.value });
                        }}
                        className="bg-[#AB886D]  px-3 py-2 w-full sm:w-96 rounded-md outline-none placeholder-[#493628]"
                    />
                </div>
    
                <div className="mb-5">
                    <button
                        type="button"
                        onClick={userSignupFunction}
                        className="bg-[#D6C0B3] hover:bg-[#AB886D] w-full text-[#493628] py-[4px] rounded-lg font-bold"
                    >
                        Signup
                    </button>
                </div>
    
                <div>
                    <h2 className="text-[#AB886D]">
                        Have an account?{" "}
                        <Link className="text-[#AB886D] font-bold underline hover:text-[#D6C0B3] font-bold underline" to={"/login"}>
                            Login
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
    
};

export default Signup;
