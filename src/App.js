import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import load from './load.gif';
import './App.css';

const googlemaps = window.google.maps;

class App extends Component {

  constructor(props) {
        super(props);
        this.state = {
              address1: "",
              address2:"",
              lat1: 0,
              long1: 0,
              lat2: 0,
              long2: 0,
              fare: 0,
              toload: false,
              visible : false
            }
    }


 
    closeModal = () =>{
        this.setState({
            visible : false
        });
    }

  componentDidMount(){
        var map = new googlemaps.Map(document.getElementById('mymap'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

         if ("geolocation" in navigator){
          navigator.geolocation.getCurrentPosition( (position) =>{
            var currentLatitude = position.coords.latitude;
            var currentLongitude = position.coords.longitude;
            var infoWindowHTML = "Latitude: " + currentLatitude + "<br>Longitude: " + currentLongitude;
            var infoWindow = new googlemaps.InfoWindow({map: map, content: infoWindowHTML});
            var currentLocation = { lat: currentLatitude, lng: currentLongitude };
            infoWindow.setPosition(currentLocation);
          });
        }

      }


      fromPlace =()=>{
        var input = document.getElementById('from-input');
        var autocomplete = new window.google.maps.places.Autocomplete(input);
        window.google.maps.event.addListener(autocomplete, 'place_changed',  () =>  {
            var place = autocomplete.getPlace();
            this.setState({address1: place.name});
            this.setState({lat1: place.geometry.location.lat()});
            this.setState({long1: place.geometry.location.lng()});
            console.log(place);

        });
      }


      toPlace =()=>{
        var input = document.getElementById('to-input');
        var autocomplete = new window.google.maps.places.Autocomplete(input);
        window.google.maps.event.addListener(autocomplete, 'place_changed',  () =>  {
            var place = autocomplete.getPlace();
            this.setState({address2: place.name});
            this.setState({lat2: place.geometry.location.lat()});
            this.setState({long2: place.geometry.location.lng()});
            console.log(place);
        });
      }

      toRad = (Value) => {
        return Value * Math.PI / 180;
      }

      onSubmit =()=>{
        const {lat1, lat2,long1,long2 } = this.state;
       if (this.state.address2 !== "" && this.state.address1 !== "") {
          var a = Math.sin(this.toRad(lat2-lat1)/2) * Math.sin(this.toRad(lat2-lat1)/2) 
                  + Math.sin(this.toRad(long2-long1)/2) * Math.sin(this.toRad(long2-long1)/2) * Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)); 
          var b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = 6371 * b;
          console.log(d);
          this.setState({fare: (11*d).toFixed(1)});
          this.setState({toload: true});
          this.setState({visible : true});
          setTimeout(
                function() {
                    this.setState({toload: false}) 
                }
                .bind(this),
                3000
            );
       }
       else{
        alert("Please provide locations")
       }
      }



  render() {
    return (
      <div className="App">
        <div id="mymap" style={{height:"400px"}}></div>
        <input type="text" className="col-md-11 form-control m-3 ml-5" id="from-input" onChange={this.fromPlace} placeholder="Pick up location" />
        <input type="text" className="col-md-11 form-control m-3 ml-5" id="to-input" onChange={this.toPlace} placeholder="Drop off locaton" />
        <button type="button" className="btn btn-primary m-3" onClick={this.onSubmit}>Book Ride</button>
         <Modal visible={this.state.visible} width="400" height="350" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                       {this.state.toload?<img src={load} alt=""/>:
                          <div>
                            <h2 className="col-md-12">Your Trip Detail:</h2>
                            <hr />
                            <div className="row">
                              <div className="col-md-6">
                                Pick Up Location:
                              </div>
                              <div className="col-md-6">
                              {this.state.address1}
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-md-6">
                                Drop Off Location:
                              </div>
                              <div className="col-md-6">
                              {this.state.address2}
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-md-6">
                                Fare:
                              </div>
                              <div className="col-md-6">
                                  {this.state.fare}/-
                              </div>
                            </div>
                          </div>}
                    </div>
         </Modal>
      </div>
    );
  }
}

export default App;
