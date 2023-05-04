export interface ISolid {
  contract: Contract;
  id: ISolidID;
  title: string;
  description: string;
  tokenUri: TokenUri;
  media?: MediaEntity[] | null;
  metadata: Metadata;
  timeLastUpdated: string;
  contractMetadata: ContractMetadata;
}

export interface Metadata {
  image: string;
  Legs: string;
  tokenID: string;
  Background: string;
  Archetype: string;
  Size: string;
  description: string;
  Dimension: string;
  Skylight: string;
  external_url: string;
  Entrance: string;
  background_color: string;
  model_url: string;
  Openings: string;
  name: string;
  Skin: string;
}

export interface Contract {
  address: string;
}

export interface ISolidID {
  tokenId: string;
  tokenMetadata: TokenMetadata;
}

export interface TokenMetadata {
  tokenType: string;
}

export interface TokenUri {
  gateway: string;
  raw: string;
}

export interface MediaEntity {
  gateway: string;
  thumbnail: string;
  raw: string;
  format: string;
  bytes: number;
}

export interface ContractMetadata {
  name: string;
  symbol: string;
  totalSupply: string;
  tokenType: string;
  contractDeployer: string;
  deployedBlockNumber: number;
  openSea: OpenSea;
}

export interface OpenSea {
  floorPrice: number;
  collectionName: string;
  safelistRequestStatus: string;
  imageUrl: string;
  description: string;
  externalUrl: string;
  twitterUsername: string;
  lastIngestedAt: string;
}
