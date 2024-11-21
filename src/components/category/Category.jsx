import { useNavigate } from "react-router";

const category = [
    { name: 'MEN' },
    { name: 'WOMEN' },
    { name: 'ACCESSORIES' },
    { name: 'SCENT' },
    { name: 'COSMETIC' },
    { name: 'SHOES' },
];

const Category = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-center mt-5">
                {/* Slim bordered navbar */}
                <div className="flex border bg-[#493628] border-gray-300 rounded-full overflow-x-scroll hide-scroll-bar px-3 py-2 ">
                    {/* Category Items */}
                    {category.map((item, index) => (
                        <div 
                            key={index} 
                            onClick={() => navigate(`/category/${item.name.toLowerCase().toUpperCase()}`)}
                            className="px-4 lg:px-8 cursor-pointer transition-all hover:text-[#AB886D] text-[#D6C0B3] text-sm lg:text-lg font-medium"
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Style for hiding scrollbar */}
            <style dangerouslySetInnerHTML={{ __html: "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n" }} />
        </div>
    );
};

export default Category;



























// import { useNavigate } from "react-router";

// // category 
// const category = [
//     {
//         image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png',
//         name: 'fashion'
//     },
//     {
//         image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png',
//         name: 'shirt'
//     },
//     {
//         image: 'https://cdn-icons-png.flaticon.com/256/8174/8174424.png',
//         name: 'jacket'
//     },
//     {
//         image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png',
//         name: 'mobile'
//     },
//     {
//         image: 'https://cdn-icons-png.flaticon.com/256/12142/12142416.png',
//         name: 'laptop'
//     },
//     {
//         image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png',
//         name: 'shoes'
//     },
//     {
//         image: 'https://cdn-icons-png.flaticon.com/256/12114/12114279.png',
//         name: 'home'
//     },
//     {
//         image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png',
//         name: 'books'
//     }
// ]

// const Category = () => {
//     // naviaget 
//     const navigate = useNavigate();
//     return (
//         <div>
//             <div className="flex flex-col mt-5">
//                 {/* main 1 */}
//                 <div className="flex overflow-x-scroll lg:justify-center  hide-scroll-bar">
//                     {/* main 2  */}
//                     <div className="flex ">
//                         {/* category  */}
//                         {category.map((item, index) => {
//                             return (
//                                 <div key={index} className="px-3 lg:px-10">
//                                     {/* Image  */}
//                                     <div onClick={() => navigate(`/category/${item.name}`)} className=" w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full  bg-pink-500 transition-all hover:bg-pink-400 cursor-pointer mb-1 " >
//                                         <div className="flex justify-center mb-12">
//                                             {/* Image tag  */}
//                                             <img src={item.image} alt="img" />
//                                         </div>
//                                     </div>

//                                     {/* Name Text  */}
//                                     <h1 className=' text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase '>{item.name}</h1>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 </div>
//             </div>

//             {/* style  */}
//             <style dangerouslySetInnerHTML={{ __html: "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n" }} />
//         </div>
//     );
// }

// export default Category;