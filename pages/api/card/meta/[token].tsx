import fs from 'fs'
import path from 'path'
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

    const artworkMetaPath = path.resolve('./data/artwork', `meta/${mintedCard.artwork}.json`)
    const artworkMeta = JSON.parse(fs.readFileSync(artworkMetaPath, 'utf-8'))
    const templateMetaPath = path.resolve('./data/template', `meta/${mintedCard.template}.json`)
    const templateMeta = JSON.parse(fs.readFileSync(templateMetaPath, 'utf-8'))
  
    const contractName = await getERC721Contract({
      address: mintedCard.tokenContract,
      provider: getProvider(),
    }).name()

    const meta = {
      description: 'Wizzmas Cards',
      external_url: 'https://cards.wizz.wtf',
      name: `Wizzmas Card #${mintedCard.card}`,
      animation_url: `https://cards.wizz.wtf/api/card/dynamic/${mintedCard.card}`,
      image: `https://cards.wizz.wtf/api/card/img/${mintedCard.card}`,
      background_color: '000000',
      attributes: [
        ...artworkMeta.attributes,
        ...templateMeta.attributes,
        {
          trait_type: 'Message',
          value: mintedCard.message,
        },
        {
          trait_type: 'Token Type',
          value: contractName,
        },
        {
          trait_type: 'Token',
          value: `${mintedCard.token}`,
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
