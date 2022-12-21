import styled from 'styled-components'
import { useState } from 'react'
import DisplayError from '../generic/DisplayError'
import { Button, MediumTitle, Segment, TextInput, VStack } from '../generic/StyledComponents'

type MessagePickerProps = {
  userMessage: string | undefined
  onMessageValid: (message: string | undefined) => void
}

const MessagePicker = ({ userMessage, onMessageValid }: MessagePickerProps) => {
  const [message, setMessage] = useState(userMessage)
  const [validMessage, setValidMessage] = useState(false)
  const [addedMessage, setAddedMessage] = useState<string | undefined>(userMessage)
  const [inputError, setInputError] = useState<Error | null>(null)
  const [badSymbols, setBadSymbols] = useState(false);

  function validate(e: any) {
    const message = e.target.value
    setMessage(message)
    if (message.contains('&') || message.contains('+') || message.contains('<')) {
      setBadSymbols(true)
      setValidMessage(false);
    } else {
      setValidMessage(message.length < 64)
    }
  }

  function addMessage() {
    setInputError(validMessage && (message?.length ?? 0) > 0 ? null : Error('Invalid address'))
    onMessageValid(validMessage ? message : undefined)
    setAddedMessage(validMessage ? message : undefined)
  }

  function clear() {
    setMessage('')
    setAddedMessage(undefined)
    onMessageValid(undefined)
  }

  return (
    <VStack>
      <MediumTitle>3. Enter message:</MediumTitle>
      <Segment>
        {addedMessage != undefined && <AddedMessage>{addedMessage}</AddedMessage>}
        {addedMessage == undefined && (
          <TextInput
            required
            value={message}
            onChange={validate}
            minLength={1}
            maxLength={63}
            placeholder="Have a very Merry Wizzmas!"
          />
        )}
        <Button onClick={addedMessage == undefined ? addMessage : clear} disabled={!validMessage && !addedMessage}>
          {addedMessage != undefined && <>Remove Message</>}
          {addedMessage == undefined && <>Add Message</>}
          {badSymbols && <>{`Symbols not supported: +, &, and <`}</>}
        </Button>
      </Segment>
      <DisplayError error={inputError} />
    </VStack>
  )
}

const AddedMessage = styled.div`
  width: 100%;
  padding: 1em;
  color: #F8B229;
  border: dashed;
  border-color: #F8B229;
`

export default MessagePicker
