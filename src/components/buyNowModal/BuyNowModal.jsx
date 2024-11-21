/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="bg-[#D6C0B3] hover:bg-[#AB886D] hover:text-[#493628] w-full text-[#493628] py-[4px] rounded-lg font-bold"
            >
                Buy now
            </Button>
            <Dialog open={open} handler={handleOpen} className=" bg-[#AB886D]">
                <DialogBody className="">
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            value={addressInfo.name}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    name: e.target.value
                                })
                            }}
                            placeholder='Enter your name'
                            className='bg-[#493628] border border-[#D6C0B3] text-[#D6C0B3] placeholder-[#D6C0B3] px-2 py-2 w-full rounded-md outline-none '
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="address"
                            value={addressInfo.address}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    address: e.target.value
                                })
                            }}
                            placeholder='Enter your address'
                            className=' bg-[#493628] border border-[#D6C0B3] text-[#D6C0B3] placeholder-[#D6C0B3] px-2 py-2 w-full rounded-md outline-none '
                        />
                    </div>

                    { <div className="mb-3">
                        <input
                            type="number"
                            name="pincode"
                            value={addressInfo.pincode}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    pincode: e.target.value
                                })
                            }}
                            placeholder='Enter your postal code'
                            className='bg-[#493628] border border-[#D6C0B3] text-[#D6C0B3] placeholder-[#D6C0B3] px-2 py-2 w-full rounded-md outline-none  '
                        />
                    </div> }

                    <div className="mb-3">
                        <input
                            type="text"
                            name="mobileNumber"
                            value={addressInfo.mobileNumber}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    mobileNumber: e.target.value
                                })
                            }}
                            placeholder='Enter your mobileNumber'
                            className='bg-[#493628] border border-[#D6C0B3] text-[#D6C0B3] placeholder-[#D6C0B3] px-2 py-2 w-full rounded-md outline-none '
                        />
                    </div>

                    <div className="">
                        <Button

                            type="button"
                            onClick={() => {
                                handleOpen();
                                buyNowFunction();
                            }}
                            className="w-full px-4 py-3 text-center text-[#493628] bg-[#D6C0B3] border border-[#493628] dark:border-gray-700 rounded-lg hover:bg-[#AB886D]"

                        >
                            Buy now
                        </Button>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;
