import { NextPage } from 'next'
import styled from 'styled-components'
import { SelectedToken } from './TokenPicker'
import { getBaseUrl } from '../../constants'
import { MediumTitle, VStack } from '../generic/StyledComponents'

export type CardPreviewProps = {
  templateType: number | undefined
  token: SelectedToken | undefined
  message: string | undefined
}

const CardPreview: NextPage<CardPreviewProps> = ({ templateType, token, message }: CardPreviewProps) => {
  function buildURL() {
    var url = getBaseUrl() ?? 'http://localhost:3000'
    url += '/api/card/img/generate?'
    url += templateType != undefined ? `&template=${templateType}` : ''
    url += message != undefined ? `&message=${message}` : ''
    url += token ? `&contract=${token.tokenContract}` : ''
    url += token ? `&token=${token.tokenId}` : ''
    return url
  }

  return (
    <VStack>
      <MediumTitle>Card preview:</MediumTitle>
      <CardImage src={buildURL()} />
    </VStack>
  )
}

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  background: #333;
`

export default CardPreview
