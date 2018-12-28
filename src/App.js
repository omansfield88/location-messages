import React, { Component } from 'react';

import Message from './components/Message'

class App extends Component {

  state = {
    message: {
      text: 'This is the messags',
      display: false
    },
    latitude: 53.391501,
    longitude: -2.9520177

  }

  // handleButtonPress = () => {
  //   this.setState({
  //     display: true
  //   })
  // }

  componentDidMount() {

     navigator.geolocation.watchPosition(
       (position) => {
         console.log(position.coords.latitude)
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => {console.log(error)},
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
     );


   }





  render() {



    let message;
    // if (this.state.display) {
    //   message = <Message />
    // }

    if (this.state.latitude > 53.3915) {
      message = <Message text={this.state.message.text}/>
    }




    // console.log((""+this.state.location.lat).split('').map(Number))

    return (
      <div className="App">
        <h2>Home page</h2>
        <button onClick={this.handleButtonPress}>Show message</button>
        <p>latitude = {this.state.latitude}</p>
        <p>longitude = {this.state.longitude}</p>

        {message}

      </div>
    );
  }
}

export default App;
