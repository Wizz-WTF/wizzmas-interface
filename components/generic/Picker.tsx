import { ReactNode, useState } from 'react'
import styled from 'styled-components'

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

const Unselected = styled.div`
  color: #aaa;
  cursor: pointer;
  border: dashed;
  border-color: #222;
  :hover {
    border: dashed;
    border-color: #F8B229;
  }
`

const Selected = styled.div`
  color: #F8B229;
  cursor: pointer;
  border: dashed;
  border-color: #F8B229;
  :hover {
    border: dashed;
    border-color: #F8B229;
  }
`

export default Picker
