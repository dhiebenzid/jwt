import React, { Component } from 'react';

// Define a class-based component named SignUp
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    // Initialize the component's state with default values
    this.state = {
      email: '',
      password: '',
      error: null, // Used to store error messages
    };
  }

  // Event handler for input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the corresponding state property with the new value
    this.setState({
      [name]: value,
    });
  };

  // Event handler for the signup form submission
  handleSignUp = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const { email, password } = this.state;

    try {
      // Send a POST request to the signup endpoint
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Convert user input to JSON and send it in the request body
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // If signup is successful, log a success message
        console.log('Signup successful');
      } else {
        // If signup fails, parse error response and update the state with error message
        const data = await response.json();
        this.setState({ error: data.errors[0].msg });
      }
    } catch (error) {
      console.error('An error occurred', error);
      // Handle errors that occurred during the fetch or parsing
      this.setState({ error: 'An error occurred. Please try again.' });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <form onSubmit={this.handleSignUp}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>

        {error && <p className="text-danger">{error}</p>}

        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    );
  }
}
