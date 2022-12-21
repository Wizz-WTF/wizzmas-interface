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
          {JSON.stringify(item) === JSON.stringify(selected) && <Selected>{renderItem(item)}</Selected>}
          {JSON.stringify(item) !== JSON.stringify(selected) && <Unselected>{renderItem(item)}</Unselected>}
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
      {pages > 1 && (
        <NavControls>
          <HStack>
            <Button disabled={!prevEnabled} onClick={prev}>
              &lt;
            </Button>
            {range(0, pages).map((i) => (
              <Button
                onClick={() => {
                  setCurrentPage(i)
                }}
              >
                {i + 1}
              </Button>
            ))}
            <Button disabled={!nextEnabled} onClick={next}>
              &gt;
            </Button>
          </HStack>
        </NavControls>
      )}
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
              {JSON.stringify(item) === JSON.stringify(selected) && <Selected>{renderItem(item)}</Selected>}
              {JSON.stringify(item) !== JSON.stringify(selected) && <Unselected>{renderItem(item)}</Unselected>}
            </div>
          ))}
        </>
      </Items>
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: no-wrap;
  gap: 0;
`

const Items = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  gap: 1em;
`

const Unselected = styled.div`
  color: #aaa;
  cursor: pointer;
  border: dashed;
  border-color: #222;
  :hover {
    border: dashed;
    border-color: #f8b229;
  }
`

const Selected = styled.div`
  color: #f8b229;
  cursor: pointer;
  border: dashed;
  border-color: #f8b229;
  :hover {
    border: dashed;
    border-color: #f8b229;
  }
`

export default Picker
