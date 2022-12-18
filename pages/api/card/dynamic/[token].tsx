import type { NextApiRequest, NextApiResponse } from 'next'
import { getProvider } from '../../../../constants/Provider'
import { getCardsContract } from '../../../../contracts/WizzmasCardContract'
import { generateDynamicCard } from '../../../../lib/DynamicCard'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = parseInt(req.query.token as string, 10)
  if (token == undefined) {
    return res.status(404).end()
  }

  try {
    const contract = getCardsContract({ provider: getProvider() })
    const mintedCard = await contract.getCard(token)
    const frontUrl = `/api/artwork/gif/${mintedCard.artwork}`
    const backUrl = `/api/card/img/${mintedCard.card}`
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
