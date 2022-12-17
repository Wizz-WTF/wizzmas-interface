import { ethers } from "ethers";

export function getProvider() {
    return new ethers.providers.AlchemyProvider(
      process.env.NEXT_PUBLIC_ALCHEMY_NETWORK == "mainnet"
        ? "homestead"
        : process.env.NEXT_PUBLIC_ALCHEMY_NETWORK,
      process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    );
  }