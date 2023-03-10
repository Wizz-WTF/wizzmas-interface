import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getProvider } from '../../../../constants/Provider'
import { card } from '../../../../lib/ImageUtil'
import { getTemplateImagePath } from '../../../../lib/TemplateUtil'
import { fetchRunesWalkCycleFront } from '../../../../lib/TokenArtwork'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const template = parseInt(req.query.template as string, 10)
  const token = parseInt(req.query.token as string, 10)
  const tokenContract = req.query.contract as string
  const message = req.query.message as string

  var artworkImageURL = undefined
  if (req.query.template !== undefined) {
    artworkImageURL = getTemplateImagePath(template)
  }

  var tokenImageURL = undefined
  if (req.query.contract !== undefined && req.query.token !== undefined) {
    tokenImageURL = fetchRunesWalkCycleFront(tokenContract, token)
  }

  const imageBuffer = await card({
    templatePath: artworkImageURL,
    senderImageUrl: tokenImageURL,
    message: message,
  })
  if (!imageBuffer) {
    return res.status(404).end()
  }

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', `s-maxage=${24 * 6 * 60}, stale-while-revalidate=20`)
  return res.end(imageBuffer)
}
