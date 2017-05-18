import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import DragHandle from './SortableHandle';

class IngredientsEditDetail extends Component {
  constructor(props) {
    super(props)
    this.onRemove = this.onRemove.bind(this);
  }

   onRemove(i) {
    this.props.removeIngredient(i)
  }

  render() {
    const { amount, amountUnit, name, ingredient } = this.props;

    if(ingredient.isGroup) return(
        <li className="list-group-item-warning">
          <Button
            onClick={this.onRemove.bind(this, ingredient)}
            className="btn-xs btn-danger">
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </Button>
            <span><strong> {name} </strong></span>
          <DragHandle />
        </li>
      );

    return(
      <li className="list-group-item">
        <Button
          onClick={this.onRemove.bind(this, ingredient)}
          className="btn-xs btn-danger">
          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
        </Button>
          <span><strong> {amount}</strong></span> <span><strong>{amountUnit}</strong> {name}</span>
        <DragHandle />
      </li>
    );
  }
}

IngredientsEditDetail.propTypes = {
  amount: PropTypes.number,
  amountUnit: PropTypes.string,
  name: PropTypes.string.isRequired,
  ingredient: PropTypes.object.isRequired
}

export default IngredientsEditDetail;
