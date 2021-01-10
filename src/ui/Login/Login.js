import React, { Component } from 'react';
import fire from '../../config/Fire';
import "./Login.css"

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: "",
            password: "",
            message: "",
        }
    }

    login(e) {
        e.preventDefault();
        if (this.state.email !== "" && this.state.email.password !== "") {
            fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((u) => {

                })
                .catch((err) => {
                    this.setState({ message: err.message })
                    console.log(err);
                })
        }
        else {
            this.setState({ message: "Username and Password is required!" })
        }
    }

    signup(e) {
        e.preventDefault();
        if (this.state.email !== "" && this.state.email.password !== "") {
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((u) => {

                })
                .catch((err) => {
                    console.error(err);
                })
        }
        else {
            this.setState({ message: "Username and Password is required!" })
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="loginView">
                <div className="gigsTitle">
                    Latest<strong>Gigs</strong>
                </div>
                <form>
                    <div>
                        <input
                            value={this.state.email}
                            onChange={this.handleChange}
                            type="email"
                            name="email"
                            className="loginField"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email"
                        />
                    </div>
                    <div>
                        <input
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                            name="password"
                            className="loginField"
                            id="exampleInputPassword1"
                            placeholder="Enter Password"
                        />
                    </div>
                    <div className="buttonField">
                        <button
                            type="submit"
                            onClick={this.login}
                            className="loginButton"
                        >
                            Login
                        </button>
                        <button
                            onClick={this.signup}
                            style={{ marginLeft: "25px" }}
                            className="signUpButton"
                        >
                            Signup
                        </button>
                    </div>
                </form>
                <small>
                    {this.state.message}
                </small>
            </div>
        );
    }
}
export default Login;