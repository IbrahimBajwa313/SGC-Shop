import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/loader'; // Importing the Loader component
import '../styles/globals.css';
import Head from 'next/head';
import { useState, useEffect, createContext, useContext } from 'react';
import Headroom from 'react-headroom';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa6';
import { UserProvider } from '../context/UserContext';

export const productInfo = createContext();

// Using Context API to use functions in other files
export function MyContext() {
  return useContext(productInfo);
}

// App Function
export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [formSubmit, setformSubmit] = useState(0);
  const [loading, setLoading] = useState(false); // State to track loading
  const [subTotal, setSubTotal] = useState(0);  
  const [adminPage, setAdminPage] = useState(false);
  const menuLinks = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/categories", label: "Categories" },
  ];

  const router = useRouter();

  // Show loader during route changes
  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  // Initialize state and redirect logic
  useEffect(() => {
    const initializeApp = async () => {
      try { 

        // Check user authentication and redirect
        const storedUserData = localStorage.getItem("loggedInUser");
        if (router.pathname.startsWith("/admin") && !storedUserData) {
          router.push("/login");
          return;
        }

        // Determine if the page is an admin page
        setAdminPage(router.pathname.startsWith("/admin"));

        setLoading(false); // Stop loading after checks
      } catch (error) {
        console.error("Error initializing app:", error);
        localStorage.clear();
        setLoading(false); // Ensure the loader stops
      }
    };

    initializeApp();
  }, [router]);

   

  // Page will remain the same after reload
  useEffect(() => {
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    setSubTotal(localStorage.getItem('SubTotal'));
  }, []);

  // Save Cart Function to save the user's activity and calculate subTotal
  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart));

    // Calculating subTotal
    let subT = 0;
    let keys = Object.keys(myCart);

    for (let i = 0; i < keys.length; i++) {
      subT += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subT);

    localStorage.setItem('SubTotal', subT);
  };

  // Cart management functions
  const addToCart = (itemCode, name, qty, price, size, variant, img, description) => {
    let newCart = { ...cart }; // Create a copy of the cart

    if (itemCode in cart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { name, qty: 1, price, size, variant, img, description };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const oneMinusQty = (itemCode) => {
    let newCart = { ...cart };

    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - 1;
    }

    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const oneAddQty = (itemCode) => {
    let newCart = { ...cart };

    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + 1;
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const delQty = (itemCode) => {
    let newCart = { ...cart }; // Create a copy of the cart

    if (itemCode in cart) {
      delete newCart[itemCode];
    }

    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  return (
    <>
    <UserProvider>
    {/* WhatsApp Contact Link */}
    <Link
          href="https://wa.me/923074583567"
          className="fixed bottom-16 left-8 rounded-full bg-white/[0.25] text-green-500 duration-200 hover:scale-110 cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={50} />
        </Link>
      {loading && <Loader />} {/* Display loader when loading is true */}
      <Head />
      <Headroom>
        <Header cart={cart} formSubmit={formSubmit} />
      </Headroom>

       {/* Admin Menu, If user is at Admin Page this code will be executed */}
       {adminPage && (
          <div className="menu w-full mx-auto mt-6 flex justify-center items-center gap-5">
            {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-semibold text-xl cursor-pointer hover:text-gray-500 ${
                    router.pathname === link.href
                      ? "text-blue-500 font-bold"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </div>
        )}

      <productInfo.Provider 
        value={{ cart, setformSubmit, addToCart, oneMinusQty, clearCart, subTotal, oneAddQty, delQty }}
        {...pageProps}
      >
        <Component />
      </productInfo.Provider>

      <Footer />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
        rel="stylesheet"
      />
      </UserProvider>
    </>
  );
}
