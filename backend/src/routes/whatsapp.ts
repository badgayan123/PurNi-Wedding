import { Router } from "express";
import Guest from "../models/Guest.js";

const router = Router();
const WHATSAPP_API = "https://graph.facebook.com/v18.0";
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

router.post("/send", async (req, res) => {
  try {
    const { guestId, message, inviteCardUrl, rsvpLink } = req.body;
    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ error: "Guest not found" });

    if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
      return res.status(503).json({ error: "WhatsApp API not configured. Set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN." });
    }

    const phone = guest.whatsappNumber.replace(/\D/g, "");
    const to = phone.startsWith("91") ? phone : `91${phone}`;

    const inviteText = inviteCardUrl ? `Invite card: ${inviteCardUrl}\n\n` : "";
    const payload = {
      messaging_product: "whatsapp",
      to: to,
      type: "text",
      text: { body: `${message}\n\n${inviteText}RSVP: ${rsvpLink || ""}` },
    };

    const response = await fetch(`${WHATSAPP_API}/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    await Guest.findByIdAndUpdate(guestId, { inviteSent: true, inviteSentAt: new Date() });
    res.json({ success: true, messageId: data.messages?.[0]?.id });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Failed to send" });
  }
});

router.post("/send-reminder", async (req, res) => {
  try {
    const { guestId, message } = req.body;
    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ error: "Guest not found" });

    if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
      return res.status(503).json({ error: "WhatsApp API not configured" });
    }

    const phone = guest.whatsappNumber.replace(/\D/g, "");
    const to = phone.startsWith("91") ? phone : `91${phone}`;

    const response = await fetch(`${WHATSAPP_API}/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    await Guest.findByIdAndUpdate(guestId, { reminderSent: true, reminderSentAt: new Date() });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Failed to send" });
  }
});

router.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

router.post("/webhook", async (req, res) => {
  res.sendStatus(200);
  const body = req.body;
  if (body.object !== "whatsapp_business_account") return;
  const entry = body.entry?.[0];
  const changes = entry?.changes?.[0];
  const messages = changes?.value?.messages;
  if (!messages) return;
  for (const msg of messages) {
    const from = msg.from;
    const text = msg.text?.body || "";
    console.log(`WhatsApp message from ${from}: ${text}`);
  }
});

export default router;
