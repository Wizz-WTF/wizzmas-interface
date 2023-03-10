import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'
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
  const metaPath = path.resolve('./data/artwork', `meta/${token}.json`)
  const json = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
  res.setHeader('Cache-Control', `s-maxage=${24 * 6 * 60}, stale-while-revalidate=20`)
  return res.status(200).end(JSON.stringify(json))
}

export default handler
