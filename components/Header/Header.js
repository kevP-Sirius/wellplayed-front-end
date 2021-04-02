import React, { Component } from 'react';
import { Text, View , TouchableOpacity} from 'react-native';
import {NativeRouter , Switch , Route,Redirect , Link ,Router} from "react-router-native";
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import store from '../../Store/';
import {
  dologout 
} from '../../Store/Reducer/UserReducer';
 class Header extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.state.UserReducer
      
    };
  }
  
 
  render() {
  
  
 
    return (
    <View 
    style={{ 
    flex: 1, 
    justifyContent: "space-around" , 
    flexDirection:"row",
    paddingTop:"10%",
    backgroundColor:"#b1bab9",
    width:"100%",
    alignItems:"flex-end"}}>

      {(store.getState().UserReducer.logged===true)?
      <TouchableOpacity style={{backgroundColor: "#0c5cfa", padding: 10 ,color:"white" }} onPress={()=>{       
      store.dispatch(dologout());
   } 
  }>
    
  <Text style={{color:'white'}}>Déconnexion</Text>
</TouchableOpacity> :<Text></Text> }
        
     </View>
    );
}
}


const mapStateToProps = (state) => {
  return{
    state
  }
  
 
}
 

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
};

// Container
const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

// == Export
export default HeaderContainer;
