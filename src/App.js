import React, { Component } from 'react';
import Message from './components/Message'

class App extends Component {

  state = {
    messages: [
      {
        text: 'Desk',
        location: {
          latitude: 53.3915087
        }
      },
      {
        text: 'Bedroom Window',
        location: {
          latitude: 53.3914673
        }
      },
      {
        text: 'Kitchen Window',
        location: {
          latitude: 53.3916123
        }
      }
    ],
    currentLocation: {
      latitude: 1,
      longitude: 1
    }
  }

  handleButtonPress = () => {
    this.setState({
      currentLocation: {
        latitude: 53.4216999
      }
    })
  }

  componentDidMount() {
     this.watchID = navigator.geolocation.watchPosition(
       (position) => {
         console.log('Watch position ' + position.coords.latitude)
         this.setState({
           currentLocation: {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude
           },
           error: null,
         });
       },
       (error) => {console.log('error')},
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
     );

   }

   componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }





  render() {

    console.log("current lat" + this.state.currentLocation.latitude)


    let latitudeArray = ((""+this.state.currentLocation.latitude).split('').map(Number))
    console.log(latitudeArray);
    let message;


    if (latitudeArray[6] === 4) {
      message = <Message text={this.state.messages[1].text}/>
    }
    else if (latitudeArray[6] === 6) {
      message = <Message text={this.state.messages[2].text}/>
    }
    else if (latitudeArray[6] === 5) {
      message = <Message text={this.state.messages[0].text}/>
    }



    return (
      <div className="App">
        <h2>Home page</h2>
        <button onClick={this.handleButtonPress}>Show message</button>
        <p>latitude = {this.state.currentLocation.latitude}</p>
        <p>longitude = {this.state.currentLocation.longitude}</p>
        <p>lat array = {latitudeArray[6]}</p>

        {message}

      </div>
    );
  }
}

export default App;
