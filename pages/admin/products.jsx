import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { useRouter } from "next/router";
import Link from "next/link";

const Products = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/getProducts");
      const result = await response.json();
      if (result?.products) setItems(result.products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    router.push(`/editProduct/${id}`);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/deleteProduct/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setItems((prevItems) => prevItems.filter((item) => item._id !== id));
          alert("Product deleted successfully.");
        } else {
          alert("Failed to delete the product.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
          <button
            onClick={() => router.push("/admin/addProduct")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
          >
            Add Product
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="pb-4">Name</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Created At</th>
                <th className="pb-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="py-4 flex items-center space-x-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_DOMAIN}/${item.imgThumbnail}`}
                    alt={item.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <span className="font-medium text-gray-800">
                    {item.title}
                  </span>
                </td>
                <td className="text-gray-700 font-semibold">
                  {item.category}
                </td>
                <td className="text-gray-700 font-semibold">${item.price}</td>
                <td className="text-gray-500">{item.createdAt}</td>
                <td className="flex justify-center items-center space-x-4 py-4">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
