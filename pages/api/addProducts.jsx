import connectDB from '../../middleware/mongoose';
import Product from '../../models/Product';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to use formidable
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await connectDB();

     
      
      const form = formidable({
        uploadDir: './public/productImages', // Ensure the directory exists
        keepExtensions: true,
        multiples: true, // Allow multiple files
    });

    try {
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ fields, files });
            });
        });
        const { title, desc, category, size, price, availableQty } = fields;
        
            if (!title || !desc || !category || !size || !price || !availableQty) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        const productFolder = path.join(form.uploadDir, title.join('_'));
        await fs.mkdir(productFolder, { recursive: true });

        let imgThumbnailPath = '';
        const imagesPaths = [];

        // Handle Thumbnail
        if (files.imgThumbnail) {
          const imgThumbnailFile = Array.isArray(files.imgThumbnail) ? files.imgThumbnail[0] : files.imgThumbnail;
          imgThumbnailPath = path.join(productFolder, imgThumbnailFile.originalFilename);
        
          // Rename the file to its new location
          await fs.rename(imgThumbnailFile.filepath, imgThumbnailPath);
        
          // Store the path starting from the 'public' folder
          imgThumbnailPath = imgThumbnailPath.replace(path.join(process.cwd(), "public"), "");
        }
        
        // Handle Additional Images
        if (files.imgages) {
          const images = Array.isArray(files.imgages) ? files.imgages : [files.imgages];
          for (const file of images) {
            const filePath = path.join(productFolder, file.originalFilename);
        
            // Rename the file to its new location
            await fs.rename(file.filepath, filePath);
        
            // Add the relative path starting from the 'public' folder
            imagesPaths.push(filePath.replace(path.join(process.cwd(), "public"), "").replace(/\\/g, "/"));
          }
        }
        
        
const strTitles=title[0];
const strDescription=desc[0];
const strCategory=category[0];
        const product = new Product({
          title:strTitles,
         desc:strDescription,
         imgThumbnail:imgThumbnailPath.replace(/\\/g, "/"),
          imgages: imagesPaths ,
          category:strCategory,
          size: size[0].split(','), // Convert sizes to array
          price: parseFloat(price),
          availableQty: parseInt(availableQty, 10),
        });

        await product.save();
        console.log('Product saved:', product);
        res.status(200).json({ message: 'Product uploaded successfully', product });
      

      
       
    } catch (error) {
        console.error('Error parsing form:', error);
        res.status(500).json({ message: 'Error processing form data' });
    }
  

      //   // Validate required fields
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
