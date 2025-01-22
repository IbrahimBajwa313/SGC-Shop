import { useEffect, useState } from 'react';
import Loader from '../../components/loader';
import { useRouter } from 'next/router';

const Categories = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and is an admin
     

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/getCategory");
        const result = await response.json();

        if (result?.categories) {
          setItems(result.categories);
        } else {
          console.error("Invalid data structure received:", result);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleEdit = (id) => {
    router.push(`/editCategory/${id}`);
  };

  const handleDelete = async (id) => {
    // Implement delete functionality here
    console.log("Delete category with id:", id);
    // Call the API to delete the category from the database
  };

  const handleAddCategory = () => {
    router.push('/admin/addCategory');
  };

  return (
    <div className='min-h-screen p-5 '>
      <div className='flex justify-between items-center mb-5'>
        <div className='font-bold text-2xl'>Categories</div>
        <button 
          onClick={handleAddCategory} 
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
          Add Category
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-5 space-y-5 bg-white rounded-lg shadow-md">
          {items?.map((item) => (
            <div key={item._id} className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{item.name}</div>
                  <div className="text-gray-600">{item.description}</div>
                </div>
              </div>
              <div>
                <button 
                  onClick={() => handleEdit(item._id)} 
                  className="bg-blue-500 mx-4 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(item._id)} 
                  className="bg-red-600 mx-4 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;