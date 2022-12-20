import styled from 'styled-components'
import { useState } from 'react'
import { VStack, HStack, Button } from '../generic/StyledComponents'
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
      return selectedMessage != undefined
    }
    if (inputSelection == 3) {
      return recipient != undefined
    }
    return false
  }

  return (
    <>
      <Content>
        <VStack>
          <HStack>
            <Button disabled={inputSelection == 0} onClick={() => setInputSelection(inputSelection - 1)}>
              Previous
            </Button>
            <Button disabled={!nextEnabled()} onClick={() => setInputSelection(inputSelection + 1)}>
              Next
            </Button>
          </HStack>
          {inputSelection == 0 && <TemplatePicker onTemplateSelected={setSelectedTemplate} />}
          {inputSelection == 1 && <TokenPicker onTokenSelected={setSelectedToken} />}
          {inputSelection == 2 && <MessagePicker userMessage={selectedMessage} onMessageValid={setSelectedMessage} />}
          {inputSelection == 3 && <RecipientInput userRecipient={recipient} onRecipientValid={setRecipient} />}
          <Content2>
            {inputSelection < 4 && (
              <CardPreview templateType={selectedTemplate} token={selectedToken} message={selectedMessage} />
            )}
          </Content2>
          {inputSelection == 4 && (
            <Mint
              artworkType={selectedCover}
              templateType={selectedTemplate}
              message={selectedMessage}
              token={selectedToken}
              recipient={recipient}
            />
          )}
        </VStack>
      </Content>
    </>
  )
}

const Content2 = styled.div`
  height: 100%;
  width: 100%;
`

const Content = styled.div`
  border-style: dashed;
  border-color: #444;
  padding: 1em;
  margin: 1em;
`

export default CardCreator
