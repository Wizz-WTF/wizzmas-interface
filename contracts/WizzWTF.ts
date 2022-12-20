import { ethers } from "ethers";
import WizzWTFArtifact from "./artifacts/WizzWTF.json";

export function getWizzWTFContract({ provider }: { provider: any }) {
  if (!process.env.NEXT_PUBLIC_WIZZ_WTF_ADDRESS) {
    throw new Error("Specify contract address");
  }
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_WIZZ_WTF_ADDRESS,
    WizzWTFArtifact.abi,
    provider
  );
}
