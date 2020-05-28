import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import './App.css';
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";
import umbrellaIcon from '../src/umbrella-icon.png';
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
    }
  }


  getCurrentWeather = async(lon,lat) =>{
    try{
      let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      let data = await fetch(url)
      if (data.status !== 200){throw new Error("data is wrong")}
      let result = await data.json()
      console.log("what is the result? ", result)
      this.setState({weatherResult:result})
    } catch (err) {
      alert(err.message)
    }
  }

  getCityWeather = async(city) =>{
    try{
      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      let data = await fetch(url)
      let result = await data.json()
      console.log("what is the city result? ", result)
      this.setState({weatherResult:result})
    } catch (err) {
      alert(err.message)
    }
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
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="sticky-top">
      <Navbar.Brand href="#home">
      <img
        alt=""
        src={umbrellaIcon}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Weathering You!
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Button className="mr-2" variant="secondary outline-info" onClick={()=>this.getLocation()}>Home</Button>
      <Button className="mr-2" variant="outline-info" onClick={()=>this.getCityWeather("Paris")}>Paris, France</Button>
      <Button className="mr-2" variant="outline-info" onClick={()=>this.getCityWeather("Berlin")}>Berlin, Germany</Button>
      <Button className="mr-2" variant="outline-info" onClick={()=>this.getCityWeather("Tokyo")}>Tokyo, Japan</Button>
      <Button className="mr-2" variant="outline-info" onClick={()=>this.getCityWeather("Rome")}>Rome, Italy</Button>
      <Button className="mr-2" variant="outline-info" onClick={()=>this.getCityWeather("London")}>London, UK</Button>
      <Button className="mr-2" variant="outline-info" onClick={()=>this.getCityWeather("Sydney")}>Sydney, Aus</Button>
      <Button className="mr-2" variant="outline-info" onClick={()=>this.getCityWeather("Bangkok")}>Bangkok, Thailand</Button>
      <Button className="mr-2" variant="outline-info" onClick={()=>this.getCityWeather("Shanghai")}>Shanghai, China</Button>
      </Navbar.Collapse>
        </Navbar>

        <div className={`render ${this.state.weatherResult.city.name}`}>
       <Row className="display-flex justify-content-center">
      <Col xs={12} md={4}>
      <div className="day one">
        <p className="time">Today: <Moment format="D MMM YYYY" withTitle>{this.state.weatherResult.list[0].dt_txt}</Moment></p>
        <p className="city">{this.state.weatherResult.city.name}</p>
        <p className="temp">{this.state.weatherResult.list[0].main.temp}°C <img alt ={this.state.weatherResult.list[0].weather[0].description} src={`http://openweathermap.org/img/w/${this.state.weatherResult.list[0].weather[0].icon}.png`}></img></p>
        <p className="weather">{this.state.weatherResult.list[0].weather[0].description}</p>
        </div>
      </Col>
      <Col xs={12} md={4}>
      <div className="day two">
        <p className="time"> <Moment format="D MMM YYYY" withTitle>{this.state.weatherResult.list[8].dt_txt}</Moment></p>
        <p className="city">{this.state.weatherResult.city.name}</p>
        <p className="temp">{this.state.weatherResult.list[8].main.temp}°C <img alt ={this.state.weatherResult.list[8].weather[0].description} src={`http://openweathermap.org/img/w/${this.state.weatherResult.list[8].weather[0].icon}.png`}></img></p>
        <p className="weather">{this.state.weatherResult.list[8].weather[0].description}</p>
        </div>
      </Col>
      <Col xs={12} md={4}>
      <div className="day three">
        <p className="time"> <Moment format="D MMM YYYY" withTitle>{this.state.weatherResult.list[16].dt_txt}</Moment></p>
        <p className="city">{this.state.weatherResult.city.name}</p>
        <p className="temp">{this.state.weatherResult.list[16].main.temp}°C <img alt ={this.state.weatherResult.list[16].weather[0].description} src={`http://openweathermap.org/img/w/${this.state.weatherResult.list[16].weather[0].icon}.png`}></img></p>
        <p className="weather">{this.state.weatherResult.list[16].weather[0].description}</p>
        </div>
      </Col>
      <Col xs={12} md={4}>
      <div className="day four">
        <p className="time"> <Moment format="D MMM YYYY" withTitle>{this.state.weatherResult.list[24].dt_txt}</Moment></p>
        <p className="city">{this.state.weatherResult.city.name}</p>
        <p className="temp">{this.state.weatherResult.list[24].main.temp}°C <img alt ={this.state.weatherResult.list[24].weather[0].description} src={`http://openweathermap.org/img/w/${this.state.weatherResult.list[24].weather[0].icon}.png`}></img></p>
        <p className="weather">{this.state.weatherResult.list[24].weather[0].description}</p>
        </div>
      </Col>
      <Col xs={12} md={4}>
      <div className="day five">
        <p className="time"> <Moment format="D MMM YYYY" withTitle>{this.state.weatherResult.list[32].dt_txt}</Moment></p>
        <p className="city">{this.state.weatherResult.city.name}</p>
        <p className="temp">{this.state.weatherResult.list[32].main.temp}°C <img alt ={this.state.weatherResult.list[32].weather[0].description} src={`http://openweathermap.org/img/w/${this.state.weatherResult.list[32].weather[0].icon}.png`}></img></p>
        <p className="weather">{this.state.weatherResult.list[32].weather[0].description}</p>
        </div> 
      </Col>
      </Row>

        </div>
    </div>
    )
  }
}





