import { type MetadataRoute } from "next";

function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fernwood Pilates Studio - Booking Lifecycle Demo",
    short_name: "Fernwood Pilates",
    description:
      "A fictional Pilates studio site showcasing full-stack architecture — Next.js, Supabase (Postgres, Auth, RLS), and a real booking/waitlist system with magic-link authentication.",
    start_url: "/",
    theme_color: "#8C0327",
    background_color: "#f1f1f1",
    display: "standalone",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-192x192.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

export default manifest;
