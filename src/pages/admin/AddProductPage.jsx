import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: 'MEN' },
    { name: 'WOMEN' },
    { name: 'ACCESSORIES' },
    { name: 'SCENT' },
    { name: 'COSMETIC' },
    { name: 'SHOES' },
];

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });

    const [imageFile, setImageFile] = useState(null);

    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    // Upload image to Firebase Storage and get URL
    const uploadImage = async (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    };

    // Add Product Function
    const addProductFunction = async () => {
        if (
            product.title === "" ||
            product.price === "" ||
            !imageFile ||
            product.category === "" ||
            product.description === ""
        ) {
            return toast.error("All fields are required");
        }

        setLoading(true);
        try {
            const imageUrl = await uploadImage(imageFile);
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, { ...product, productImageUrl: imageUrl });
            toast.success("Product added successfully");
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            toast.error("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
             <button
            onClick={() => navigate('/')}
            className="bg-[#493628]  text-[#D6C0B3]  py-2 ">
            Go to Home
        </button>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                {/* Add Product Form */}
                <div className="login_Form bg-[#493628] px-8 py-6 rounded-xl shadow-md">
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-[#AB886D]'>
                            Add Product
                        </h2>
                    </div>

                    {/* Title Input */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            placeholder='Product Title'
                            className='bg-[#AB886D]  text-[#493628] px-2 py-2 w-96 rounded-md outline-none placeholder-[#493628]'
                        />
                    </div>

                    {/* Price Input */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            placeholder='Product Price'
                            className='bg-[#AB886D]  text-[#493628] px-2 py-2 w-96 rounded-md outline-none placeholder-[#493628]'
                        />
                    </div>

                    {/* Image Upload Input */}
                    <div className="mb-3">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className='bg-[#AB886D]  text-[#493628] px-2 py-2 w-96 rounded-md outline-none placeholder-[#493628]'
                        />
                    </div>

                    {/* Category Select */}
                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            className="w-full px-1 py-2 bg-[#AB886D]  text-[#493628] px-2 py-2 w-96 rounded-md outline-none placeholder-[#493628]">
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => (
                                <option key={index} value={value.name}>{value.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description Textarea */}
                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            name="description"
                            placeholder="Product Description"
                            rows="5"
                            className="w-full px-2 py-1 bg-[#AB886D]  text-[#493628] px-2 py-2 w-96 rounded-md outline-none placeholder-[#493628]">
                        </textarea>
                    </div>

                    {/* Add Product Button */}
                    <div className="mb-3">
                        <button
                            onClick={addProductFunction}
                            type='button'
                            className='bg-[#D6C0B3] hover:bg-[#493628] w-full text-[#AB886D] py-[4px] rounded-lg font-bold'>
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;
