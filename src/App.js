import React, { Component } from 'react';
import Particle from './components/Particles/particles';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    const USER_ID = "weekenend";
    const PAT = "58d3e91ad2864f79bdddbe46e732c987";
    const APP_ID = "Ali2002";

    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs",
      requestOptions
    )
    .then((response) => response.json())
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch((error) => console.log("error", error));
    
      // .then((result) => {
      //   if (result) {
      //     fetch('https://magicfacedetectorbackend.herokuapp.com/image', {
      //       method: 'put',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify({
      //         id: this.state.user.id
      //       })
      //     })
      //       .then(response => response.json())
      //       .then(count => {
      //         this.setState(Object.assign(this.state.user, { entries: count.entries }))
      //       })
      //   }
      //   this.displayFaces(this.calculateFaceLocation(result))
      // })
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particle />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : (
              route === 'signout'
                ? <Signin onRouteChange={this.onRouteChange} />
                : <Register onRouteChange={this.onRouteChange}/>
            )
          )
          
        }
      </div>
    );
  }
}

export default App;
