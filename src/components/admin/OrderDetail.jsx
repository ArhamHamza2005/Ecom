import { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, orderDelete } = context;
    // console.log(getAllOrder)
    return (
        <div>
            <div>
                <div className="py-5">
                    {/* text  */}
                    <h1 className=" text-xl text-[#493628] font-bold">All Order</h1>
                </div>

                {/* table  */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-[#493628] text-pink-400" >
                        <tbody>
                            <tr>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628]  bg-slate-100 font-bold fontPara text-[#493628]">
                                    S.No.
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Order Id
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Image
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Title
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Category
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Price
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Quantity
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Total Price
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Status
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Name
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Address
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    postal code
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Phone Number
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Email
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Date
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-[#493628] text-[#493628] bg-slate-100 font-bold fontPara">
                                    Action
                                </th>


                            </tr>
                            {getAllOrder.map((order) => {
                                console.log(order)
                                return (
                                    <>
                                        {order.cartItems.map((item, index) => {
                                            const { id, productImageUrl, title, category, price, quantity } = item
                                            return (
                                                <tr key={index} className="text-[#493628]">
                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 ">
                                                        {index + 1}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 ">
                                                        {id}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        <img src={productImageUrl} alt="img" />
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {title}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {category}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        ${price}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {quantity}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        ${price * quantity}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l text-green-600  first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.status}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.addressInfo.name}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.addressInfo.address}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.addressInfo.pincode}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.addressInfo.mobileNumber}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 ">
                                                        {order.email}
                                                    </td>

                                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                                        {order.date}
                                                    </td>

                                                    <td onClick={()=> orderDelete(order.id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#493628] stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                                        Delete
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
