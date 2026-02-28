"use client";

import { useState, useEffect } from "react";
import {
  Users,
  FileText,
  Send,
  Bell,
  Upload,
  CheckCircle,
  Clock,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [guests, setGuests] = useState<any[]>([]);
  const [inviteStatus, setInviteStatus] = useState({ total: 0, sent: 0, reminders: 0 });
  const [activeTab, setActiveTab] = useState<"rsvp" | "guests" | "invites">("rsvp");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", familyName: "", whatsappNumber: "", relation: "" });

  useEffect(() => {
    fetchRsvps();
    fetchGuests();
    fetchInviteStatus();
  }, []);

  const fetchRsvps = async () => {
    try {
      const res = await fetch(`${API_URL}/api/rsvp`);
      if (res.ok) setRsvps(await res.json());
    } catch {}
  };

  const fetchGuests = async () => {
    try {
      const res = await fetch(`${API_URL}/api/guests`);
      if (res.ok) setGuests(await res.json());
    } catch {}
  };

  const fetchInviteStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/api/invites/status`);
      if (res.ok) setInviteStatus(await res.json());
    } catch {}
  };

  const handleUpload = async () => {
    if (!uploadFile) return;
    setLoading(true);
    try {
      const form = new FormData();
      form.append("file", uploadFile);
      const res = await fetch(`${API_URL}/api/guests/upload`, {
        method: "POST",
        body: form,
      });
      if (res.ok) {
        setUploadFile(null);
        fetchGuests();
        fetchInviteStatus();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddGuest = async () => {
    if (!newGuest.name || !newGuest.whatsappNumber) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/guests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGuest),
      });
      if (res.ok) {
        setNewGuest({ name: "", familyName: "", whatsappNumber: "", relation: "" });
        fetchGuests();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvite = async (guest: any) => {
    setLoading(true);
    try {
      const msgRes = await fetch(`${API_URL}/api/ai/generate-invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: guest.name,
          familyName: guest.familyName,
          relation: guest.relation,
        }),
      });
      const { message } = msgRes.ok ? await msgRes.json() : { message: "Dear family, we invite you to our wedding. RSVP at our website." };
      const rsvpLink = typeof window !== "undefined" ? `${window.location.origin}#rsvp` : "";
      const inviteCardUrl = typeof window !== "undefined" ? `${window.location.origin}/invite/${encodeURIComponent(guest.familyName)}` : "";
      const res = await fetch(`${API_URL}/api/whatsapp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestId: guest._id,
          message,
          inviteCardUrl,
          rsvpLink,
        }),
      });
      if (res.ok) fetchGuests();
    } finally {
      setLoading(false);
    }
  };

  const handleReminder = async (guest: any) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/whatsapp/send-reminder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestId: guest._id,
          message: `Namaste! A gentle reminder – we'd love for you to join us at our wedding. Please RSVP at our website.`,
        }),
      });
      if (res.ok) fetchGuests();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-warm p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-serif font-medium text-charcoal mb-8">Admin Dashboard</h1>

        <div className="flex gap-2 mb-8 border-b border-gold/30 pb-4">
          {(["rsvp", "guests", "invites"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-gold text-cream"
                  : "text-warm-brown hover:bg-gold/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "rsvp" && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-charcoal flex items-center gap-2">
              <FileText className="w-5 h-5" />
              RSVPs ({rsvps.length})
            </h2>
            <div className="bg-cream rounded-xl border border-gold/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gold/10 text-warm-brown">
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Members</th>
                      <th className="p-3 text-left">Food</th>
                      <th className="p-3 text-left">Attendance</th>
                      <th className="p-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((r) => (
                      <tr key={r._id} className="border-t border-gold/10">
                        <td className="p-3">{r.name}</td>
                        <td className="p-3">{r.numberOfMembers}</td>
                        <td className="p-3 capitalize">{r.foodPreference}</td>
                        <td className="p-3 capitalize">{r.attendance?.replace("-", " ")}</td>
                        <td className="p-3">{new Date(r.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "guests" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium text-charcoal mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Add Guest
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <input
                  placeholder="Name"
                  className="p-2 rounded border border-gold/30"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest((g) => ({ ...g, name: e.target.value }))}
                />
                <input
                  placeholder="Family Name"
                  className="p-2 rounded border border-gold/30"
                  value={newGuest.familyName}
                  onChange={(e) => setNewGuest((g) => ({ ...g, familyName: e.target.value }))}
                />
                <input
                  placeholder="WhatsApp"
                  className="p-2 rounded border border-gold/30"
                  value={newGuest.whatsappNumber}
                  onChange={(e) => setNewGuest((g) => ({ ...g, whatsappNumber: e.target.value }))}
                />
                <input
                  placeholder="Relation"
                  className="p-2 rounded border border-gold/30"
                  value={newGuest.relation}
                  onChange={(e) => setNewGuest((g) => ({ ...g, relation: e.target.value }))}
                />
              </div>
              <button
                onClick={handleAddGuest}
                disabled={loading}
                className="px-4 py-2 bg-gold text-cream rounded-lg"
              >
                Add
              </button>
            </div>

            <div>
              <h2 className="text-xl font-medium text-charcoal mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Bulk Upload (Name | Family | WhatsApp | Relation)
              </h2>
              <div className="flex gap-2 items-center mb-4">
                <input
                  type="file"
                  accept=".txt,.csv"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="text-sm"
                />
                <button
                  onClick={handleUpload}
                  disabled={!uploadFile || loading}
                  className="px-4 py-2 bg-gold text-cream rounded-lg disabled:opacity-50"
                >
                  Upload
                </button>
              </div>
            </div>

            <div className="bg-cream rounded-xl border border-gold/20 overflow-hidden">
              <div className="overflow-x-auto max-h-80">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gold/10">
                    <tr className="text-warm-brown">
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Family</th>
                      <th className="p-3 text-left">WhatsApp</th>
                      <th className="p-3 text-left">Relation</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((g) => (
                      <tr key={g._id} className="border-t border-gold/10">
                        <td className="p-3">{g.name}</td>
                        <td className="p-3">{g.familyName}</td>
                        <td className="p-3">{g.whatsappNumber}</td>
                        <td className="p-3">{g.relation}</td>
                        <td className="p-3">
                          {g.inviteSent ? (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="w-4 h-4" /> Sent
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-amber-600">
                              <Clock className="w-4 h-4" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="p-3 flex gap-2">
                          {!g.inviteSent && (
                            <button
                              onClick={() => handleSendInvite(g)}
                              disabled={loading}
                              className="p-1.5 bg-gold text-cream rounded hover:bg-gold-soft"
                              title="Send invite"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          )}
                          {g.inviteSent && !g.reminderSent && (
                            <button
                              onClick={() => handleReminder(g)}
                              disabled={loading}
                              className="p-1.5 bg-amber-600 text-cream rounded"
                              title="Send reminder"
                            >
                              <Bell className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "invites" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-cream rounded-xl border border-gold/20 p-6">
              <p className="text-warm-brown text-sm">Total Guests</p>
              <p className="text-2xl font-medium text-charcoal mt-1">{inviteStatus.total}</p>
            </div>
            <div className="bg-cream rounded-xl border border-gold/20 p-6">
              <p className="text-warm-brown text-sm">Invites Sent</p>
              <p className="text-2xl font-medium text-green-600 mt-1">{inviteStatus.sent}</p>
            </div>
            <div className="bg-cream rounded-xl border border-gold/20 p-6">
              <p className="text-warm-brown text-sm">Reminders Sent</p>
              <p className="text-2xl font-medium text-amber-600 mt-1">{inviteStatus.reminders}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
