import { NextPage } from "next";
import { useAccount, useContractRead } from "wagmi";
import WizzWTFMinterArtifact from "../../contracts/artifacts/WizzWTFMinter.json";
import ArtworkClaim from "./ArtworkClaim";
import ArtworkMint from "./ArtworkMint";
import CoverViewer from "./CoverViewer";
import { MediumTitle, SmallTitle } from "../generic/StyledComponents";

const ArtworkMinter: NextPage = () => {
  const { address } = useAccount();
  
  const {
    data: canClaim,
    isError: isCanClaimError,
    isLoading: isCanClaimLoading,
  } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_WIZZ_WTF_MINTER_ADDRESS ?? '',
    contractInterface: WizzWTFMinterArtifact.abi,
    functionName: 'canClaim',
    args: [address],
  })

  const {
    data: mintEnabled,
    isError: isMintEnabledError,
    isLoading: isMintEnabledLoading,
  } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_WIZZ_WTF_MINTER_ADDRESS ?? '',
    contractInterface: WizzWTFMinterArtifact.abi,
    functionName: "mintEnabled",
  });

  if (isMintEnabledError) {
    return <SmallTitle>Could not read contract information!</SmallTitle>;
  }

  if (mintEnabled) {
    return (
      <>
        <MediumTitle>Wizzmas WTF NFT</MediumTitle>
        {isMintEnabledLoading ||
          (isCanClaimLoading && <SmallTitle>Loading...</SmallTitle>)}
        <CoverViewer />
        {!mintEnabled && <SmallTitle>Mint is Over!</SmallTitle>}
        {!address && mintEnabled && <SmallTitle>Connect wallet to mint!</SmallTitle>}
        {canClaim && address && mintEnabled && <ArtworkClaim artworkType={0} />}
        {!canClaim && address && mintEnabled && <ArtworkMint artworkType={0} />}
      </>
    )
  } else {
    return <p>Mint is closed!</p>
  }
};

export default ArtworkMinter;