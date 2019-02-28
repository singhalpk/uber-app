import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import load from './load.gif';
import './App.css';
const google = window.google;

class App extends Component {

  constructor(props) {
        super(props);
        this.  state = {
              address1: "",
              address2:"",
              toload: false,
              visible : false
            }
    }


 
    closeModal = () =>{
        this.setState({
            visible : false
        });
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

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("Your Location");
            infoWindow.open(map);
            map.setCenter(pos);

          }, function() {
             infoWindow.setPosition(map.getCenter());
              infoWindow.setContent(true ?
                                    'Error: The Geolocation service failed.' :
                                    'Error: Your browser doesn\'t support geolocation.');
              infoWindow.open(map);
          });
        } else {
             infoWindow.setPosition(map.getCenter());
              infoWindow.setContent(false ?
                                    'Error: The Geolocation service failed.' :
                                    'Error: Your browser doesn\'t support geolocation.');
              infoWindow.open(map);
        }
      

      }


      fromPlace =()=>{
        var input = document.getElementById('from-input');
        var searchBox = new google.maps.places.SearchBox(input);
         searchBox.addListener('places_changed', () => {
          var places = searchBox.getPlaces();
          console.log(places);
          this.setState({address1: places[0].name});
        });
      }


      toPlace =()=>{
        var input = document.getElementById('to-input');
        var searchBox = new google.maps.places.SearchBox(input);
        searchBox.addListener('places_changed', () => {
          var places = searchBox.getPlaces();
          this.setState({address2: places[0].name});
        });
      }

      onSubmit =()=>{
       if (this.state.address2 !== "" && this.state.address1 !== "") {
         this.setState({toload: true});
        this.setState({
            visible : true
        });
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
        <div id="map" style={{height:"400px"}}></div>
        <input type="text" className="form-control m-3" id="from-input" onChange={this.fromPlace} placeholder="Pick up location" />
        <input type="text" className="form-control m-3" id="to-input" onChange={this.toPlace} placeholder="Drop off locaton" />
        <button type="button" className="btn btn-primary m-3" onClick={this.onSubmit}>Book Ride</button>
         <Modal visible={this.state.visible} width="400" height="400" effect="fadeInUp" onClickAway={() => this.closeModal()}>
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
                              {this.state.address1}
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-md-6">
                                Fare:
                              </div>
                              <div className="col-md-6">
                                  128.36/-
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
