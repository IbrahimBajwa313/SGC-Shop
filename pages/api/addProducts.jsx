import connectDB from "../../middleware/mongoose";
import Product from "../../models/Product";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing
  },
};

const handler = async (req, res) => {
  await connectDB(); // Ensure database connection

  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    // Configure formidable
    form.uploadDir = path.join(process.cwd(), "public", "productImages");
    form.keepExtensions = true;

    // Ensure upload directory exists
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }

    try {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(500).json({ error: "Error parsing form data" });
        }

        const { title, desc, category, size, price, availableQty } = fields;

        // Sanitize and create product-specific folder
        const productFolder = path.join(form.uploadDir, title.replace(/\s+/g, "_"));
        if (!fs.existsSync(productFolder)) {
          fs.mkdirSync(productFolder, { recursive: true });
        }

        // Handle thumbnail
        let imgThumbnail = "";
        if (files.imgThumbnail) {
          const thumbnailPath = path.join(productFolder, files.imgThumbnail.newFilename);
          fs.renameSync(files.imgThumbnail.filepath, thumbnailPath);
          imgThumbnail = thumbnailPath.replace("public", "");
        }

        // Handle additional images
        const images = [];
        if (files.imgages) {
          const imgArray = Array.isArray(files.imgages) ? files.imgages : [files.imgages];
          imgArray.forEach((file) => {
            const imagePath = path.join(productFolder, file.newFilename);
            fs.renameSync(file.filepath, imagePath);
            images.push(imagePath.replace("public", ""));
          });
        }

        // Save product to database
        const product = new Product({
          title,
          desc,
          imgThumbnail,
          images,
          category,
          size: size ? size.split(",") : [],
          price: parseFloat(price),
          availableQty: parseInt(availableQty, 10),
        });

        await product.save();
        res.status(200).json({ message: "Product uploaded successfully", product });
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
