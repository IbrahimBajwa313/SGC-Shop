import connectDB from '../../middleware/mongoose';
import Category from '../../models/Category';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      await connectDB();

      // Fetch all categories from the database
      const categories = await Category.find({});

      res.status(200).json({ categories }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
