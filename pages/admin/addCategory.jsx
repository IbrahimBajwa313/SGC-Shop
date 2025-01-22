import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { MyContext } from "../../pages/_app";
import { Router } from "next/router";

const AddCategory = () => {
  const { setformSubmit } = MyContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("/api/addCategory", {
        name,
        description,
      });
      setMessage(response.data.message);
      setName("");
      setDescription("");

      // Delay the setformSubmit update by 2 seconds
      setTimeout(() => {
        setformSubmit((prev) => prev + 1);
      }, 2000);
      router.push('/admin/category')
    } catch (err) {
      const errorMessage = err.response?.data?.error || "An error occurred";
      setError(errorMessage);
    }
  };

  return (
    <>
      <div className="container min-h-screen mt-16 mx-auto max-w-md  pt-16">
        <div className="border border-black rounded-lg shadow-lg p-16 m-8  ">
          <h1 className="text-2xl font-bold my-4 text-center">
            Add New Category
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xl font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter category name"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Category
            </button>

            {message && (
              <p className="mt-4 text-green-600 text-center">{message}</p>
            )}
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
