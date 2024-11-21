import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    // console.log(getAllProduct)

    // navigate 
    const navigate = useNavigate();

    // Delete product 
    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-[#493628] font-bold">All Product</h1>
                {/* Add Product Button  */}
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-[#493628] text-[#D6C0B3] rounded-lg">Add Product</button>
                </Link>
            </div>

            {/* Loading  */}
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">

                <table className="w-full text-left border border-collapse sm:border-separate border-[#493628] text-pink-400" >

                    <tbody>
                        <tr>
                        <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">S.No.</th>

                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">Title</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">Price</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">Category</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara"> Date</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">Action</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">Action</th>
                        </tr>
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl } = item
                            return (
                                <tr key={index} className="text-pink-300">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-[#493628] ">
                                        {index + 1}.
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        <div className="flex justify-center">
                                            <img className="w-20 " src={productImageUrl} alt="" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500  first-letter:uppercase text-[#493628] ">
                                        {title}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500  first-letter:uppercase text-[#493628] ">
                                        ${price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500  first-letter:uppercase text-[#493628]">
                                        {category}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500  first-letter:uppercase text-[#493628]">
                                        {date}
                                    </td>
                                    <td onClick={()=> navigate(`/updateproduct/${id}`)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                                        Edit
                                    </td>
                                    <td onClick={()=> deleteProduct(id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                        Delete
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;
