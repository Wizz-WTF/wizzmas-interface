import { ethers } from 'ethers'
import { useState } from 'react'
import styled from 'styled-components'
import DisplayError from '../generic/DisplayError'
import { Button, MediumTitle, Segment, TextInput, VStack } from '../generic/StyledComponents'

type RecipientInputProps = {
  userRecipient: string | undefined
  onRecipientValid: (recipient: string | undefined) => void
}
const RecipientInput = ({ userRecipient, onRecipientValid }: RecipientInputProps) => {
  const [address, setAddress] = useState('')
  const [validAddress, setValidAddress] = useState(false)
  const [addedAddress, setAddedAddress] = useState<string | undefined>(userRecipient)
  const [inputError, setInputError] = useState<Error | null>(null)

  function validate(e: any) {
    const addr = e.target.value
    setAddress(addr)
    setValidAddress(ethers.utils.isAddress(addr))
  }

  function addAddress() {
    setInputError(validAddress && address.length > 0 ? null : Error('Invalid address'))
    onRecipientValid(validAddress ? ethers.utils.getAddress(address) : undefined)
    setAddedAddress(validAddress ? address : undefined)
  }

  function clear() {
    setAddress('')
    setAddedAddress(undefined)
    onRecipientValid(undefined)
  }

  return (
    <VStack>
      <MediumTitle>4. Enter recipient:</MediumTitle>
      <Segment>
        {addedAddress != undefined && <AddedAddress>{addedAddress}</AddedAddress>}
        {addedAddress == undefined && (
          <TextInput
            required
            value={address}
            onChange={validate}
            minLength={42}
            maxLength={42}
            placeholder="Enter address..."
          />
        )}
        <Button onClick={addedAddress == undefined ? addAddress : clear} disabled={!validAddress && !addedAddress}>
          {addedAddress != undefined && <>Remove Recipient</>}
          {addedAddress == undefined && <>Add Recipient</>}
        </Button>
      </Segment>
      <DisplayError error={inputError} />
    </VStack>
  )
}

const AddedAddress = styled.div`
  width: 100%;
  padding: 1em;
  color: #F8B229;
  border: dashed;
  border-color: #F8B229;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;`

export default RecipientInput
