import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: 'MEN' },
    { name: 'WOMEN' },
    { name: 'ACCESSORIES' },
    { name: 'SCENT' },
    { name: 'COSMETIC' },
    { name: 'SHOES' },
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });

    const [imageFile, setImageFile] = useState(null); // State to hold the uploaded file

    // Get Single Product Function
    const getSingleProductFunction = async () => {
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            const product = productTemp.data();
            setProduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                category: product?.category,
                description: product?.description,
                time: product?.time,
                date: product?.date,
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            let imageUrl = product.productImageUrl; // Default to the existing image URL

            // If a new image file is selected, upload it to Firebase Storage
            if (imageFile) {
                const storage = getStorage();
                const storageRef = ref(storage, `products/${id}/${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(storageRef); // Get the new image URL
            }

            // Update the product in Firestore
            await setDoc(doc(fireDB, 'products', id), {
                ...product,
                productImageUrl: imageUrl, // Set the new image URL
            });
            toast.success("Product Updated successfully");
            getAllProductFunction();
            setLoading(false);
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Failed to update product");
        }
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div>
             <button
            onClick={() => navigate('/')}
            className="bg-black  text-white py-2 ">
            Go to Home
        </button>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                <div className="login_Form bg-[#493628] px-8 py-6  rounded-xl shadow-md">

                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-center text-2xl font-bold text-[#AB886D] '>
                            Update Product
                        </h2>
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    title: e.target.value
                                });
                            }}
                            placeholder='Product Title'
                            className='bg-[#AB886D]  text-[#493628] px-2 py-2 w-96 rounded-md outline-none placeholder-[#493628]'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    price: e.target.value
                                });
                            }}
                            placeholder='Product Price'
                            className='bg-[#AB886D]  text-[#493628] px-2 py-2 w-96 rounded-md outline-none placeholder-[#493628]'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="file" // Change input type to file
                            accept="image/png, image/jpeg" // Accept only specific file types
                            onChange={(e) => {
                                setImageFile(e.target.files[0]); // Set the selected file
                            }}
                            className='bg-[#AB886D]  text-[#493628] px-2 py-2 w-96 rounded-md outline-none placeholder-[#493628]'
                        />
                    </div>

                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    category: e.target.value
                                });
                            }}
                            className="w-full px-1 py-2 bg-[#AB886D]  text-[#493628] px-2 py-2 w-96 rounded-md outline-none placeholder-[#493628]">
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value;
                                return (
                                    <option className="first-letter:uppercase" key={index} value={name}>{name}</option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    description: e.target.value
                                });
                            }} 
                            name="description" 
                            placeholder="Product Description" 
                            rows="5" 
                            className="w-full px-2 py-1 bg-[#AB886D]  text-[#493628] px-2 py-2 w-96 rounded-md outline-none placeholder-[#493628]">
                        </textarea>
                    </div>

                    <div className="mb-3">
                        <button
                            onClick={updateProduct}
                            type='button'
                            className='bg-[#AB886D]  text-[#493628] px-2 py-2 w-96 rounded-md outline-none placeholder-[#493628]'>
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;
