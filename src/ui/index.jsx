import React, { Component } from 'react';
import fire from '../config/Fire';
import ListGigsForm from "./Gigs/listGigs"
import Login from "./Login/Login"
import './index.css';
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
            else {
                this.setState({ user: null });
            }
        })
    }

    render() {
        return (
            <div className="App" >
                {this.state.user ?
                    (
                        <center>
                            <ListGigsForm />
                        </center>
                    )
                    :
                    (
                        <center>
                            <Login />
                        </center>
                    )
                }

            </div >
        )
    }
}
export default Home;