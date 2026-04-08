import { QrGenerator } from "@/views/qr-generator";

export default function Page() {
  return <QrGenerator />;
}

export const metadata = {
  title: "QR Code Generator",
  description: "Generate high quality QR codes for URLs, text, and contacts for free.",
};
