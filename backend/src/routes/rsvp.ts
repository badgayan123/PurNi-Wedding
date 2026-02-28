import { Router } from "express";
import RSVP from "../models/RSVP.js";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 });
    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch RSVPs" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, numberOfMembers, foodPreference, attendance, message } = req.body;
    const rsvp = new RSVP({
      name,
      numberOfMembers,
      foodPreference,
      attendance,
      message: message || "",
    });
    await rsvp.save();
    res.status(201).json(rsvp);
  } catch (err) {
    res.status(500).json({ error: "Failed to save RSVP" });
  }
});

export default router;
