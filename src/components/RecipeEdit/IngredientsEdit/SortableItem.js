import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';
import IngredientsEditDetail from './IngredientsEditDetail';

const SortableItem = SortableElement(({index,
                                       ingredient,
                                       removeIngredient,
                                       amountUnit,
                                       name}) => {
  return (
      <div>
        <IngredientsEditDetail index={index}
                               ingredient={ingredient}
                               removeIngredient={removeIngredient}
                               amount={ingredient.amount}
                               amountUnit={ingredient.amountUnit}
                               name={ingredient.name}/>
      </div>
  );
});

SortableItem.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.object.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  amountUnit: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default SortableItem;
