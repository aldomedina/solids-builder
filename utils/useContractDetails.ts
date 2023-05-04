import { Alchemy, Nft, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { activeChains } from "@/containers/WagmiProvider";
import { ISolid } from "@/types/solids";

const API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

const useContractDetails = (contractAddress: string) => {
  const [collection, setCollection] = useState<ISolid[]>();
  const [usersSolids, setUsersSolids] = useState<ISolid[]>();
  const { address: wallet } = useAccount();

  useEffect(() => {
    const getMintedNfts = async (wallet: string, contractAddress: string) => {
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${API_KEY}/getNFTs/`;
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${contractAddress}`;
      try {
        const response = await fetch(fetchURL, {
          method: "GET",
        }).then((data) => data.json());

        setUsersSolids(response.nfts);
      } catch (error) {
        console.log(error);
      }
    };

    contractAddress && wallet && getMintedNfts(wallet, contractAddress);
  }, [wallet, contractAddress]);

  useEffect(() => {
    const getCollection = async (contractAddress: string) => {
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${API_KEY}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${contractAddress}&withMetadata=true&startToken=""`;
      try {
        const response = await fetch(fetchURL, {
          method: "GET",
        }).then((data) => data.json());

        setCollection(response.nfts);
      } catch (error) {
        console.log(error);
      }
    };
    contractAddress && getCollection(contractAddress);
  }, [contractAddress]);

  return {
    collection,
    usersSolids,
  };
};

export default useContractDetails;
