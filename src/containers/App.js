import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import DisplayName from '../components/DisplayName/DisplayName';
import ParticlesBg from 'particles-bg';
import Signin from '../components/Signin/Signin';
import SignUp from '../components/SignUp/SignUp';
import Note from '../components/Note/Note';
import swal from 'sweetalert';

const initialState = {
	ageResult: '',
    input: '',
    imageUrl: '',
    isLoading: false,
    ageRange: '',
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '', 
        name: '', 
        email: '', 
        joined: ''
    }
}
class App extends Component {
    constructor(){
        super();
        this.state = initialState;
    }
	
    loadUser = (data) => {
		this.setState({
			user:{
				id: data.id, 
				name: data.name, 
				email: data.email, 
				joined: data.joined
			}
        });
    }

    onInputChange = (event) => {
		this.setState({input: event.target.value}); 
    }
    
	getAgeRange = (data) => {
        this.setState({ageRange: data.outputs[0].data.concepts[0].name})
		this.calculateAge(data.outputs[0].data.concepts[0].name)
    }

	ageResultMessage = (min, max, input) => {
		min === 70 
		?  this.setState({ageResult: "You look more than 70"}) 
		:  input >= min && input <= max 
					?	this.setState({ageResult: "You look like your age"}) 
					: 	input > max 
						? this.setState({ageResult: "You look younger than your age"}) 
						: this.setState({ageResult: "You look older than your age"})
	}

	calculateAge = (ageRange) => {
		const { input } = this.state;
		if(ageRange === "50-59") {
			return(
				this.ageResultMessage(50, 59, input)
			)
		}
		else if(ageRange === "0-2") {
			return(
				this.ageResultMessage(0, 2, input)
			)
		}
		else if(ageRange === "3-9") {
			return(
				this.ageResultMessage(3, 9, input)
			)
		}
		else if(ageRange === "10-19") {
			return(
				this.ageResultMessage(10, 19, input)
			)
		}
		else if(ageRange === "20-29") {
			return(
				this.ageResultMessage(20, 29, input)
			)
		}
		else if(ageRange === "30-39") {
			return(
				this.ageResultMessage(30, 39, input)
			)
		}
		else if(ageRange === "40-49") {
			return(
				this.ageResultMessage(40, 49, input)
			)
		}
		else if(ageRange === "60-69") {
			return(
				this.ageResultMessage(60, 69, input)
			)
		}
		else if (ageRange === "more than 70") {
			return(
				this.ageResultMessage(70, 150, input)
			)
		}
	}

    onPictureSubmit = (imageFileUrl) => {
		if(!this.state.input || isNaN(this.state.input)) {
			swal("Please enter your age before testing it.");
			return(0);
		}
        if(imageFileUrl){
            this.setState({ isLoading: true });
            fetch('http://localhost:3000/imageurl', { 
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ // It doesn't understand JavaScript, so change it to JSON 
                        imageFileUrl: imageFileUrl
                    })
            })
            .then(response => response.json())
            .then(response => {
				this.getAgeRange(response);
				this.setState({ isLoading: false });
            }).catch(err => console.log(err));
        } else {
            console.log('No pic selected')
        }
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
        this.setState(initialState);
        } else if (route === 'home') {
        this.setState({isSignedIn: true});
        }
        this.setState({route: route}); //Should warp this in curly brackets because it's an object
    }

    render() {
        const { isSignedIn, route, user, ageRange, isLoading, ageResult, input } = this.state;
        return (
			<div className="App">
				<ParticlesBg 
						type="circle"
						bg={{
							position: "absolute",
							width: 100+"%",
							height: 100+"%",
							left: 0,
							top: 0,
							zIndex: -1
						}}
				/> 
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				{/* After sign in */}
				{ route === 'home' 
					?   <div >
							<DisplayName name={user.name} />
							<Note />  
							<ImageLinkForm
								onPictureSubmit={this.onPictureSubmit}
								ageRange={ageRange}
								isLoading={isLoading}
								onInputChange={this.onInputChange}
								ageResult={ageResult}
								input={input}
							/>    
						</div>
					:   (
							// before sign in
							route === 'signin' 
							? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
							: ( route === 'signout' 
								? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
								: <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
						)
				}
			</div>
        );
    }
    }

    export default App;
