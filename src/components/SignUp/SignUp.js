import React from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './SignUp.css';

class SignUp extends React.Component {
    constructor(props) { // To use props, set props in constructor
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            isLoading: false
        }
    }
    
    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitSignIn = () => {
        const { loadUser, onRouteChange } = this.props;
        this.setState({loading: true});
        fetch('https://whispering-spire-95505.herokuapp.com/register', { // fetch has get default
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ // It doesn't understand JavaScript, so change it to JSON 
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    loadUser(user)
                    onRouteChange('home'); // If I used 'onClick={onRouteChange('home')}' => when rendering it will be running.
                                         // However, by adding arrow function, It's going to get called the function when it get clicked
                    this.setState({loading: false});                     
                }
            })
    }

    render() {
        return (
            <div className="signup-form mv4 w-100 w-50-m w-25-l mw6">
                <div>
                    <h1>Sign up</h1>
                    <div className="content">
                        <div className="input-field">
                            <input 
                                placeholder='Name'
                                type="text" 
                                name="name"  
                                id="name" 
                                onChange={this.onNameChange}
                            />
                        </div>
                        <div className="input-field">
                            <input 
                                placeholder='Email'
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="input-field">
                            <input type="password" id="password" name="password" placeholder="Password" onChange={this.onPasswordChange} />
                        </div>
                    </div>
                    <div className="action">
                        {this.state.isLoading 
                            ?
                            <LoadingSpinner />
                            :<button 
                                    onClick={this.onSubmitSignIn}
                                    type="submit" 
                                    value="Sign Up" 
                            >
                                Sign up
                            </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
    
}

export default SignUp;