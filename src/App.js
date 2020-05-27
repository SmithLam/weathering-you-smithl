import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      weatherResult:null
    }
  }

  getCurrentWeather = async(lon,lat) =>{
    let API_KEY = process.env.REACT_APP_APIKEY
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    let data = await fetch(url)
    let result = await data.json()
    console.log("what is the result? ", result)
    this.setState({weatherResult:result})
  }

  getLocation  = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude)
    })
  }


  componentDidMount(){
    console.log("open the app")
    this.getLocation() //call this only because getCurrentWeather is already in getLocation
  }

  componentDidUpdate(){
    console.log("something is updated")
  }


  render() {

    if(this.state.weatherResult == null){
      return (<div>Loading</div>)
    }

    return (
      <div class="body">
        <h1>Weathering You!</h1>
        <h2>{this.state.weatherResult.name}</h2>
        <h3>{this.state.weatherResult.main.temp}C</h3>
        <h3>{this.state.weatherResult.weather[0].description}</h3>

      </div>
    )
  }
}





