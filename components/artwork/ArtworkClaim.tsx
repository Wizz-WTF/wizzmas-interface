import { NextPage } from 'next'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import WizzWTFMinterAtrifact from '../../contracts/artifacts/WizzWTFMinter.json'
import DisplayError from '../generic/DisplayError'
import { PrimaryButton, SmallTitle } from '../generic/StyledComponents'
import { ArtworkMintProps } from './ArtworkMint'

const ArtworkClaim: NextPage<ArtworkMintProps> = ({ artworkType }: ArtworkMintProps) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_WIZZ_WTF_MINTER_ADDRESS ?? '',
    contractInterface: WizzWTFMinterAtrifact.abi,
    functionName: 'claim',
    args: [artworkType],
  })
  const { data, error, write } = useContractWrite(config)
  const {
    data: txData,
    isLoading,
    isSuccess,
  } = useWaitForTransaction({
    confirmations: 1,
    hash: data?.hash,
  })

  if (isSuccess) {
    return <SmallTitle>Congrats, you claimed a free Wizz WTF!</SmallTitle>
  }

  return (
    <>
      <PrimaryButton disabled={!write || isLoading} onClick={() => write!()}>
        {isLoading ? 'Claiming...' : 'Claim now'}
      </PrimaryButton>
      {(prepareError || error) && <DisplayError error={prepareError || error} />}
    </>
  )
}

export default ArtworkClaim
