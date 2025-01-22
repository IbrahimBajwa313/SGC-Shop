import { useEffect, useState } from 'react';
import Link from "next/link";
import React from 'react';
import Layout from '../../components/Layout';
import Loader from '../../components/loader';


const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleDel = async (id) => {
    try {
      console.log('id is', id);
      
      const response = await fetch(`/api/delProd?id=${id}`, {
        method: 'DELETE', // Set method to DELETE
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setTrigger((prev) => {
          return !prev; // Toggle the state value
        });
     
      } else {
        console.error("Failed to delete product:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/getProducts");
        const result = await response.json();

        // Ensure the response has a "products" property and it's an array
        if (result) {
          setItems(result.products);
          setIsLoading(false)
          console.log('item', result.products);
        } else {
          console.error("Invalid data structure received:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [trigger]);

  return (
    <>
    <div className='min-h-screen'>
      <div className='font-bold text-2xl mb-5  mt-6 ms-4'>Products</div>  {/* Changed font size and margin */}
      
      {/* Wrapper for Products list and Add button */}
   
        
  {  <div className="w-full p-10 space-y-5">
        {items?.map((item) => (
          <div key={item._id} className="flex justify-center items-center relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.imgThumbnail}`} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="font-bold">
                        {item.category}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="font-bold">
                        {item.availableQty}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.price}
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDel(item._id)}>
                      Remove
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
}

    </div>
    </>);
};

export default Dashboard;
