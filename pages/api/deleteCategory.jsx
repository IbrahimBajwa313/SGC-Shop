// API: api/deleteCategory.jsx
import connectDB from '../../middleware/mongoose';
import Category from '../../models/Category';

const handler = async (req, res) => {
  if (req.method === 'DELETE') {
    try {
      await connectDB();

      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Category ID is required' });
      }

      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.status(200).json({ message: 'Category deleted successfully', category: deletedCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export default handler;
