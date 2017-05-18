import React, { Component } from 'react';
import SignIn from '../components/SignIn/SignIn';
import api from '../api';

export default class SignInPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "",
      pass: "",
      unauthorized: false,
      isSubmitting: false
    }

   this.onSignIn = this.onSignIn.bind(this);
   this.onSubmitSignIn = this.onSubmitSignIn.bind(this)
  }

  onSubmitSignIn(event) {
    event.preventDefault();
    this.setState({ unauthorized: false,
                    isSubmitting: true });
    api()
      .post('/auth/login', {
        username: this.state.user,
        password: this.state.pass
      })
      .then(response => {
        console.log('OK', response.request.response)
        this.props.router.push('/') })
      .catch(error => {
        console.log('Not Authorized')
        this.setState({ unauthorized: true,
                        isSubmitting: false});
      });
  }

  onSignIn(event) {
    if(event.target.name === "pass") {
      this.setState({ pass: event.target.value });
    }
    if(event.target.name === "user") {
      this.setState({ user: event.target.value });
    }
  }

  render() {
    const { user, pass, unauthorized, isSubmitting } = this.state;

    return(
      <SignIn onSubmitSignIn={this.onSubmitSignIn}
              handleSignIn={this.onSignIn}
              userState={user}
              passState={pass}
              unauthorized={unauthorized}
              isSubmitting={isSubmitting}/>
    );
  }
}
