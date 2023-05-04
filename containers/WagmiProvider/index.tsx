import { WagmiConfig, configureChains, createClient } from "wagmi";
import { mainnet, goerli, sepolia } from "@wagmi/core/chains";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";

const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
if (!apiKey) throw Error("Provide alchemy key");

export const activeChains = [mainnet, goerli, sepolia];

const { chains, provider, webSocketProvider } = configureChains(activeChains, [
  alchemyProvider({ apiKey }),
]);

const { connectors } = getDefaultWallets({
  appName: "SOLIDS BUILDER",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  connectors,
  webSocketProvider,
});

const WagmiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WagmiProvider;
