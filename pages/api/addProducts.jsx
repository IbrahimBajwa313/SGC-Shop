import connectDB from "../../middleware/mongoose";
import Product from "../../models/Product";
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing, we use formidable
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Parse the form data
      const form = new formidable.IncomingForm();
      
      // Set the directory to store product images inside public/productImages
      form.uploadDir = path.join(process.cwd(), '/public/productImages');
      
      // Keep file extensions
      form.keepExtensions = true;

      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'Error parsing form data' });

        // Extract product fields and files
        const { title, desc, category, size, price, availableQty } = fields;
        
        // Create a folder for the product using its title
        const productFolder = path.join(form.uploadDir, title.replace(/\s+/g, '_')); // Sanitize the title to create a valid folder name
        if (!fs.existsSync(productFolder)) {
          fs.mkdirSync(productFolder, { recursive: true }); // Create the folder if it doesn't exist
        }

        // Prepare the file paths for the images (thumbnail and additional images)
        const imgThumbnail = files.imgThumbnail ? path.join(productFolder, files.imgThumbnail[0].newFilename) : '';
        const images = files.imgages ? Object.values(files.imgages).map(file => path.join(productFolder, file[0].newFilename)) : [];

        // Move the images to the product-specific folder
        if (files.imgThumbnail) {
          fs.renameSync(files.imgThumbnail[0].filepath, imgThumbnail); // Move the thumbnail
        }
        if (files.imgages) {
          files.imgages.forEach(file => {
            fs.renameSync(file[0].filepath, path.join(productFolder, file[0].newFilename)); // Move other images
          });
        }

        // Create a new product document with the image paths
        const product = new Product({
          title,
          desc,
          imgThumbnail: files.imgThumbnail ? imgThumbnail.replace('public', '') : '', // Store relative path
          images: images.map(img => img.replace('public', '')), // Store relative paths for other images
          category,
          size: size.split(','),  // Convert size to an array if it's a comma-separated string
          price,
          availableQty,
        });

        // Save the product to the database
        await product.save();

        // Respond to the client with success
        res.status(200).json({ message: 'Product uploaded successfully', product });
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
