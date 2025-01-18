import connectDB from '../../middleware/mongoose';
import Category from '../../models/Category';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await connectDB();

      const { name, description } = req.body;

      // Validate required fields
      if (!name || !description) {
        return res.status(400).json({ error: 'Both name and description are required' });
      }

      // Check if category already exists
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ error: 'Category already exists' });
      }

      // Create new category
      const category = new Category({
        name,
        description,
      });

      await category.save();

      res.status(200).json({ message: 'Category added successfully', category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
