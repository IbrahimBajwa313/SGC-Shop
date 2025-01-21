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
