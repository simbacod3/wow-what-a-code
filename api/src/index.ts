import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5170;

app.use(express.json());

// Dynamic API route to serve JSON files
app.get("/api/:filename", (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "../static", `${req.params.filename}.json`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api`);
});
