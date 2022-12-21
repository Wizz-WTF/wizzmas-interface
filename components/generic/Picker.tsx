import { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { range } from '../../lib/ArrayUtil'
import { Button, HStack, Segment, VStack } from './StyledComponents'

type PickerProps = {
  items: any[]
  renderItem: (item: any) => ReactNode
  onSelected: (selected: any) => void
}
const Picker = ({ items, renderItem, onSelected }: PickerProps) => {
  const [selected, setSelected] = useState<any | undefined>(undefined)

  return (
    <>
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => {
            setSelected(item)
            onSelected(item)
          }}
        >
          <Item selected={JSON.stringify(item) === JSON.stringify(selected)}>{renderItem(item)}</Item>
        </div>
      ))}
    </>
  )
}

type PickerPaginatedProps = {
  items: any[]
  perPage: number
  renderItem: (item: any) => ReactNode
  onSelected: (selected: any) => void
}
export const PickerPaginated = ({ items, perPage, renderItem, onSelected }: PickerPaginatedProps) => {
  const pages = Math.ceil(items.length / perPage)

  const [selected, setSelected] = useState<any | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(0)

  const prevEnabled = currentPage != 0
  const nextEnabled = currentPage != pages - 1

  function prev() {
    if (prevEnabled) setCurrentPage(currentPage - 1)
  }

  function next() {
    if (nextEnabled) setCurrentPage(currentPage + 1)
  }

  return (
    <Wrapper>
      <Items>
        <>
          {items.slice(currentPage * perPage, currentPage * perPage + perPage).map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setSelected(item)
                onSelected(item)
              }}
            >
              <Item selected={JSON.stringify(item) === JSON.stringify(selected)}>{renderItem(item)}</Item>
            </div>
          ))}
        </>
      </Items>
      {pages > 1 && (
        <NavControls>
          <HStack>
            <PageButton disabled={!prevEnabled} onClick={prev} active={false}>
              &lt;
            </PageButton>
            {range(0, pages).map((i) => (
              <PageButton
                onClick={() => {
                  setCurrentPage(i)
                }}
                active={currentPage == i}
              >
                {i + 1}
              </PageButton>
            ))}
            <PageButton disabled={!nextEnabled} onClick={next} active={false}>
              &gt;
            </PageButton>
          </HStack>
        </NavControls>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: stretch;
  flex-wrap: wrap;
  gap: 1em;
`

const NavControls = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: no-wrap;
  gap: 0px;
`

const Items = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  gap: 1em;
`

type ItemProps = {
  selected: boolean
}
const Item = styled.div<ItemProps>`
  color: ${(props) => (props.selected ? '#f8b229' : '#aaa')};
  cursor: pointer;
  border: dashed;
  border-color: ${(props) => (props.selected ? '#f8b229' : '#222')};
  :hover {
    border: dashed;
    border-color: #f8b229;
  }
`

type ButtonProps = {
  active: boolean
}
const PageButton = styled.button<ButtonProps>`
  font-family: Alagard;
  cursor: pointer;
  font-size: medium;
  color: ${(props) => (props.active ? 'black' : 'white')};
  border: none;
  padding: 0.5em 0.7em 0.5em 0.7em;
  background-color: ${(props) => (props.active ? 'orange' : '#bb2528')};
  :hover {
    background-color: #ea4630;
  }
  :active {
    background-color: #ea4630;
  }
  :disabled {
    color: darkgray;
    background-color: gray;
  }
`
export default Picker
