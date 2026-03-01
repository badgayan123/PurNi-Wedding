import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Allowed image slots for upload
const PHOTO_SLOTS: Record<string, string> = {
  engagement: "engagement.png",
  "haldi-1": "haldi-1.png",
  "haldi-2": "haldi-2.png",
  "haldi-3": "haldi-3.png",
  "mehendi-1": "mehendi-1.png",
  "mehendi-2": "mehendi-2.png",
  "mehendi-3": "mehendi-3.png",
  "sangeet-1": "sangeet-1.png",
  "sangeet-2": "sangeet-2.png",
  "sangeet-3": "sangeet-3.png",
  "wedding-1": "wedding-1.png",
  "wedding-2": "wedding-2.png",
  "wedding-3": "wedding-3.png",
  "reception-1": "reception-1.png",
  "reception-2": "reception-2.png",
  "reception-3": "reception-3.png",
  "bride-family-1": "bride-family-1.png",
  "bride-family-2": "bride-family-2.png",
  "bride-family-3": "bride-family-3.png",
  "bride-family-4": "bride-family-4.png",
  "bride-family-5": "bride-family-5.png",
  "groom-family-1": "groom-family-1.png",
  "groom-family-2": "groom-family-2.png",
  "groom-family-3": "groom-family-3.png",
  "groom-family-4": "groom-family-4.png",
  "groom-family-5": "groom-family-5.png",
  ...Object.fromEntries(
    Array.from({ length: 20 }, (_, i) => [`gallery-${i + 1}`, `gallery-${i + 1}.png`])
  ),
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const slot = formData.get("slot") as string | null;

    if (!file || !slot) {
      return NextResponse.json(
        { error: "Missing file or slot" },
        { status: 400 }
      );
    }

    const filename = PHOTO_SLOTS[slot] || `${slot}.png`;
    const imagesDir = path.join(process.cwd(), "public", "images");
    const filepath = path.join(imagesDir, filename);

    await mkdir(imagesDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      url: `/images/${filename}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
