import connectDB from '../../middleware/mongoose';
import Product from '../../models/Product';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Fetch all products
      const products = await Product.find();

      // Add the discounted price to the response
      const formattedProducts = products.map(product => ({
        id: product._id,
        title: product.title,
        desc: product.desc,
        images: product.images,
        category: product.category,
        sizes: product.sizes,
        price: product.price,
        discountedPrice: product.discount > 0 ? product.price - (product.price * (product.discount / 100)) : product.price,
        availability: product.availability,
        availableQuantity: product.availableQuantity,
        discount: product.discount,
      }));

      console.log('formattedProducts', formattedProducts)

      return res.status(200).json({ success: true, products: formattedProducts });
    } catch (error) {
      console.error('Error fetching products:', error.message);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};

export default connectDB(handler);
