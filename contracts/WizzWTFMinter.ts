import { ethers } from "ethers";
import WizzWTFMinterArtifact from "./artifacts/WizzWTFMinter.json";

export function getWizzWTFMinterContract({ provider }: { provider: any }) {
  if (!process.env.NEXT_PUBLIC_WIZZ_WTF_MINTER_ADDRESS) {
    throw new Error("Specify contract address");
  }
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_WIZZ_WTF_MINTER_ADDRESS,
    WizzWTFMinterArtifact.abi,
    provider
  );
}
