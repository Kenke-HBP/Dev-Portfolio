import "./Form.css";
import React from 'react';
import FormInput from './FormInput';
import RegistrationSuccess from './RegistrationSuccess';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      birthYear: '',
      email: '',
      password: '',
      repeatPassword: '',
      success: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({ success: true });
    }
  };

  validateForm = () => {
    const { name, lastName, birthYear, email, password, repeatPassword } = this.state;
    if (!name || !lastName || !birthYear || !email || !password || !repeatPassword) {
      alert('All fields are mandatory.');
      return false;
    }
    if (!this.isValidEmail(email)) {
      alert('Please enter a valid email.');
      return false;
    }
    if (password.length < 8) {
      alert('Password must consist of at least 8 characters.');
      return false;
    }
    if (password !== repeatPassword) {
      alert('Passwords do not match.');
      return false;
    }
    return true;
  };

  isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  render() {
    const { name, lastName, birthYear, email, password, repeatPassword, success } = this.state;

    return (
      <div>
        {success ? (
          <RegistrationSuccess />
        ) : (
          <form className="RegistrationForm" onSubmit={this.handleSubmit}>
            <FormInput label="Name" type="text" value={name} onChange={this.handleChange} name="name" />
            <FormInput label="Last Name" type="text" value={lastName} onChange={this.handleChange} name="lastName" />
            <FormInput label="Year of Birth" type="text" value={birthYear} onChange={this.handleChange} name="birthYear" />
            <FormInput label="Email" type="email" value={email} onChange={this.handleChange} name="email" />
            <FormInput label="Password" type="password" value={password} onChange={this.handleChange} name="password" />
            <FormInput label="Repeat Password" type="password" value={repeatPassword} onChange={this.handleChange} name="repeatPassword" />
            <button type="submit">Register</button>
          </form>
        )}
      </div>
    );
  }
}

export default RegistrationForm;
