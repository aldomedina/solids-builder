import AppProvider from "@/containers/AppProvider";
import WagmiProvider from "@/containers/WagmiProvider";
import "@/styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </WagmiProvider>
  );
}
