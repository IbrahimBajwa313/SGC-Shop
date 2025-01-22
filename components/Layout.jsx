// components/Layout.js
import Link from "next/link";
import Cookies from 'js-cookie';
const Layout = ({ children }) => {
  function removeCookie() {
   Cookies.remove('authToken')
    window.location.reload();
}

    return (
        <div className="mt-4">
                 <div className="flex justify-center font-urbanist items-center mb-5">
                <Link href={'/admin/dashboard'} className=' rounded-lg p-3 hover:font-semibold text-lg text-black cursor-pointer  me-4'>
         Dashboard
        </Link>
        <Link href={'/admin/addProducts'} className=' rounded-lg p-3 hover:font-semibold text-lg text-black cursor-pointer  me-4'>
          Add Product
        </Link>
        <Link href={'/admin/addCategory'} className=' rounded-lg p-3 hover:font-semibold text-lg text-black cursor-pointer'>
          Add Category
        </Link>
        <Link href={'/admin/deleteCategory'} className=' rounded-lg p-3 hover:font-semibold text-lg text-black cursor-pointer'>
          Delete Category
        </Link>
        <button onClick={removeCookie}  className=' rounded-lg p-3 hover:font-semibold text-lg text-black cursor-pointer'>
         Logout
        </button>
      </div>
            <main>{children}</main>
       
        </div>
    );
};

export default Layout;

// import { useEffect, useState } from 'react';
// import Loader from '../../components/loader';
// import { useRouter } from 'next/router';

// const Products = () => {
//   const [items, setItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     // Check if user is logged in and is an admin
//     // const user = JSON.parse(localStorage.getItem('loggedInUser'));
//     // if (!user) {
//     //   router.push('/login'); 
//     // }

//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch("/api/getProducts");
//         const result = await response.json();

//         if (result?.products) {
//           setItems(result.products);
//         } else {
//           console.error("Invalid data structure received:", result);
//         }
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [router]);

//   const handleEdit = (id) => {
//     router.push(`/edit/${id}`);
//   };

//   const handleDelete = async (id) => {
//     // Implement delete functionality here
//     console.log("Delete product with id:", id);
//     // Call the API to delete the product from the database
//   };

//   const handleAddProduct = () => {
//     router.push('/admin/addProduct');
//   };

//   return (
//     <div className='min-h-screen p-5  '>
//       <div className='flex justify-between items-center mb-5'>
//         <div className='font-bold text-2xl'>Products</div>
//         <button 
//           onClick={handleAddProduct} 
//           className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
//           Add Product
//         </button>
//       </div>

//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="w-full p-5 space-y-5 bg-white rounded-lg shadow-md">
//           {items?.map((item) => (
//             <div key={item._id} className="flex bg-gray-100 justify-between items-center p-4 border-b border-gray-300">
//               <div className="flex items-center space-x-4">
//                 <img src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.imgThumbnail}`} className="w-16 md:w-24 rounded-md" alt={item.title} />
//                 <div>
//                   <div className="text-lg font-semibold text-gray-900">{item.title}</div>
//                   <div className="text-gray-600">{item.category}</div>
//                   <div className="text-gray-500">Qty: {item.availableQty}</div>
//                   <div className="text-gray-700 font-bold">${item.price}</div>
//                 </div>
//               </div>
//               <div>
//                 <button 
//                   onClick={() => handleEdit(item._id)} 
//                   className="bg-blue-500 mx-4 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
//                   Edit
//                 </button>
//                 <button 
//                   onClick={() => handleDelete(item._id)} 
//                   className="bg-red-600 mx-4 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;

