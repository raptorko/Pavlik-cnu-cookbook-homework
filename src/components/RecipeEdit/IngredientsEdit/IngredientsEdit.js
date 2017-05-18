import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import SortableList from './SortableList';

export default class IngredientsEdit extends Component {
  constructor(props) {
    super(props);

    this.onSubmitAddIngredient = this.onSubmitAddIngredient.bind(this);
    this.onSubmitAddGroup = this.onSubmitAddGroup.bind(this);
  }

  onSubmitAddIngredient(event) {
    event.preventDefault();
    const nameInputValue = this.nameInput.value;
    const amountInputValue = this.amountInput.value;
    const unitInputValue = this.unitInput.value;

    this.props.addIngredient(nameInputValue, amountInputValue, unitInputValue);
  }

  onSubmitAddGroup(event) {
    event.preventDefault();
    const newGroupInput = this.newGroupInput.value;

    this.props.addIngredientGroup(newGroupInput);
  }


  render(){
    return(
      <div>
        <legend>Ingredients:</legend>
        <SortableList ingredients={this.props.ingredients}
                      removeIngredient={this.props.removeIngredient}
                      onSortEnd={this.props.onSortEnd}
                      useDragHandle={true} />
        <form onSubmit={this.onSubmitAddIngredient} className="from-group">
          <div>
            <legend>Add ingredient: </legend>
            <label className="form-label">Amount: </label>
            <input ref={(input) => {this.amountInput = input; }}
                   name="Amount"
                   className="form-control"
                   type="number"
                   placeholder="Amount" />
            <label className="form-label">Unit: </label>
            <input ref={(input) => {this.unitInput = input; }}
                   name="Unit"
                   className="form-control"
                   type="text"
                   placeholder="Unit" />
            <label className="form-label">Name: </label>
            <input ref={(input) => {this.nameInput = input; }}
                   name="Name"
                   className="form-control"
                   type="text"
                   placeholder="Name"
                   required/>
          </div>
          <Button type="submit" className="btn-sm btn-primary">Add</Button>
        </form>
        <form onSubmit={this.onSubmitAddGroup} className="form-group">
          <div>
            <label className="form-label">New group: </label>
            <input ref={(input) => {this.newGroupInput = input; }}
                   name="newGroupName"
                   className="form-control"
                   type="text"
                   placeholder="New group"
                   required />
            <div className="input-group-btn">
              <Button type="submit" className="btn btn-default">Add</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

IngredientsEdit.propTypes = {
  ingredients: PropTypes.array.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  addIngredientGroup: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired  
}
