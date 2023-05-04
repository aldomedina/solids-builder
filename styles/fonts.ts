import localFont from "@next/font/local";

export const apfel = localFont({
  src: [
    { path: "../assets/fonts/ApfelGrotezk-Regular.woff", weight: "400" },
    { path: "../assets/fonts/ApfelGrotezk-Fett.woff", weight: "700" },
  ],
});

export const outward = localFont({
  src: [{ path: "../assets/fonts/outward-block-webfont.woff", weight: "400" }],
});
