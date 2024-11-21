import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, getAllProduct, userRole } = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="mt-10 ">
            <div className="">
                <h1 className=" text-center mb-5 text-2xl font-semibold text-[#493628] hover:text-[#D6C0B3]">Bestselling Products</h1>
            </div>

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex justify-center">
                        {loading && <Loader />}
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {getAllProduct.slice(0, 8).map((item, index) => {
                            const { id, title, price, productImageUrl, description } = item;
                            return (
                                <div key={index} className="p-3 w-full md:w-1/4">
                                    <div className="h-full border border-black rounded-xl overflow-hidden shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg">
                                        <div className="overflow-hidden rounded-t-xl">
                                            <img
                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                className="lg:h-80 h-96 w-full object-cover transition-transform duration-300 hover:scale-110"
                                                src={productImageUrl}
                                                alt="Product"
                                            />
                                        </div>
                                        <div className="p-6">

                                            <h1 className="title-font text-lg font-bold text-gray-900 mb-3">
                                                {title.substring(0, 25)}
                                            </h1>
                                            <h1 className="font-medieval text-lg title-font text-black mb-3">
                                                {description}
                                            </h1>
                                            <h2 className="title-font text-lg font-bold text-gray-900 mb-3">
                                                ${price}
                                            </h2>

                                            <div className="flex justify-center">
                                                {cartItems.some((p) => p.id === item.id) ? (
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className="bg-[#493628] hover:bg-[#D6C0B3] w-full text-[#AB886D] py-[4px] rounded-lg font-bold">
                                                        Delete From Cart
                                                    </button>
                                                ) : userRole !== 'admin' ? (
                                                    <button
                                                        onClick={() => addCart(item)}
                                                        className="bg-[#493628] hover:bg-[#D6C0B3] w-full text-[#AB886D] py-[4px] rounded-lg font-bold">
                                                        Add To Cart
                                                    </button>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePageProductCard;
