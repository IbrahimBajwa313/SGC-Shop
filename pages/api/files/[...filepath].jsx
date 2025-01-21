import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
    const { filepath } = req.query; // Extract file path from the request
    const filePath = path.join(process.cwd(), 'uploads/productImages', ...filepath); // Build the full file path
    console.log('file p',filePath)
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
    }[ext] || 'application/octet-stream';

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
}
