
import { Text, View } from 'react-native';
import React from 'react';
import {NativeRouter , Switch , Route,Redirect , Router} from "react-router-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../Store';
// Import local
import Inscription from '../Inscription/Inscription';
import Connexion from '../Connexion/Connexion';
import Deconnexion from '../Deconnexion/Deconnexion';
import Contact from '../Contact/Contact';
import HomePage from '../Home/Home';
import Player from '../Player/Player';
import Dashboard from '../Dashboard/Dashboard';
import Dashboard2 from '../Dashboard2/Dashboard';
import { LOGOUT } from '../../Store/Reducer/UserReducer';
import VlcPlayer from '../VlcPlayer/VlcPlayer';

class Page extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
      logged: true,
      musicList:[],
      logged:false
      
    };
  }
  
  render() {

  
     
  console.log(store.getState().UserReducer.logged)
 return( 
  
  <Switch>
  <View style={{ width:"100%", minHeight:"50%", flex: 1, justifyContent: "center", alignItems: "center" ,  backgroundColor: "#75e6ff" }}>
    
 
 <Route exact path="/Connexion" component={Connexion} />
 <Route exact path="/Déconnexion" component={Deconnexion} />
 <Route exact path="/Contact" component={Contact}/>
 <Route exact path="/Dashboard2" component={Dashboard2}/>
 <Route exact path="/Dashboard" component={Dashboard}/>
 <Route exact path="/Player" component={Player}/>
 
  {(store.getState().UserReducer.logged===true)?<Redirect
        to={{
          pathname: "/Dashboard", 
        }}
      />:<Redirect
      to={{
        pathname: "/Connexion",
      }}
      /> }
  
  
 </View>
 </Switch>

 );
  };
}
const mapStateToProps = (state) => {
  return{
    state
  }
  
 
};


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
};

// Container
const PageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page);

// == Export
export default PageContainer;
// == Export



