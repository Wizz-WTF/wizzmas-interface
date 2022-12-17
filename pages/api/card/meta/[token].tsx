import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getBaseUrl } from '../../../../constants'
import { getProvider } from '../../../../constants/Provider'
import { getERC721Contract } from '../../../../contracts/ERC721Contract'
import { getCardsContract } from '../../../../contracts/WizzmasCardContract'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = parseInt(req.query.token as string, 10)
  if (token == undefined) {
    return res.status(404).end()
  }

  try {
    const contract = getCardsContract({ provider: getProvider() })
    const mintedCard = await contract.getCard(token)

    const artworkMeta = await fetch(
      `${getBaseUrl() ?? 'http://localhost:3000'}/api/artwork/meta/${mintedCard.artwork}`
    ).then((res) => res?.json())

    const contractName = await getERC721Contract({
      address: mintedCard.tokenContract,
      provider: getProvider(),
    }).name()

    const meta = {
      description: 'Wizzmas Cards',
      external_url: 'https://cards.wizz.wtf',
      name: `Wizzmas Card #${mintedCard.token}`,
      animation_url: `https://cards.wizz.wtf/api/card/dynamic/${mintedCard.token}`,
      image: `https://cards.wizz.wtf/api/card/img/${mintedCard.token}`,
      background_color: '000000',
      attributes: [
        {
          trait_type: 'Token',
          value: mintedCard.token,
        },
        {
          trait_type: 'Token Type',
          value: contractName,
        },
        ...artworkMeta.attributes,
        {
          trait_type: 'Message',
          value: mintedCard.message,
        },
      ],
    }
    res.setHeader('Cache-Control', `s-maxage=${24 * 6 * 60}, stale-while-revalidate=20`)
    return res.end(JSON.stringify(meta))
  } catch (error) {
    console.error(error);
    return res.status(404).end()
  }
}
