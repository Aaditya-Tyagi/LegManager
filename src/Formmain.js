import React, { useState } from 'react'
import './Formmain.css'
import Item from './Item.js'

const Formmain = () => {
  const [lots, setLots] = useState(1)
  const [position, setPosition] = useState('Buy')
  const [option, setOption] = useState('Put')
  const [expiry, setExpiry] = useState('weekly')
  const [strike, setStrike] = useState('strikeType')
  const [list, setList] = useState([])

  function makeListItem () {
    const newItem = {
      index: list.length,
      lots: lots,
      position: position,
      option: option,
      expiry: expiry,
      strike: strike
    }
    let newvairable = [...list, newItem]
    setList(newvairable)
    setLots(1)
    setPosition('Buy')
    setOption('call')
    setExpiry('weekly')
    setStrike('strikeType')
  }
  const deleteListItem = indexToDelete => {
    setList(list.filter((item, index) => index !== indexToDelete))
  }
  const copyingListItem = indexToCopy => {
    const itemToCopy = list.find((item, index) => index === indexToCopy)
    if (itemToCopy) {
      const newItem = {
        ...itemToCopy,
        index: list.length
      }
      setList([...list, newItem])
    }
  }
  const editListItem = (indexToEdit,itemToUpdate) =>{
    let tempList=[...list]
    // let itemToEdit = tempList.find((item, index) => index === indexToEdit)
    // itemToEdit={...itemToUpdate}
    // tempList[itemToEdit.index]=itemToEdit
    tempList=tempList.map((item,index)=>{
      if(index===indexToEdit){
        return {...itemToUpdate}}
        return item
      }
      );
      setList([...tempList])
  }
  const finalSubmit=()=>{
    console.log(list)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: 'lightgrey',
        margin: '5% 0 2% 0',
        flexDirection: 'column'
      }}
    >
      <div className='Container' id='formMaker'>
        <div style={{ display: 'flex',justifyContent:'center', flexDirection: 'row' }}>
          <span className='mainFormItem'>
            <label htmlFor='totalLot' className='formLabels'>
              Total Lot
            </label>
            <input
              type='number'
              name='totalLot'
              id='totalLot'
              style={{
                borderRadius: '10px',
                width: '60px',
                background: 'white',
                border: 'none'
              }}
              value={lots}
              onChange={e => {
                setLots(e.target.value)
              }}
            />
          </span>
          <span className='mainFormItem'>
            <label htmlFor='position' className='formLabels'>
              Position
            </label>
            <select
              name='position'
              id='position'
              value={position}
              onChange={e => {
                setPosition(e.target.value)
              }}
              className='formOptions'
            >
              <option value='buy'>Buy</option>
              <option value='sell'>Sell</option>
            </select>
          </span>
          <span className='mainFormItem'>
            <label htmlFor='option' className='formLabels'>
              Option
            </label>
            <select
              name='option'
              id='option'
              value={option}
              onChange={e => {
                setOption(e.target.value)
              }}
              className='formOptions'
            >
              <option value='Put'>Put</option>
              <option value='Call'>Call</option>
            </select>
          </span>
          <span className='mainFormItem'>
            <label htmlFor='Expirys' className='formLabels'>
              Expiry
            </label>
            <select
              name='Expiry'
              id='Expiry'
              value={expiry}
              onChange={e => {
                setExpiry(e.target.value)
              }}
              className='formOptions'
            >
              <option value='weekly'>Weekly</option>
              <option value='monthly'>Monthly</option>
            </select>
          </span>
          <span className='mainFormItem'>
            <label htmlFor='strike' className='formLabels'>
              Select Strike Criteria
            </label>
            <select
              name='strike'
              id='strike'
              value={strike}
              onChange={e => {
                setStrike(e.target.value)
              }}
              className='formOptions'
            >
              <option value='strikeType'>strikeType</option>
              <option value='premiumRange'>premiumRange</option>
            </select>
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '25px',
            height:'35px'
          }}
        >
          <button
            style={{
              borderRadius: '10px',
              background: 'navy',
              color: 'white',
              border: 'none',
              padding: '0 2%',
              margin: '0 10px 0 0'
            }}
            onClick={makeListItem}
          >
            Add Leg
          </button>
          <button
            style={{
              borderRadius: '10px',
              background: 'white',
              color: 'navy',
              border: 'none',
              padding: '0 2%',
              margin: '0 10px 0 0'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
        {list.map((item, index) => {
          return (
            <Item
              key={index}
              index={index}
              lots={item.lots}
              position={item.position}
              option={item.option}
              expiry={item.expiry}
              strike={item.strike}
              delete={deleteListItem}
              copying={copyingListItem}
              editListItem={editListItem}
            />
          )
        })}
      </div>
      {list.length > 0 && (
        <button
          style={{
            margin:' 10px auto',
            width: '12%',
            background: 'navy',
            color: 'white',
            border: 'none',
            padding: '1% 1%'
          }}
          onClick={() => {
            setList([])
            setLots(1)
            setPosition('Buy')
            setOption('call')
            setExpiry('weekly')
            setStrike('strikeType')
            finalSubmit()
          }}
          id='finalSubmit'
        >
          Final Submit
        </button>
      )}
    </div>
  )
}

export default Formmain
