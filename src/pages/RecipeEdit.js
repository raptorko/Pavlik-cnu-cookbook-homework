import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import api from '../api';
import Loader from '../components/Common/Loader';
import update from 'react-addons-update';
import { arrayMove } from 'react-sortable-hoc';
import BasicInfo from '../components/RecipeEdit/BasicInfo';
import IngredientsEdit from '../components/RecipeEdit/IngredientsEdit/IngredientsEdit';

class RecipeEditPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {},
      isFetching: true,
      isSaving: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.editBasicInfo = this.editBasicInfo.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.addIngredientGroup = this.addIngredientGroup.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    const { title,
            preparationTime,
            servingCount,
            sideDish,
            directions,
            ingredients } = this.state.recipe;
    this.setState({
      isSaving: true,
    });

    api()
      .post(`/recipes/${this.state.recipe._id}`, {
        title: title,
        preparationTime: preparationTime,
        servingCount: servingCount,
        sideDish: sideDish,
        directions: directions,
        ingredients: ingredients
      })
      .then(response => {
        console.log(response);
        // This is a redirection back to the detail
        this.props.router.push(`/recipe/${response.data.slug}`);
      });
  }

  editBasicInfo(event) {
    const { id } = event.target;

    if(id === "title") {
      const updatedTitle = event.target.value;
      this.setState(({ recipe }) =>
        update({ recipe }, { recipe: { title: { $set: updatedTitle } }}));
    }
    if(id === "prepTime") {
      const updatedPrepTime = event.target.value;
      this.setState(({ recipe }) =>
        update({ recipe }, { recipe: { preparationTime: { $set: updatedPrepTime } }}));
    }
    if(id === "servCount") {
      const updatedServCount = event.target.value;
      this.setState(({ recipe }) =>
        update({ recipe }, { recipe: { servingCount: { $set: updatedServCount } }}));
    }
    if(id === "sideDish") {
      const updatedSideDish = event.target.value;
      this.setState(({ recipe }) =>
        update({ recipe }, { recipe: { sideDish: { $set: updatedSideDish } }}));
    }
    if(id === "directions") {
      const updatedDirections = event.target.value;
      this.setState(({ recipe }) =>
        update({ recipe }, { recipe: { directions: { $set: updatedDirections } }}));
    }
  }

  addIngredient(nameInputValue, amountInputValue, unitInputValue) {
    let newIngredient = [{ //_id: new Date().getTime(),
                           amountUnit: unitInputValue,
                           amount: amountInputValue,
                           name: nameInputValue }];
    this.setState(({ recipe }) =>
      update({ recipe }, { recipe: { ingredients: { $push: newIngredient}}}));
  }

  addIngredientGroup(newGroupInput) {
    let newIngredient = [{ isGroup: true,
                           name: newGroupInput }];
    this.setState(({ recipe }) =>
      update({ recipe }, { recipe: { ingredients: { $push: newIngredient}}}));
  }

  removeIngredient(i) {
    let updatedIngredients = this.state.recipe.ingredients.filter((ingredient) => {
      return ingredient !== i;
    });
    this.setState(({ recipe }) =>
      update({ recipe }, { recipe: { ingredients: { $set: updatedIngredients}}}));
  }

  onSortEnd({oldIndex, newIndex}) {
    let {ingredients} = this.state.recipe;

    this.setState(({ recipe }) =>
      update({ recipe }, { recipe: { ingredients: { $set: arrayMove(ingredients, oldIndex, newIndex)}}}));
  }

  render() {
    // This render servers only as an example how to submit a form
    // Page component should have minimal markup as possible, use components
    const { isFetching, recipe, isSaving } = this.state;

    if (isFetching) {
      return <Loader />;
    }

    return (
      <Row className="row">
        <Col md={6} onSubmit={this.handleSubmit}>
          <form>
            <Button disabled={isSaving}
                    className="btn-lg btn-success pull-right"
                    type="submit">Save</Button>
            <BasicInfo
                      title={recipe.title}
                      preparationTime={recipe.preparationTime}
                      servingCount={recipe.servingCount}
                      sideDish={recipe.sideDish}
                      directions={recipe.directions}
                      onChangeBasicInfo={this.editBasicInfo} />
          </form>
        </Col>
        <Col md={6}>
          <IngredientsEdit ingredients={recipe.ingredients}
                           removeIngredient={this.removeIngredient}
                           addIngredient={this.addIngredient}
                           addIngredientGroup={this.addIngredientGroup}
                           onSortEnd={this.onSortEnd} />
          <Button onClick={this.handleSubmit}
                  disabled={isSaving}
                  className="btn-lg btn-success pull-right">Save</Button>
        </Col>
      </Row>
    );
  }
}

export default RecipeEditPage;
