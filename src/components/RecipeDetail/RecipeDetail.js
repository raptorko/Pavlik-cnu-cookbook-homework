import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Loader from '../Common/Loader';
import { Row, Col } from 'react-bootstrap';
import IngredientsList from './Ingredients/IngredientsList';

class RecipeDetail extends Component {

  render() {
    if (this.props.isFetching) {
      return <Loader />;
    }

    const { title,
           slug,
           preparationTime,
           servingCount,
           sideDish,
           directions,
           ingredients,
           displayIngredientMultiplier,
           onServingCountChange } = this.props

    return(
      <Row>
        <h1 className="page-header">{title}</h1>
        <Link className="btn-lg btn-primary pull-right"
              to={`/recipe/${slug}/edit`}>Edit</Link><br />
        <legend>Basic info:</legend>
        <i className="fa fa-clock-o"></i> {preparationTime} min <br />
        <i className="fa fa-spoon"></i> {sideDish} <br />
        <Col md={3} sm={3} className="form-group">
          <div className="input-group">
            <div className="input-group-addon">Servings:</div>
            <input type="number"
                   min="1"
                   className="form-control"
                   placeholder={servingCount}
                   onChange={onServingCountChange} />
          </div>
          <legend>Ingredients:</legend>
          <IngredientsList ingredients={ingredients}
                           displayIngredientMultiplier={displayIngredientMultiplier}/>
        </Col>

        <Col md={9} sm={9} >
          <legend>Directions: </legend>
          {directions}<br />
        </Col>
      </Row>
    );
  }
}

RecipeDetail.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  slug: PropTypes.string,
  title: PropTypes.string,
  preparationTime: PropTypes.number,
  sideDish: PropTypes.string,
  ingredients: PropTypes.array,
  directions: PropTypes.string,
  servingCount: PropTypes.number,
  onServingCountChange: PropTypes.func.isRequired,
  displayIngredientMultiplier: PropTypes.number.isRequired
};

export default RecipeDetail;
