import { Router } from "express";
import Guest from "../models/Guest.js";

const router = Router();

router.get("/status", async (_, res) => {
  try {
    const total = await Guest.countDocuments();
    const sent = await Guest.countDocuments({ inviteSent: true });
    const reminders = await Guest.countDocuments({ reminderSent: true });
    res.json({ total, sent, reminders });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch invite status" });
  }
});

router.post("/generate-card", async (req, res) => {
  try {
    const { familyName } = req.body;
    const cardHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body { margin:0; font-family:Georgia,serif; min-height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; background:linear-gradient(rgba(212,175,55,0.15),rgba(212,175,55,0.05)); background-size:cover; }
  .card { background:rgba(255,253,248,0.95); padding:3rem; text-align:center; border:1px solid rgba(212,175,55,0.5); max-width:400px; }
  h1 { color:#8B7355; font-size:1.5rem; margin-bottom:1rem; }
  .signature { font-family:cursive; color:#6B5B4F; font-size:1.2rem; margin-top:2rem; }
</style></head>
<body>
  <div class="card">
    <h1>Welcome ${familyName} Family</h1>
    <p class="signature">"You are mine<br>I am yours<br>We are forever"</p>
  </div>
</body>
</html>`;
    res.setHeader("Content-Type", "text/html");
    res.send(cardHtml);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate card" });
  }
});

export default router;
