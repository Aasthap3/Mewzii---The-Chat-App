import express from 'express';
import connectDB from './src/config/db.js';
await connectDB();
import cloudinary from './src/config/cloudinary.js';

const app = express();

app.get('/', (req, res) => {
  res.json({message: "Mewzii Chat App Connected"});
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await cloudinary.api.resources({ max_results: 1 });
    console.log("Cloudinary is connected successfully");
  } catch (error) {
    console.error("Cloudinary connection failed:", error);
    process.exit(1);
  }
});