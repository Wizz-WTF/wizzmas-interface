import type { NextApiRequest, NextApiResponse } from 'next'
import { getBaseUrl } from '../../../../constants'
import { generateDynamicCard } from '../../../../lib/DynamicCard'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const artwork = parseInt(req.query.artwork as string, 10)
  const template = parseInt(req.query.template as string, 10)
  const token = parseInt(req.query.token as string, 10)
  const tokenContract = req.query.contract as string
  const message = req.query.message as string

  try {
    const frontUrl = `${getBaseUrl() ?? 'http://localhost:3000'}/api/artwork/gif/${artwork}`
    const backUrl = `${
      getBaseUrl() ?? 'http://localhost:3000'
    }/api/card/img/generate?token=${token}&contract=${tokenContract}&message=${message}&template=${template}`
    const content = generateDynamicCard(frontUrl, backUrl);
    res.setHeader("Content-Type", "text/html");
    res.setHeader(
      "Cache-Control",
      `s-maxage=${24 * 6 * 60}, stale-while-revalidate=20`
    );  
    return res.end(content)
  } catch {
    return res.status(404).end()
  }
}

export default handler
