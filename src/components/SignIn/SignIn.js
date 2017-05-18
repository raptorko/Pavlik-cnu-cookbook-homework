import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SignIn extends Component {

  render() {
    const { handleSignIn,
            userState,
            passState,
            unauthorized,
            isSubmitting } = this.props;

    return(
      <form onSubmit={this.props.onSubmitSignIn} className="form-group">
        <h1 className="page-header">Sign In</h1>
        <div>
          <input value={userState}
                 onChange={handleSignIn}
                 name="user"
                 type="text"
                 className="form-control"
                 placeholder="name"
                 required></input>
        </div>
        <div>
          <input value={passState}
                 onChange={handleSignIn}
                 name="pass"
                 type="password"
                 className="form-control"
                 placeholder="password"
                 required></input>

        </div>
        {unauthorized && <div className="alert alert-danger"
                              role="alert">Wrong user or password</div>}
        <div className="form-actions">
          <button disabled={isSubmitting}
                  type="submit"
                  className="btn btn-primary">Sign In</button>

        </div>
      </form>
    );
  }
}

SignIn.propTypes = {
  handleSignIn: PropTypes.func.isRequired,
  userState: PropTypes.string,
  passState: PropTypes.string,
  unauthorized: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired
}
