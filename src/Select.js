import React, { Component } from 'react';

var Select = React.createClass({

  listar:function(item){
    if(item.id_restaurant){
      return(
        <option value={item.id_restaurant}>{item.name}</option>
      );
    }else{
      return(
        <option value={item.id_franchise}>{item.name_franchise}</option>
      );
    }

  },
  render:function(){
    return(
      <select onChange={this.props.handleChange}>
        <option value=""></option>
        {
          //<option value="3">3</option>
          this.props.datos.map(this.listar)

        }
      </select>
    )
  }
});
export default Select;
