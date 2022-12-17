import type { NextApiRequest, NextApiResponse } from 'next'
import { getCardsContract } from '../../../../contracts/WizzmasCardContract'
import { card } from '../../../../lib/ImageUtil'
import { getTemplateImagePath } from '../../../../lib/TemplateUtil'
import { fetchRunesWalkCycleFront } from '../../../../lib/TokenArtwork'
import { getProvider } from '../../../../contracts/Provider'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.token == undefined) {
    return res.status(404).end()
  }

  try {
    const token = parseInt(req.query.token as string, 10)
    const contract = getCardsContract({ provider: getProvider() })
    const mintedCard = await contract.getCard(token)
    const tokenImageURL = fetchRunesWalkCycleFront(mintedCard.tokenContract, mintedCard.token)

    const imageBuffer = await card({
      templatePath: getTemplateImagePath(mintedCard.template),
      senderImageUrl: tokenImageURL,
      message: mintedCard.message,
    })
    if (!imageBuffer) {
      return res.status(500).end()
    }

    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', `s-maxage=${24 * 6 * 60}, stale-while-revalidate=20`)
    return res.end(imageBuffer)
  } catch {
    return res.status(404).end()
  }
}
