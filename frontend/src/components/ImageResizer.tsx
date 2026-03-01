"use client";

import { useState, useCallback, useEffect } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop, convertToPixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Download, Upload } from "lucide-react";

const MAX_PREVIEW_SIZE = 1200; // Downscale large images for fast crop UI

async function createPreviewUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const loadUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(loadUrl);
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (w <= MAX_PREVIEW_SIZE && h <= MAX_PREVIEW_SIZE) {
        const url = URL.createObjectURL(file);
        resolve(url);
        return;
      }
      const scale = Math.min(MAX_PREVIEW_SIZE / w, MAX_PREVIEW_SIZE / h);
      w = Math.round(w * scale);
      h = Math.round(h * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(URL.createObjectURL(file));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(URL.createObjectURL(blob));
          else resolve(URL.createObjectURL(file));
        },
        "image/jpeg",
        0.85
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(loadUrl);
      reject(new Error("Failed to load image"));
    };
    img.src = loadUrl;
  });
}

// Aspect ratios by section
export const ASPECT_RATIOS: Record<string, { w: number; h: number; label: string }> = {
  engagement: { w: 4, h: 3, label: "4:3 (Our Story)" },
  "haldi-1": { w: 4, h: 3, label: "4:3 (Events)" },
  "haldi-2": { w: 4, h: 3, label: "4:3" },
  "haldi-3": { w: 4, h: 3, label: "4:3" },
  "mehendi-1": { w: 4, h: 3, label: "4:3" },
  "mehendi-2": { w: 4, h: 3, label: "4:3" },
  "mehendi-3": { w: 4, h: 3, label: "4:3" },
  "sangeet-1": { w: 4, h: 3, label: "4:3" },
  "sangeet-2": { w: 4, h: 3, label: "4:3" },
  "sangeet-3": { w: 4, h: 3, label: "4:3" },
  "wedding-1": { w: 4, h: 3, label: "4:3" },
  "wedding-2": { w: 4, h: 3, label: "4:3" },
  "wedding-3": { w: 4, h: 3, label: "4:3" },
  "reception-1": { w: 4, h: 3, label: "4:3" },
  "reception-2": { w: 4, h: 3, label: "4:3" },
  "reception-3": { w: 4, h: 3, label: "4:3" },
  "bride-family-1": { w: 3, h: 4, label: "3:4 (Portrait)" },
  "bride-family-2": { w: 3, h: 4, label: "3:4" },
  "bride-family-3": { w: 3, h: 4, label: "3:4" },
  "bride-family-4": { w: 3, h: 4, label: "3:4" },
  "bride-family-5": { w: 3, h: 4, label: "3:4" },
  "groom-family-1": { w: 3, h: 4, label: "3:4" },
  "groom-family-2": { w: 3, h: 4, label: "3:4" },
  "groom-family-3": { w: 3, h: 4, label: "3:4" },
  "groom-family-4": { w: 3, h: 4, label: "3:4" },
  "groom-family-5": { w: 3, h: 4, label: "3:4" },
};

// Gallery uses 1:1
for (let i = 1; i <= 20; i++) {
  ASPECT_RATIOS[`gallery-${i}`] = { w: 1, h: 1, label: "1:1 (Square)" };
}

export function getAspectRatio(slot: string) {
  return ASPECT_RATIOS[slot] || { w: 4, h: 3, label: "4:3" };
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageResizer({
  file,
  slot,
  onClose,
  onUpload,
  loading,
}: {
  file: File;
  slot: string;
  onClose: () => void;
  onUpload: (slot: string, file: File) => Promise<void>;
  loading: boolean;
}) {
  const [crop, setCrop] = useState<Crop>();
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const { w, h, label } = getAspectRatio(slot);
  const aspect = w / h;

  useEffect(() => {
    setPreviewUrl(null);
    setPreviewError(null);
    setImgLoaded(false);
    setCrop(undefined);
    let revoked = false;
    createPreviewUrl(file)
      .then((url) => {
        if (!revoked) setPreviewUrl(url);
      })
      .catch((err) => {
        if (!revoked) setPreviewError(err.message || "Failed to prepare image");
      });
    return () => {
      revoked = true;
    };
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      setImgLoaded(true);
      setCrop(centerAspectCrop(img.width, img.height, aspect));
    },
    [aspect]
  );

  const getCroppedBlob = useCallback(
    async (): Promise<Blob | null> => {
      if (!imgRef || !crop || crop.width === 0 || crop.height === 0) return null;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const pixelCrop = convertToPixelCrop(crop, imgRef.width, imgRef.height);
      const scaleX = imgRef.naturalWidth / imgRef.width;
      const scaleY = imgRef.naturalHeight / imgRef.height;

      const natCrop = {
        x: pixelCrop.x * scaleX,
        y: pixelCrop.y * scaleY,
        width: pixelCrop.width * scaleX,
        height: pixelCrop.height * scaleY,
      };

      canvas.width = natCrop.width;
      canvas.height = natCrop.height;
      ctx.drawImage(imgRef, natCrop.x, natCrop.y, natCrop.width, natCrop.height, 0, 0, natCrop.width, natCrop.height);

      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png", 0.95);
      });
    },
    [imgRef, crop]
  );

  const handleDownload = async () => {
    const blob = await getCroppedBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slot}-cropped.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = async () => {
    const blob = await getCroppedBlob();
    if (!blob) return;
    const croppedFile = new File([blob], `${slot}.png`, { type: "image/png" });
    await onUpload(slot, croppedFile);
    onClose();
  };

  return (
    <div className="rounded-lg border border-gold/30 bg-cream-warm/50 p-4 mt-2">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-warm-brown font-medium">Crop to {label}</span>
        <button
          onClick={onClose}
          className="text-xs text-warm-brown hover:text-charcoal"
        >
          Change photo
        </button>
      </div>
      <div className="relative max-h-[280px] overflow-auto rounded-lg bg-warm-brown/5 min-h-[120px]">
        {!previewUrl && !previewError && (
          <div className="absolute inset-0 flex items-center justify-center text-warm-brown/60 text-sm">
            Preparing image…
          </div>
        )}
        {previewError && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500/80 text-sm p-4">
            {previewError}
          </div>
        )}
        {previewUrl && !previewError && (
          <ReactCrop
            crop={crop}
            onChange={(_, c) => setCrop(c)}
            aspect={aspect}
            circular={false}
          >
            <img
              ref={setImgRef}
              src={previewUrl}
              alt="Crop"
              onLoad={onImageLoad}
              onError={() => setPreviewError("Image failed to load")}
              className="max-w-full block min-h-[120px]"
            />
          </ReactCrop>
        )}
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={handleUpload}
          disabled={!crop?.width || !crop?.height || loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold text-cream text-sm hover:bg-gold-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-4 h-4" />
          {loading ? "Uploading…" : "Upload"}
        </button>
        <button
          onClick={handleDownload}
          disabled={!crop?.width || !crop?.height}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold/50 text-gold text-sm hover:bg-gold/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
}
