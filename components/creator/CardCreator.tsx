import styled from 'styled-components'
import { useState } from 'react'
import { VStack, HStack, Button, PrimaryButton } from '../generic/StyledComponents'
import CardPreview from './CardPreview'
import TemplatePicker from './TemplatePicker'
import MessagePicker from './MessagePicker'
import TokenPicker, { SelectedToken } from './TokenPicker'
import RecipientInput from './RecipientInput'
import Mint from './Mint'

const CardCreator = () => {
  const [inputSelection, setInputSelection] = useState<number>(0)
  const [selectedCover, setSelectedCover] = useState<number>(0)
  const [selectedTemplate, setSelectedTemplate] = useState<number | undefined>(undefined)
  const [selectedToken, setSelectedToken] = useState<SelectedToken | undefined>(undefined)
  const [selectedMessage, setSelectedMessage] = useState<string | undefined>(undefined)
  const [recipient, setRecipient] = useState<string | undefined>(undefined)

  function nextEnabled(): boolean {
    if (inputSelection == 0) {
      return selectedTemplate != undefined
    }
    if (inputSelection == 1) {
      return selectedToken != undefined
    }
    if (inputSelection == 2) {
      return selectedMessage != undefined &&  recipient != undefined
    }
    return false
  }

  return (
    <VStack>
      <Nav>
        <PrimaryButton disabled={inputSelection == 0} onClick={() => setInputSelection(inputSelection - 1)}>
          &lt; Prev
        </PrimaryButton>
        <PrimaryButton disabled={!nextEnabled()} onClick={() => setInputSelection(inputSelection + 1)}>
          Next &gt;
        </PrimaryButton>
      </Nav>
      {inputSelection == 0 && <TemplatePicker onTemplateSelected={setSelectedTemplate} />}
      {inputSelection == 1 && <TokenPicker onTokenSelected={setSelectedToken} />}
      {inputSelection == 2 && <><MessagePicker userMessage={selectedMessage} onMessageValid={setSelectedMessage} /><RecipientInput userRecipient={recipient} onRecipientValid={setRecipient} /></>}
      {inputSelection < 3 && (
        <CardPreview templateType={selectedTemplate} token={selectedToken} message={selectedMessage} />
      )}
      {inputSelection == 3 && (
        <Mint
          artworkType={selectedCover}
          templateType={selectedTemplate}
          message={selectedMessage}
          token={selectedToken}
          recipient={recipient}
        />
      )}
    </VStack>
  )
}

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // align-content: center;
  flex-wrap: no-wrap;
  // gap: 10em;
`

export default CardCreator
