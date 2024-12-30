// import fs from 'fs';
// import path from 'path';
// import formidable from 'formidable';
// import connectDB from '../../middleware/mongoose';
// import Product from '../../models/Product';

// // Middleware to handle multipart/form-data
// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parser
//   },
// };

// // API handler for creating a new product
// export default async function handler(req, res) {
//   // Connect to the database
//   await connectDB();

//   // Allow only POST requests
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   // Directory for uploading files
//   const uploadDir = path.join(process.cwd(), 'public/uploads');

//   // Ensure the upload directory exists
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }

//   // Setup formidable form parser
//   const form = formidable({
//     uploadDir,
//     keepExtensions: true,
//     maxFileSize: 100 * 1024 * 1024, // 100MB limit for files
//     filename: (name, ext, part) => `${Date.now()}_${part.originalFilename}`,
//   });

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       console.error('Error parsing form data:', err);
//       return res.status(500).json({ error: 'Error parsing form data' });
//     }

//     // Extract fields from the form
//     const { title, desc, category, price, availableQuantity, availability, discount, sizes, images } = fields;
    
//     // Ensure images are uploaded
//     // const productImages = files.images; // Images from the form
//     const imagePaths = [];

//     if (Array.isArray(images)) {
//       images.forEach((image) => {
//         const newFilename = image.newFilename;
//         imagePaths.push(newFilename); // Store only the filename
//       });
//     } else if (images) {
//       const newFilename = productImages.newFilename;
//       imagePaths.push(newFilename);
//     }

//     // Validate required fields
//     if (
//       !title ||
//       !desc ||
//       !category ||
//       !price ||
//       !availableQuantity ||
//       !availability ||
//       !sizes ||
//       !images
//     ) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     try {
//       const newProduct = new Product({
//         title,
//         desc,
//         category,
//         price,
//         availableQuantity,
//         availability: availability,  // Convert availability to boolean
//         discount: discount, // Default discount to 0
//         sizes: sizes, // Parse sizes if they are in JSON format
//         images: imagePaths, // Store the array of image paths
//       });

//       console.log('newProduct', newProduct);

//       // const savedProduct = await newProduct.save();

//       // res.status(201).json({
//       //   message: 'Product added successfully',
//       //   success: true,
//       //   product: savedProduct,
//       // });
//     } catch (error) {
//       console.error('Error saving product:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   });
// }



import fs from "fs";
import path from "path";
import formidable from "formidable";
import connectDB from '../../middleware/mongoose';
import Product from '../../models/Product';import multer from 'multer';

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 100 * 1024 * 1024, // 100MB limit
      filename: (name, ext, part) => `${Date.now()}_${part.originalFilename}`,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(500).json({ success: false, message: "Error parsing form data" });
      }

      // console.log('files', files)
      // console.log('fields', fields.images[0].name)

      // const { title, desc, category, price, availableQuantity, availability, discount, sizes  } = fields

      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const desc = Array.isArray(fields.desc) ? fields.desc[0] : fields.desc;
      const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
      const price = Array.isArray(fields.price) ? fields.price[0] : fields.price;
      const availableQuantity = Array.isArray(fields.availableQuantity) ? fields.availableQuantity[0] : fields.availableQuantity;
      const availability = Array.isArray(fields.availability) ? fields.availability[0] : fields.availability;
      const discount = Array.isArray(fields.discount) ? fields.discount[0] : fields.discount;
      const sizes = Array.isArray(fields.sizes) ? fields.sizes[0] : fields.sizes;

      if (
              !title ||
              !desc ||
              !category ||
              !price ||
              !availableQuantity ||
              !availability ||
              !sizes ||
              !files
            ) {
              return res.status(400).json({ error: 'Missing required fields' });
            }

      // Ensure the images array is being received
      const imgs = files['images[]'] || [] // Multiple images
      const imagePaths = [];
      // console.log('imgs', imgs[0].newFilename)

      imgs.forEach((image) => {
            const newFilename = image.newFilename;
            imagePaths.push(newFilename); // Save only the filename, not the full path
          });
console.log('imagePaths',imagePaths)

      try {
        const newProduct = new Product({
                  title,
                  desc,
                  category,
                  price,
                  availableQuantity,
                  availability: availability,  // Convert availability to boolean
                  discount: discount, // Default discount to 0
                  sizes: sizes, // Parse sizes if they are in JSON format
                  images: imagePaths, // Store the array of image paths
                });

        await newProduct.save();

        return res.status(201).json({ success: true, message: "product added successfully" });
      } catch (error) {
        console.error("Error saving product:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }
    });
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default connectDB(handler);
