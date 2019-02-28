import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const google = window.google;

class App extends Component {
  state = {
    address1: "",
    address2:"",
  }

  handleChange =(e)=>{
       this.setState({[e.target.name]: e.target.value})
  }

       componentDidMount(){
        var infoWindow;
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
            console.log(infoWindow);

          }, function() {
             infoWindow.setPosition(map.getCenter());
              infoWindow.setContent(true ?
                                    'Error: The Geolocation service failed.' :
                                    'Error: Your browser doesn\'t support geolocation.');
              infoWindow.open(map);
          });
        } else {
          // Browser doesn't support Geolocation
             infoWindow.setPosition(map.getCenter());
              infoWindow.setContent(false ?
                                    'Error: The Geolocation service failed.' :
                                    'Error: Your browser doesn\'t support geolocation.');
              infoWindow.open(map);
        }
      

      }


      fromPlace =()=>{

        // Create the search box and link it to the UI element.
        var input = document.getElementById('from-input');
        var searchBox = new google.maps.places.SearchBox(input);
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
          this.setState({address1: places});
        });
      }
      toPlace =()=>{

        // Create the search box and link it to the UI element.
        var input = document.getElementById('to-input');
        var searchBox = new google.maps.places.SearchBox(input);
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
          this.setState({address2: places});
        });
      }

      onSubmit =()=>{
        setTimeout(function(){ alert("Hello"); }, 10000);
      }



  render() {
    return (
      <div className="App">
        <div id="map" style={{height:"400px"}}></div>
        <input type="text" className="form-control m-3" id="from-input" onChange={this.fromPlace} placeholder="Pick up location" />
        <input type="text" className="form-control m-3" id="to-input" onChange={this.toPlace} placeholder="Drop off locaton" />
        <button type="button" className="btn btn-primary m-3" onClick={this.onSubmit}>Book Ride</button>

      </div>
    );
  }
}

export default App;
