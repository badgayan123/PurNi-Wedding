import { Router } from "express";
import multer from "multer";
import Guest from "../models/Guest.js";
import fs from "fs";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get("/", async (_, res) => {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch guests" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, familyName, whatsappNumber, relation } = req.body;
    const guest = new Guest({ name, familyName, whatsappNumber, relation });
    await guest.save();
    res.status(201).json(guest);
  } catch (err) {
    res.status(500).json({ error: "Failed to add guest" });
  }
});

router.post("/bulk", async (req, res) => {
  try {
    const { guests } = req.body;
    const inserted = await Guest.insertMany(guests);
    res.status(201).json({ count: inserted.length, guests: inserted });
  } catch (err) {
    res.status(500).json({ error: "Failed to bulk add guests" });
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const content = fs.readFileSync(req.file.path, "utf-8");
    fs.unlinkSync(req.file.path);
    const lines = content.split("\n").filter((l) => l.trim());
    const guests = lines.map((line) => {
      const [name, familyName, whatsappNumber, relation] = line.split("|").map((s) => s.trim());
      return { name, familyName, whatsappNumber: whatsappNumber || "", relation: relation || "" };
    }).filter((g) => g.name && g.whatsappNumber);
    await Guest.insertMany(guests);
    res.status(201).json({ count: guests.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to process file" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: "Failed to update guest" });
  }
});

export default router;
