
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetail from '../../components/admin/ProductDetail';
import OrderDetail from '../../components/admin/OrderDetail';
import UserDetail from '../../components/admin/UserDetail';
import { useContext } from 'react';
import myContext from '../../context/myContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const {getAllProduct, getAllOrder, getAllUser} = context;
    const navigate = useNavigate();
    
    return (
        <div>
            
            <button
            onClick={() => navigate('/')}
            className="bg-[#493628]  text-[#D6C0B3]  py-2 ">
            Go to Home
        </button>
            {/* Top */}
           

            <div className="px-5">
                {/* Mid  */}
                <div className="mid mb-5">
                    {/* main  */}
                    <div className=" bg-black-50 text-[#493628] py-5 rounded-xl border border-[#493628]">
                        {/* image  */}
                      
                        {/* text  */}
                        <center>
                        <span className=" text-center text-2xl font-bold hover:text-[#D6C0B3] text-[#493628]">Admin Dashboard</span></center>
                           <div className="">
                            {/* Name  */}
                            <center>
                            <span className=" text-center text-lg text-[#493628 hover:text-[#D6C0B3]">
                                <span className=" font-bold text-[#493628">Name : </span>
                                {user?.name}
                            </span></center>

                            {/* Email  */}
                            <center>                            <span className=" text-center text-lg text-[#493628 hover:text-[#D6C0B3]">
                                <span className=" font-bold">Email : </span>
                                {user?.email}
                            </span></center>


                            {/* Date  */}
                            <center>
                            <span className=" text-center text-lg text-[#493628 hover:text-[#D6C0B3]">
                                <span className=" font-bold">Date : </span>
                                {user?.date}
                            </span></center>

                            {/* Role  */}
                           
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="">
                    <Tabs>
                        <TabList className="flex flex-wrap -m-4 text-center justify-center">
                            {/* Total Products */}
                            <Tab className="p-4 md:w-1/5 sm:w-1/2 w-full cursor-pointer">
                                <div className=" border bg-black-50 hover:bg-black-100 border-[#493628] px-4 py-3 rounded-xl" >
                                    <div className="text-pink-500 w-12 h-12 mb-3 inline-block" >
                                       
                                        
                                    </div>
                                    <h2 className="title-font font-medium text-3xl text-[#493628] fonts1" >{getAllProduct.length}</h2>
                                    <p className=" text-[#493628]  font-bold" >Total Products</p>
                                </div>
                            </Tab>

                            {/* Total Order  */}
                            <Tab className="p-4 md:w-1/5 sm:w-1/2 w-full cursor-pointer">
                                <div className=" border bg-black-50 hover:bg-black-100 border-[#493628] px-4 py-3 rounded-xl" >
                                    <div className="text-pink-500 w-12 h-12 mb-3 inline-block" >
                                       
                                        
                                    </div>
                                    <h2 className="title-font font-medium text-3xl text-[#493628] fonts1" >{getAllOrder.length}</h2>
                                    <p className=" text-[#493628]  font-bold" >Total Products</p>
                                </div>
                            </Tab>

                            {/* Total User  */}
                            <Tab className="p-4 md:w-1/5 sm:w-1/2 w-full cursor-pointer">
                                <div className=" border bg-black-50 hover:bg-black-100 border-[#493628] px-4 py-3 rounded-xl" >
                                    <div className="text-pink-500 w-12 h-12 mb-3 inline-block" >
                                       
                                        
                                    </div>
                                    <h2 className="title-font font-medium text-3xl text-[#493628] fonts1" >{getAllUser.length}</h2>
                                    <p className=" text-[#493628]  font-bold" >Total Users</p>
                                </div>
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <ProductDetail />
                        </TabPanel>

                        <TabPanel>
                            <OrderDetail/>
                        </TabPanel>

                        <TabPanel>
                           <UserDetail/>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
