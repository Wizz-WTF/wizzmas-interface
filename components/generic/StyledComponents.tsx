import styled from 'styled-components'

export const LargeTitle = styled.h1`
  color: white;
`

export const MediumTitle = styled.h2`
  color: white;
`

export const SmallTitle = styled.h3`
  color: white;
`

export const VStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: stretch;
  flex-wrap: wrap;
  gap: 1em;
`

export const HStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: stretch;
  flex-wrap: wrap;
  gap: 1em;
`

export const Segment = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: stretch;
  flex-wrap: no-wrap;
  gap: 1em;
`

export const PrimaryButton = styled.button`
  font-family: Alagard;
  cursor: pointer;
  font-size: x-large;
  padding: 0.8em;
  // flex-grow: 1;
  color: white;
  border: none;
  background-color: #165B33;
  :hover {
    background-color: #146B3A;
  }
  :active {
    background-color: #146B3A;
  }
  :disabled {
    color: gray;
    background-color: darkgray;
  }
  border-radius: 0.5em;
`;

export const Button = styled.button`
  font-family: Alagard;
  cursor: pointer;
  font-size: large;
  padding: 0.5em;
  // flex-grow: 1;
  color: white;
  border: none;
  background-color: #BB2528;
  :hover {
    background-color: #EA4630;
  }
  :active {
    background-color: #EA4630;
  }
  :disabled {
    color: gray;
    background-color: darkgray;
  }
`

export const TextInput = styled.input`
  font-family: Alagard;
  font-size: 1em;
  width: 100%;
  padding: 1em;
  background: #00000000;
  border: dashed;
  border-color: #F8B229;
`
