import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { getWizzWTFMinterContract } from '../../../../contracts/WizzWTFMinter'
import { getProvider } from '../../../../constants/Provider'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = parseInt(req.query.token as string, 10)
  const provider = getProvider()
  const contract = getWizzWTFMinterContract({ provider: provider })
  const available = (await contract.numArtworkTypes()).gt(token)
  if (!available) {
    return res.status(404).end()
  }
  const imagePath = path.resolve('./data/artwork', `gif/${token}.gif`)
  const imageBuffer = fs.readFileSync(imagePath)
  res.setHeader("Content-Type", "image/gif");
  res.setHeader(
    "Cache-Control",
    `s-maxage=${24 * 6 * 60}, stale-while-revalidate=20`
  );
  return res.end(imageBuffer)
}

export default handler
