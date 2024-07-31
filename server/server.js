import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  console.log("crete");
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`Saving file to ${uploadDir}`);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log(`Saving file as ${file.originalname}`);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 }, // Limit to 100MB
});

app.post("/upload", upload.single("file"), (req, res) => {
  const data = req.body;

  console.log("File uploaded:", req.file);
  console.log("Request body data:", data);

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  return res.send("Upload complete");
});

app.listen(3001, () => console.log("Server is running"));
