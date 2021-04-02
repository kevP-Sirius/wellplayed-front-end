import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-native";

import {
  TouchableHighlight,
  Text,
} from 'react-native';
const Button = ({buttonName,pathName}) => (
 
   
    <Text style={{ 
        backgroundColor:"black",
        color:"white" ,
        borderRadius:5,
        textAlign:"center",
        marginLeft:"5%",
        marginRight:"5%",
        paddingTop:"1%",
        paddingBottom:"1%",
        paddingRight:"1%",
        paddingLeft:"1%",
      }}>{buttonName}</Text>


 
)
export default Button;

Button.propTypes = {

    buttonName:PropTypes.string.isRequired,

}