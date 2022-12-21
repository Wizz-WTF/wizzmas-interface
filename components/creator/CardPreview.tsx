import { NextPage } from 'next'
import styled from 'styled-components'
import { SelectedToken } from './TokenPicker'
import { getBaseUrl } from '../../constants'
import { MediumTitle, SmallTitle, VStack } from '../generic/StyledComponents'

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
    url += message != undefined ? `&message=${message.replace('&', '').replace('<', '').replace('+', '')}` : '' // TODO: proper URI encoding
    url += token ? `&contract=${token.tokenContract}` : ''
    url += token ? `&token=${token.tokenId}` : ''
    return url
  }

  return (
    <Wrapper>
      <SmallTitle>Card preview:</SmallTitle>
      <CardImage src={buildURL()} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0em;
  text-align: center;
`
const CardImage = styled.img`
  padding-left: 3em;
  padding-right: 3em;
  width: 100%;
  height: 100%;
  background: transparent;
`

export default CardPreview
