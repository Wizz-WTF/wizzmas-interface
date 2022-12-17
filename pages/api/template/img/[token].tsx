import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { getCardsContract } from '../../../../contracts/WizzmasCardContract'
import { getProvider } from '../../../../constants/Provider'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.token == undefined) {
    return res.end(404)
  }

  const token = parseInt(req.query.token as string, 10)
  const provider = getProvider()
  const contract = getCardsContract({ provider: provider })
  const available = (await contract.numTemplates() > token)
  if (!available) {
    return res.status(404).end()
  }

  const imagePath = path.resolve('./data/template', `img/${token}.png`)
  if (!fs.existsSync(imagePath)) {
    return res.end(404)
  }
  const imageBuffer = fs.readFileSync(imagePath)
  return res.end(imageBuffer)
}

export default handler
