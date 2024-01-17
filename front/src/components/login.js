import React, { Component } from 'react';

// Define a class-based component named Login
export default class Login extends Component {
  constructor(props) {
    super(props);
    // Initialize the component's state with default values
    this.state = {
      email: '',
      password: '',
      error: '', // Used to store error messages
    };
  }

  // Event handler for input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the corresponding state property with the new value
    this.setState({ [name]: value });
  };

  // Event handler for the login form submission
  handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Destructure the email and password from the component's state
    const { email, password } = this.state;

    try {
      // Send a POST request to the login endpoint
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Convert user input to JSON and send it in the request body
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // If login is successful, parse the response data
        const data = await response.json();
        // Store the token or perform desired action after successful login
        console.log('Logged in:', data);
      } else {
        // If login fails, parse error response and update the state with error message
        const errorResponse = await response.json();
        this.setState({ error: errorResponse.errors[0].msg });
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
      <form onSubmit={this.handleLogin}>
        <h3>Sign In</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="Enter password"
            required
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    );
  }
}
