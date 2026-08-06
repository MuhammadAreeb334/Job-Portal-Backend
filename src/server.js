import "dotenv/config";
import cloudinary from "./config/cloudinary.js";

import app from "./app.js";
import connectDB from "./config/db.js";

await connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
