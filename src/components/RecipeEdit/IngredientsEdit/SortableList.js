import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ ingredients, removeIngredient }) => {
return (
  <ul className="list-group">
    {ingredients.map((ingredient, index) => (
      <SortableItem key={`item-${index}`}
                    index={index}
                    ingredient={ingredient}
                    removeIngredient={removeIngredient}
                    amount={ingredient.amount}
                    amountUnit={ingredient.amountUnit}
                    name={ingredient.name} />
    ))}
  </ul>
  );
});

SortableList.propTypes = {
  ingredients: PropTypes.array.isRequired,
  removeIngredient: PropTypes.func.isRequired
}

export default SortableList;
