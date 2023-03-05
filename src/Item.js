import React, { useState, useEffect } from 'react'
import './Formmain.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons'

function Item (props) {
  const [index,setIndex]=useState(props.index)
  const [lots, setLots] = useState(props.lots)
  const [position, setPosition] = useState(props.position)
  const [option, setOption] = useState(props.option)
  const [expiry, setExpiry] = useState(props.expiry)
  const [strike, setStrike] = useState(props.strike)
  const [momentumCheck, setMomentumCheck] = useState(false)
  const [trailCheck, setTrailCheck] = useState(false)
  const [points, setPoints] = useState('PointsUp')
  const [pointValue, setPointValue] = useState(0)
  const [trailSL, setTrailSL] = useState('points')
  const [instrument, setInstrument] = useState(0)
  const [stopLoss, setStopLoss] = useState(0)

  useEffect(()=>{
    updateList()
  }, [
    lots,
    position,
    option,
    expiry,
    strike,
    momentumCheck,
    trailCheck,
    points,
    pointValue,
    trailSL,
    instrument,
    stopLoss
  ])
  function updateList () {
    const tempObject = {
      index,
      lots,
      position,
      option,
      expiry,
      strike,
      simpleMomentum: { type: points, Value: pointValue },
      trailSL: {
        Type: trailSL,
        value: { instrumentMove: instrument, stopLossMove: stopLoss }
      }
    }
    props.editListItem(index, tempObject)
  }
  function deletingItem () {
    props.delete(props.index)
  }
  function copyingItem () {
    props.copying(props.index)
  }
  return (
    <div
      style={{
        background: 'grey',
        padding: '30px 20px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        margin: '10px auto'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button onClick={copyingItem} style={{ border: 'none', padding: '0' }}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <button onClick={deletingItem} style={{ border: 'none', padding: '0' }}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <span className='mainFormItem'>
          <label htmlFor='totalLot'>Total Lot:</label>
          <input
            type='number'
            name='totalLot'
            id='totalLot'
            className='formItemInputs'
            value={lots}
            onChange={e => {
              setLots(e.target.value)
            }}
          />
        </span>
        <span className='mainFormItem'>
          <select
            name='position'
            id='position'
            className='formItemSelects'
            onChange={e => {
              setPosition(e.target.value)
            }}
            value={position}
          >
            <option value='buy'>Buy</option>
            <option value='sell'>Sell</option>
          </select>
        </span>
        <span className='mainFormItem'>
          <select
            name='option'
            id='option'
            className='formItemSelects'
            onChange={e => {
              setOption(e.target.value)
            }}
            value={option}
          >
            <option value='Put'>Put</option>
            <option value='Call'>Call</option>
          </select>
        </span>
        <span className='mainFormItem'>
          <select
            name='Expiry'
            id='Expiry'
            className='formItemSelects'
            onChange={e => {
              setExpiry(e.target.value)
            }}
            value={expiry}
          >
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
          </select>
        </span>
        <span className='mainFormItem'>
          <label htmlFor='strike'>Select Strike:</label>
          <select
            name='strike'
            id='strike'
            className='formItemSelects'
            onChange={e => {
              setStrike(e.target.value)
            }}
            value={strike}
          >
            <option value='strikeType'>strikeType</option>
            <option value='premiumRange'>premiumRange</option>
          </select>
        </span>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: '2%'
          }}
        >
          <div>
            <input
              type='checkbox'
              name='momentum'
              onChange={() => {
                setMomentumCheck(!momentumCheck)
              }}
            />
            <label htmlFor='momentum'>Simple Momentun</label>
          </div>
          <div>
            <select
              name='Points'
              id='Points'
              className='formItemSelects'
              value={points}
              onChange={e => {
                setPoints(e.target.value)
              }}
              disabled={!momentumCheck}
            >
              <option value='PointsUp'>PointsUp</option>
              <option value='PointsDown'>PointsDown</option>
            </select>
            <input
              type='number'
              className='formItemInputs'
              value={pointValue}
              onChange={e => {
                setPointValue(e.target.value)
              }}
              disabled={!momentumCheck}
            />
          </div>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', marginLeft: '2%' }}
        >
          <div>
            <input
              type='checkbox'
              name='TotalSL'
              onChange={() => {
                setTrailCheck(!trailCheck)
              }}
            />
            <label htmlFor='TotalSL'>Total SL</label>
          </div>
          <div>
            <select
              name='trailSL'
              id='trailSL'
              className='formItemSelects'
              value={trailSL}
              onChange={e => {
                setTrailSL(e.target.value)
              }}
              disabled={!trailCheck}
            >
              <option value='points'>points</option>
              <option value='percentage'>percentage</option>
            </select>
            <input
              type='number'
              className='formItemInputs'
              value={instrument}
              onChange={e => {
                setInstrument(e.target.value)
              }}
              disabled={!trailCheck}
            />
            <input
              type='number'
              className='formItemInputs'
              value={stopLoss}
              onChange={e => {
                setStopLoss(e.target.value)
              }}
              disabled={!trailCheck}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
