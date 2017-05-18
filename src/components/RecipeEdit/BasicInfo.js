import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BasicInfo extends Component {

  render() {
    const { title,
            preparationTime,
            servingCount,
            sideDish,
            directions,
            onChangeBasicInfo } = this.props;
    return(
      <div className="form-group">
        <h1 className="page-header">{title}</h1>
        <legend>Basic info:</legend>
        <label>Title: </label>
        <input id="title"
               className="form-control"
               type="text"
               value={title}
               onChange={onChangeBasicInfo} />
        <label>Preparation Time: </label>
        <div className="input-group">
          <input id="prepTime"
                 className="form-control"
                 type="number"
                 value={preparationTime}
                 onChange={onChangeBasicInfo} />
          <span className="input-group-addon">min</span>
        </div>
        <label>Sevring count: </label>
        <input id="servCount"
               className="form-control"
               type="number"
               value={servingCount}
               onChange={onChangeBasicInfo} />
        <label>Side dish: </label>
        <input id="sideDish"
               className="form-control"
               type="text"
               value={sideDish}
               onChange={onChangeBasicInfo} />
        <div>
          <legend>Directions: </legend>
          <textarea id="directions"
                    rows="15"
                    className="form-control"
                    type="text"
                    value={directions}
                    onChange={onChangeBasicInfo} />
        </div>
    </div>
    );
  }
}

BasicInfo.PropTypes = {
  title: PropTypes.string.isRequired,
  preparationTime: PropTypes.number,
  servingCount: PropTypes.number,
  sideDish: PropTypes.string,
  directions: PropTypes.string,
  onChangeBasicInfo: PropTypes.func.isRequired
}
