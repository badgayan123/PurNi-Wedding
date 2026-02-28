import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import rsvpRoutes from "./routes/rsvp.js";
import guestRoutes from "./routes/guests.js";
import inviteRoutes from "./routes/invites.js";
import aiRoutes from "./routes/ai.js";
import whatsappRoutes from "./routes/whatsapp.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

connectDB();

app.use("/api/rsvp", rsvpRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/invites", inviteRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/whatsapp", whatsappRoutes);

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Wedding API running on port ${PORT}`);
});
