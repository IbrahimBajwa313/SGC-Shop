import Product from '../../models/Product'; // Replace with the correct path to your Product model

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;  // Extract the ID from the query parameter

      // Check if the product ID is provided
      if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }

      // Check if product exists
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Delete the product
      await Product.findByIdAndDelete(id);

      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    // Handle unsupported methods
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
