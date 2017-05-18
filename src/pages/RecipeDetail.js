import React, { Component } from 'react';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail';
import api from '../api';

class RecipeDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {},
      detail: null,
      isFetching: true,
      displayIngredientMultiplier: 1
    };

    this.updateIngredientsCount = this.updateIngredientsCount.bind(this);
  }

  componentWillMount() {
    api()
      .get(`/recipes/${this.props.params.slug}`)
      .then((response) => {
        this.setState({
          recipe: response.data,
          isFetching: false,
        });
      });
  }

  updateIngredientsCount(event) {
    const newServingCount = Math.round(event.target.value);
    const oldServingCount = this.state.recipe.servingCount;
    const newIngredientAmountMultiplier = newServingCount/oldServingCount;
    this.setState({ displayIngredientMultiplier: newIngredientAmountMultiplier});
  }

  render() {
    const { recipe, isFetching, displayIngredientMultiplier } = this.state;

    return (
      <RecipeDetail
        isFetching={isFetching}
        slug={recipe.slug}
        title={recipe.title}
        preparationTime={recipe.preparationTime}
        sideDish={recipe.sideDish}
        ingredients={recipe.ingredients}
        directions={recipe.directions}
        servingCount={recipe.servingCount}
        onServingCountChange={this.updateIngredientsCount}
        displayIngredientMultiplier={displayIngredientMultiplier}
      />
    );
  }
}

export default RecipeDetailPage;
