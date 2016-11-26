import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Datetime from 'react-datetime';
import $ from 'jquery';
import Select from './Select';


var App = React.createClass ({

  getInitialState(){
    return{
      fechaInicial: '',
      fechaFinal: '',
      reservas: [],
      restaurante: '',
      listaRestaurantes: []
    };
  },

  handleDateI:function(event){
    this.setState({
      fechaInicial: event
    });
  },

  handleDateF:function(event){
    this.setState({
      fechaFinal: event
    });
  },

  search:function(){
    // Convierte el timestamp a moment
    var f1 = moment(this.state.fechaInicial);
    // Crea un string con el formato indicado
    var sf1 = f1.format("YYYY-MM-DD");

    var f2 = moment(this.state.fechaFinal);
    var sf2 = f2.format("YYYY-MM-DD");

    var params = this.state.restaurante + '/' + sf1 + '/' + sf2;
    $.ajax({
      url: 'https://restaurant-node.herokuapp.com/api/menuRestaurant/byDateRangeReservation/' + params,
      async: true,
    	crossDomain: true,
      method: 'GET',
    	cache: false,
    	context: this,
	    success: function(data) {
        console.log(data);
        this.setState({
          reservas: data
        });
        if (data.length == 0) {
          this.setState({
            reservas: []
          });
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
      }
    });
  },

  handleChangeRestaurantes:function(event) {
    var idRestaurante = event.target.value;
    this.setState({restaurante:idRestaurante});
  },

  componentWillMount () {
      $.ajax({
          url: 'http://haskell-rest.herokuapp.com/restaurantes',
          async: true,
        	crossDomain: true,
          method: 'GET',
        	cache: false,
        	context: this,
  		    success: function(data) {
            this.setState({
              listaRestaurantes: data
            });
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
          }
      });
  },

  render() {
    return (
      <div>
        <label>Seleccione restaurante:</label>
        <Select datos={this.state.listaRestaurantes} handleChange={this.handleChangeRestaurantes}/>
        <label>Fecha Inicial:</label>
        <Datetime onChange={this.handleDateI}/>
        <label>Fecha Final:</label>
        <Datetime onChange={this.handleDateF}/>
        <input type="submit" onClick={this.search} value="Buscar"/>
        <br></br>
        { this.state.reservas.map(function(item) {
            return <div>
                      <b>{item.name_dish}</b> <br/>
                      Cantidad: {item.amount} <br/>
                      Fecha: {item.date}
                  <hr/>

                  </div>
          })
        }

      </div>


    );
  }
});

export default App;
