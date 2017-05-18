import React from 'react';
import PropTypes from 'prop-types';
import IngredientsDetail from './IngredientsDetail';

 export default function IngredientsList({ ingredients,
                                            displayIngredientMultiplier }) {

     return(
      <ul className="list-group">
        {ingredients.map(ingredient => (
            <IngredientsDetail
                    key={ingredient._id}
                    amount={isNaN(ingredient.amount) || !ingredient.amount ?
                            ingredient.amount :
                            ingredient.amount * displayIngredientMultiplier}
                    amountUnit={ingredient.amountUnit}
                    name={ingredient.name}
                    isGroup={ingredient.isGroup}
            />
        ))
        }
      </ul>
     )
 }

IngredientsList.propTypes = {
  ingredient: PropTypes.array,
  displayIngredientMultiplier: PropTypes.number.isRequired
}
