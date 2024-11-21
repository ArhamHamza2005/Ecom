import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
    // user
    const user = JSON.parse(localStorage.getItem('users'));

    const context = useContext(myContext);
    const { loading, getAllOrder } = context
    // console.log(getAllOrder)

    // console.log(user)
    return (
        <Layout>
            <div className=" container mx-auto px-4 py-5 lg:py-8">
                {/* Top  */}
                <div className="top ">
                    {/* main  */}
                    <div className=" bg-black-900 py-7 rounded-xl border border-[#493628]">
                        {/* image  */}
                        {/* <div className="flex justify-center">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8jspWqGB1HmzGPaykweNGcyvemhCNqlcDvQ&s" alt="" />
                        </div> */}
                        {/* text  */}
                        <div className="">
                            {/* Name  */}
                            <h1 className=" text-center text-[#493628] text-[30px] text-bold hover:text-[#D6C0B3]">
                                <span className=" font-bold">Name : </span>
                                {user?.name}
                            </h1>

                            {/* Email  */}
                            <h1 className=" text-center text-[#493628] text-lg text-bold hover:text-[#D6C0B3]">
                                <span className=" font-bold">Email : </span>
                                {user?.email}
                            </h1>

                            {/* Date  */}
                            {/* <h1 className=" text-center text-lg">
                                <span className=" font-bold">Date : </span>
                                {user?.date}
                            </h1> */}

                            {/* Role  */}
                            {/* <h1 className=" text-center text-lg">
                                <span className=" font-bold">Role : </span>
                                {user?.role}
                            </h1> */}
                        </div>
                    </div>
                </div>

                {/* bottom  */}
                <div className="bottom">
                    {/* main 1 */}
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        {/* text  */}
                        <span className=" text-2xl lg:text-3xl font-bold text-[#493628] hover:text-[#D6C0B3] "> Your Order Details</span>

                        <div className="flex justify-center relative top-10">
                        {loading && <Loader/>}
                        </div>

                        {/* main 2 */}
                        {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => {
                            // console.log(order);
                            return (
                                <div key={index}>
                                    {order.cartItems.map((item, index) => {
                                        // console.log('item', item);
                                        const { id, date, quantity, price, title, productImageUrl, category } = item
                                        // console.log('order', order)
                                        const { status } = order
                                        return (
                                            <div key={index} className="mt-5 flex flex-col overflow-hidden rounded-xl border-[#493628] md:flex-row">
                                                {/* main 3  */}
                                                <div className="w-full border-r border-[#493628] bg-black-500 md:max-w-xs">
    {/* left */}
    <div className="p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
            {/* Order Id */}
            <div className="mb-4">
                <div className="text-sm font-semibold text-[#493628]">Order Id</div>
                <div className="text-sm font-medium text-[#D6C0B3]">#{id}</div>
            </div>

            {/* Date */}
            <div className="mb-4">
                <div className="text-sm font-semibold text-[#493628]">Date</div>
                <div className="text-sm font-medium text-[#D6C0B3]">{date}</div>
            </div>

            {/* Total Amount */}
            <div className="mb-4">
                <div className="text-sm font-semibold text-[#493628]">Total Amount</div>
                <div className="text-sm font-medium text-[#D6C0B3]">
                    $ {(Number(price) || 0) * (Number(quantity) || 0)}
                </div>
            </div>

            {/* Order Status */}
            <div className="mb-4">
                <div className="text-sm font-semibold text-[#493628]">Order Status</div>
                {status === 'pending' ? (
                    <div className="text-sm font-medium text-red-800 first-letter:uppercase">{status}</div>
                ) : (
                    <div className="text-sm font-medium text-green-800 first-letter:uppercase">{status}</div>
                )}
            </div>
        </div>
    </div>
</div>

                                                {/* right  */}
                                                <div className="flex-1">
                                                    <div className="p-8">
                                                    <ul className="-my-7 divide-y divide-gray-200">
    <li
        className="flex flex-col justify-between py-7 md:flex-row md:space-x-5"
    >
        {/* Image and Text Container */}
        <div className="flex flex-1 flex-col items-center md:items-stretch md:flex-row">
            {/* Image */}
            <div className="flex-shrink-0">
                <img
                    className="h-32 w-32 rounded-lg border border-[#493628] object-contain sm:h-40 sm:w-40"
                    src={productImageUrl}
                    alt="img"
                />
            </div>

            {/* Text */}
            <div className="mt-4 text-center md:ml-5 md:mt-0 md:text-left flex flex-col justify-between">
                <div className="flex-1">
                    <p className="text-xl font-bold text-[#493628]">{title}</p>
                    <p className="mt-1.5 text-sm font-medium text-[#493628]">{category}</p>
                </div>
                <p className="mt-4 text-sm font-medium text-[#493628]">X {quantity}</p>
            </div>
        </div>

        {/* Price */}
        <div className="mt-4 flex flex-col items-center md:ml-auto md:mt-0 md:items-end">
            <p className="text-right text-xl font-bold text-[#493628]">${price}</p>
        </div>
    </li>
</ul>


                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;

