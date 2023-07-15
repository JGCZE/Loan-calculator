import React from 'react'
import numberFormat from '../utils/config'

// eslint-disable-next-line react/prop-types
const Sliders = ({title, state, min, max, onChange, labelMin, labelMax, underlineTitle}) => {

  return (
    <React.Fragment>
        <span className="title">{title}</span>
        {state && (
            <span className="title" 
                style={{textDecoration: "underline"}}
            >
                {underlineTitle}
            
        </span>
      )}
      <div>
        <input 
          type="range" 
          className="slider"
          min={min}
          max={max}
          value={state}
          onChange={onChange}
        />
        <div className="lables">
          <label htmlFor="">{labelMin ?? numberFormat(min)}</label>
          <b>{numberFormat(state)}</b>
          <label htmlFor="">{labelMax ?? numberFormat(max)}</label>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Sliders