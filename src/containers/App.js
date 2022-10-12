import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Rank from '../components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  imageHeight: 0,
  user: {
    id: '', 
    name: '', 
    email: '', 
    entries: 0, 
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
        entries: data.entries, 
        joined: data.joined
      }
    });
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    this.setState({imageHeight: height})
    return { // We will do setState box{}
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  
  disPlayFaceBox = (box) => {
    this.setState({box: box}); // You can just use this.setState({box}) because of ES6
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('https://whispering-spire-95505.herokuapp.com/imageurl', { 
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ // It doesn't understand JavaScript, so change it to JSON 
                input: this.state.input
            })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://whispering-spire-95505.herokuapp.com/image', { 
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ // It doesn't understand JavaScript, so change it to JSON 
                id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log)
      }
      this.disPlayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
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
    const { isSignedIn, imageUrl, route, box, user } = this.state;
    return (
      <div className="App">
        { this.state.imageHeight === 0 
          ? <ParticlesBg 
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
          : 
          <ParticlesBg 
            type="circle"
            bg={{
              position: "absolute",
              width: 100+"%",
              height: 100+(this.state.imageHeight/10)+"%",
              left: 0,
              top: 0,
              zIndex: -1
            }}
          />
        }
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
          ? <div> 
              <Logo />
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onPictureSubmit={this.onPictureSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
              route === 'signin' 
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : ( route === 'signout' 
                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
            )
        }
      </div>
    );
  }
}

export default App;
