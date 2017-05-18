import React from 'react'
import PropTypes from 'prop-types';

export default function IngredientsDetail({ amount,
                                            amountUnit,
                                            name,
                                            isGroup }) {

  if(isGroup)
  return(
      <li className="list-group-item list-group-item-warning">
          <span><strong> {name} </strong></span>
      </li>
    )

  return(
    <li className="list-group-item">
      <span><b>{name}</b></span> <span>{amount} {amountUnit}</span>
    </li>
  )
}

IngredientsDetail.propTypes = {
  amount: PropTypes.number,
  amountUnit: PropTypes.string,
  name: PropTypes.string.isRequired,
  isGroup: PropTypes.bool
}
