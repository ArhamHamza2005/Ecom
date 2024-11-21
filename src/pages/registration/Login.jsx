/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user));
                    setUserLogin({
                        email: "",
                        password: ""
                    });
                    toast.success("Login Successfully");
                    setLoading(false);
                    if (user.role === "user") {
                        navigate('/user-dashboard');
                    } else {
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Plese First Register");
        }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-[#AB886D]'>
            {loading && <Loader />}
            <div className="login_Form bg-[#493628] px-8 py-6  rounded-lg shadow-md max-w-md w-full">
    
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-[#AB886D] hover:text-[#D6C0B3]'>
                        Login
                    </h2>
                </div>
    
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        placeholder='Email Address'
                        value={userLogin.email}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                email: e.target.value
                            });
                        }}
                        className='bg-[#AB886D] px-3 py-2 w-full sm:w-96 rounded-md outline-none placeholder-[#493628]'
                    />
                </div>
    
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userLogin.password}
                        onChange={(e) => {
                            setUserLogin({
                                ...userLogin,
                                password: e.target.value
                            });
                        }}
                        className='bg-[#AB886D]  px-3 py-2 w-full sm:w-96 rounded-md outline-none placeholder-[#493628]'
                    />
                </div>
    
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userLoginFunction}
                        className='bg-[#D6C0B3] hover:bg-[#AB886D] w-full text-[#493628] py-[4px] rounded-lg font-bold'
                    >
                        Login
                    </button>
                </div>
    
                <div>
                    <h2 className='text-[#AB886D]'>Don't Have an account? <Link className='text-[#AB886D] font-bold underline hover:text-[#D6C0B3]' to={'/signup'}>Signup</Link></h2>
                </div>
    
            </div>
        </div>
    );
    
}

export default Login;
