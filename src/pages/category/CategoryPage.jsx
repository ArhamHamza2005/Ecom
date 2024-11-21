import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;
    const navigate = useNavigate();

    // Filter products by category name (added logging for debugging)
    const filterProduct = getAllProduct.filter((obj) =>
        obj.category.toLowerCase() === categoryname.toLowerCase()
    );

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        // Log the fetched data and filtered products for debugging
        console.log("Category Name:", categoryname);
        console.log("Fetched Products:", getAllProduct);
        console.log("Filtered Products:", filterProduct);
    }, [categoryname, getAllProduct, filterProduct]);

    return (
        <Layout>
            <div className="mt-10">
                {/* Heading  */}
                <div>
                    <h1 className="text-[#493628] hover:text-[#D6C0B3] text-center mb-5 text-2xl font-semibold first-letter:uppercase">
                        {categoryname}
                    </h1>
                </div>

                {/* Main  */}
                {loading ? (
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-5 mx-auto">
                            <div className="flex flex-wrap -m-4 justify-center">
                                {/* Display Products if Filtered Products Exist */}
                                {filterProduct.length > 0 ? (
                                    filterProduct.map((item, index) => {
                                        const { id, title, price, productImageUrl ,description } = item;
                                        return (
                                            <div key={index} className="p-4 w-full md:w-1/4">
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
                                                                    Remove from Cart
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => addCart(item)}
                                                                    className="bg-[#493628] hover:bg-[#D6C0B3] w-full text-[#AB886D] py-[4px] rounded-lg font-bold">
                                                                    Add to Cart
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex justify-center items-center">
                                        <img
                                            className="mb-2"
                                            src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                                            alt="No Products"
                                        />
                                        {/* <h1 className="text-black text-xl">
                                         {categoryname}
                                        </h1> */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
};

export default CategoryPage;
