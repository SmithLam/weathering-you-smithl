import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import 'react-spinkit'
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";
import Moment from 'react-moment';
import 'moment-timezone';

const override = css`
  display: block;
  margin: 10% auto;
`;

let API_KEY = process.env.REACT_APP_APIKEY

export default class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      weatherResult:null,
      iconURL:"",
      unixTime:""
    }
  }


  getCurrentWeather = async(lon,lat) =>{
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    let data = await fetch(url)
    let result = await data.json()
    console.log("what is the result? ", result)
    let iconCode = result.list[0].weather[0].icon
    let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    let unixTime= result.list[0].dt
    console.log("What is icon code ", iconCode)
    this.setState({weatherResult:result})
    this.setState({iconURL:iconURL})
    this.setState({unixTime:unixTime})
  }

  getCityWeather = async(city) =>{
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    let data = await fetch(url)
    let result = await data.json()
    let iconCode = result.list[0].weather[0].icon
    let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    let unixTime= result.list[0].dt
    console.log("what is the city result? ", result)
    this.setState({weatherResult:result})
    this.setState({iconURL:iconURL})
    this.setState({unixTime:unixTime})
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
      return ( <div className="sweet-loading">
      <PacmanLoader
        css={override}
        size={125}
        color={"yellow"}
        loading={this.state.loading}
      />
    </div>)
    }

    return (
      
      <div>
        
        <h1>Weathering You!</h1>
        <p className="time"><Moment unix tz="Asia/Ho_Chi_Minh">{this.state.unixTime}</Moment></p>
        <p className="city">{this.state.weatherResult.city.name}</p>
        <p className="temp">{this.state.weatherResult.list[0].main.temp}°C <img alt ={this.state.weatherResult.list[0].weather[0].description} src={this.state.iconURL}></img></p>
        <p className="weather">{this.state.weatherResult.list[0].weather[0].description}</p>
        <button class="btn-primary btn-lg" onClick={()=>this.getCityWeather("Paris")}>Paris, France</button>
        <button class="btn-primary btn-lg" onClick={()=>this.getCityWeather("Berlin")}>Berlin, Germany</button>
        <button class="btn-primary btn-lg" onClick={()=>this.getCityWeather("Tokyo")}>Tokyo, Japan</button>
        <button class="btn-primary btn-lg" onClick={()=>this.getCityWeather("Helsinki")}>Helsinki, Finland</button>
      </div>
    )
  }
}





