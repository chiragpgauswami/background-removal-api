const express = require("express");
const multer = require("multer");
const { removeBackgroundFromImageFile } = require("remove.bg");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "input.jpg"); // Save the uploaded file as input.jpg
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg and .png files are allowed"));
    }
  },
});

// Route to handle file upload and background removal
app.post("/remove-background", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const inputPath = req.file.path;
    const outputPath = "uploads/output.png"; // Output will be saved as PNG

    const options = {
      size: "regular",
      type: "auto",
      format: "auto",
      crop: true,
      alpha: true,
    };

    removeBackgroundFromImageFile({
      path: inputPath,
      apiKey: "YOUR_REMOVE_BG_API_KEY",
      ...options,
    })
      .then((result) => {
        console.log("Background removed successfully");
        // Save the base64 image data to a file
        fs.writeFileSync(outputPath, result.base64img, "base64");
        // Send the path to the output image
        res.json({
          success: true,
          outputPath: `http://localhost:${PORT}/${outputPath}`,
        });
      })
      .catch((error) => {
        console.error("Error removing background:", error);
        res.status(500).json({ error: "Error removing background" });
      });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
