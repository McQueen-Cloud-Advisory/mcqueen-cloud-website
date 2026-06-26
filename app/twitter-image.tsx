import { createSocialImage } from "@/lib/social-image";

export const alt =
  "McQueen Cloud Advisory — practical analytics, automation, and cloud architecture";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return createSocialImage(size);
}
