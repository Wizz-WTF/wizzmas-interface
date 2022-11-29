import { NextPage } from "next";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import WizzmasArtworkMinterArtifact from "../../contracts/WizzmasArtworkMinter.json";
import DisplayError from "../generic/DisplayError";
import { PrimaryButton } from "../generic/StyledComponents";
import { ArtworkMintProps } from "./ArtworkMint";

const ArtworkClaim: NextPage<ArtworkMintProps> = ({
  artworkType,
}: ArtworkMintProps) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_ARTWORKMINTER_CONTRACT_ADDRESS ?? "",
    contractInterface: WizzmasArtworkMinterArtifact.abi,
    functionName: "claim",
    args: [artworkType],
  });
  const { data, error, write } = useContractWrite(config);
  const {
    data: txData,
    isLoading,
    isSuccess,
  } = useWaitForTransaction({
    confirmations: 1,
    hash: data?.hash,
  });

  if (isSuccess) {
    return <h3>Congrats, you claimed a free WizzmasArtwork!</h3>;
  }

  return (
    <>
      <PrimaryButton disabled={!write || isLoading} onClick={() => write!()}>
        {isLoading ? "Claiming..." : "Claim now"}
      </PrimaryButton>
      {(prepareError || error) && (
        <DisplayError error={prepareError || error} />
      )}
    </>
  );
};

export default ArtworkClaim;
