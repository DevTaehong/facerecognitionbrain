import React from 'react';

class Signin extends React.Component {
    constructor(props) { // To use props, set props in constructor
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        const { loadUser, onRouteChange } = this.props;
        fetch('http://localhost:3000/signin', { // fetch has get default so used signin instead of default.
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ // It doesn't understand JavaScript, so change it to JSON 
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    loadUser(user)
                    onRouteChange('home'); // If I used 'onClick={onRouteChange('home')}' => when rendering it will be running.
                                         // However, by adding arrow function, It's going to get called the function when it get clicked
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div>
                <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                            </fieldset>
                            <div className="">
                            <input 
                                onClick={this.onSubmitSignIn} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in" 
                            />
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
                <h1>This project is still in progress. Please, just <span style={{color: 'red'}}>click</span> sign in for now...</h1>
            </div>
        );
    }
}

export default Signin;