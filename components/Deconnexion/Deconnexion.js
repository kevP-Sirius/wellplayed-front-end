import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Button from '../tools/buttonHeader';
import store from '../../Store/';
import HomePage from '../Home/Home';
import {LOGOUT,
  logout2
} from '../../Store/Reducer/UserReducer';
export default class Deconnexion extends Component {
  render() {
    
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            
        
      <Text>Déconnecté </Text>
        
 
        
      </View>
    );
    
  }
}