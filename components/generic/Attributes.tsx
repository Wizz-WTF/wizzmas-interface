import styled from 'styled-components'

export const AttributesView = ({ attributes }: { attributes: any | undefined }) => {
  return (
    <Table>
      {attributes?.map((attr: any, i: any) => (
        <Row key={i}>
          <TraitName>{attr.trait_type}</TraitName>
          <TraitValue>{attr.value}</TraitValue>
        </Row>
      ))}
    </Table>
  )
}

export const Table = styled.div`
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.2em;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
`

export const TraitName = styled.div`
  width: 100%;
  color: gray;
  text-align: right;
`
export const TraitValue = styled.div`
  width: 100%;
  color: white;
  text-align: left;
`

export const AttributesBoxView = ({ attributes }: { attributes: any | undefined }) => {
  return (
    <Grid>
      {attributes?.map((attr: any, i: any) => (
        <Box key={i}>
          <TraitNameCentered>{attr.trait_type.toUpperCase()}</TraitNameCentered>
          <TraitValueCentered>{attr.value}</TraitValueCentered>
        </Box>
      ))}
    </Grid>
  )
}

const Grid = styled.div`
  min-width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.2em;
  flex-wrap: wrap;
`

const Box = styled.div`
  padding: 1em;
  background: #333;
  border-radius: 0.5em;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5em;
`
export const TraitNameCentered = styled.div`
  width: 100%;
  color: red;
  text-align: center;
  font-size: 0.8em;
`
export const TraitValueCentered = styled.div`
  width: 100%;
  color: green;
  text-align: center;
  font-size: 1.2em;
`
