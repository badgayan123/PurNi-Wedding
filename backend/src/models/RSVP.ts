import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numberOfMembers: { type: Number, required: true },
  foodPreference: { type: String, required: true },
  attendance: { type: String, required: true },
  message: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("RSVP", rsvpSchema);
