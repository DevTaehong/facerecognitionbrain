import React from 'react';

class Register extends React.Component {
    constructor(props) { // To use props, set props in constructor
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
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
                }
            })
    }

    render() {
        return (
            <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name" 
                                onChange={this.onNameChange}
                            />
                        </div>
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
                            onClick={this.onSubmitSignIn} // onClick={onRouteChange('home')} => when rendering it will be running.
                                                                  // However, by adding arrow function, It's going to get called the function when it get clicked
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" 
                        />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
    
}

export default Register;