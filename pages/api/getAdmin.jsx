import connectDB from '../../middleware/mongoose';
import User from '../../models/User';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await connectDB();

      // Fetch all users from the database
      const users = await User.find({});

      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
