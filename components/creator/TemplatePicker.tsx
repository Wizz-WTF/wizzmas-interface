import styled from 'styled-components'
import { useContractRead } from 'wagmi'
import WizzmasCardArtifact from '../../contracts/artifacts/WizzmasCard.json'
import { range } from '../../lib/ArrayUtil'
import Picker from '../generic/Picker'
import { MediumTitle, VStack } from '../generic/StyledComponents'

type TemplatePickerProps = {
  onTemplateSelected: (template: number) => void
}

const TemplatePicker = ({ onTemplateSelected }: TemplatePickerProps) => {
  const {
    data: numTemplates,
    isError,
    isLoading,
  } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CARD_CONTRACT_ADDRESS ?? '',
    contractInterface: WizzmasCardArtifact.abi,
    functionName: 'numTemplates',
  })

  const renderItem = (template: number) => {
    return (
      <Item>
        <Image src={`/api/template/img/${template}.png`} />
      </Item>
    )
  }

  return (
    <>
      {numTemplates && (
        <VStack>
          <MediumTitle>Select template:</MediumTitle>
          {isLoading && <p>Loading templates...</p>}
          {isError && <p>Could not load templates...</p>}
          <TemplateStack>
            <Picker items={range(0, Number(numTemplates))} renderItem={renderItem} onSelected={onTemplateSelected} />
          </TemplateStack>
        </VStack>
      )}
    </>
  )
}

const TemplateStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: stretch;
  flex-wrap: wrap;
  gap: 1em;
`

const Item = styled.div`
  width: 250px;
  height: 196px;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

export default TemplatePicker
