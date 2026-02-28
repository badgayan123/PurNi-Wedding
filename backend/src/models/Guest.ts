import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  familyName: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  relation: { type: String, required: true },
  inviteSent: { type: Boolean, default: false },
  inviteSentAt: { type: Date },
  reminderSent: { type: Boolean, default: false },
  reminderSentAt: { type: Date },
  rsvpReceived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Guest", guestSchema);
