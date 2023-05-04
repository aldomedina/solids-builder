import { ConnectButton as RainbowKitConnectButton } from "@rainbow-me/rainbowkit";
import s from "./style.module.scss";

const DISPLAY_CHAIN = false;

const ConnectButton = () => (
  <RainbowKitConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      authenticationStatus,
      mounted,
    }) => {
      // Note: If your app doesn't use authentication, you
      // can remove all 'authenticationStatus' checks
      const ready = mounted && authenticationStatus !== "loading";
      const connected =
        ready &&
        account &&
        chain &&
        (!authenticationStatus || authenticationStatus === "authenticated");
      return (
        <div
          {...(!ready && {
            "aria-hidden": true,
            style: {
              opacity: 0,
              pointerEvents: "none",
              userSelect: "none",
            },
          })}
        >
          {(() => {
            if (!connected) {
              return (
                <button
                  className={s.btn}
                  onClick={openConnectModal}
                  type="button"
                >
                  Connect Wallet
                </button>
              );
            }
            if (chain.unsupported) {
              return (
                <button
                  className={s.btn}
                  onClick={openChainModal}
                  type="button"
                >
                  Wrong network
                </button>
              );
            }
            return (
              <div style={{ display: "flex", gap: 3 }}>
                {DISPLAY_CHAIN && (
                  <button
                    className={s.btn}
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                )}
                <button
                  className={s.btn}
                  onClick={openAccountModal}
                  type="button"
                >
                  {account.displayName}
                </button>
              </div>
            );
          })()}
        </div>
      );
    }}
  </RainbowKitConnectButton.Custom>
);

export default ConnectButton;
