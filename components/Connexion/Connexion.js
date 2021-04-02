// == Import : npm
import React from 'react';
import { Text, View ,TextInput, StyleSheet ,ActivityIndicator, AsyncStorage,TouchableOpacity} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Sender from './SenderConnexion';
import { connect } from 'react-redux';
import store from '../../Store';
import {
  LOGIN , connectFunc ,doloading
} from '../../Store/Reducer/UserReducer';

 class Connexion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
      musicList:[],
      logged:false,
      loading:"",
      playList:[],
      firstSubmit:true
    }; 
     
  } 
    gologin(){
     
    }
    
    
    
  
  render() {
   
   console.log(store.getState().UserReducer.error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" ,borderRadius:30 ,backgroundColor:"#8a13bd",maxHeight:265,width:270}}>
       
      <Text>Connectez-vous! </Text>
 
      <TextInput
        style={
          styles.input
        }
        placeholder="login"
        onChangeText={(text) => this.setState({username:text})}
        value={this.state.username}
        
      />
     
    <TextInput
        style={styles.input}
        placeholder="password"
        onChangeText={(text) => this.setState({password:text})}
        value={this.state.password}
        secureTextEntry={true} 
      /> 
     {(store.getState().UserReducer.loading===false)?
     <TouchableOpacity style={{backgroundColor: "#0c5cfa", padding: 10 ,color:"white" }} onPress={()=>{
        
        const info={
        username: this.state.username,
        password: this.state.password, 
      };
      if(store.getState().UserReducer.buttonLock===false){
        store.dispatch(doloading()); 
       console.log("en dessous le loading status"),
       
        this.setState({firstSubmit:false});
        store.dispatch(connectFunc(info));
       
        }} 
  }>
    
  <Text style={{color:'white'}}>Connexion</Text>
</TouchableOpacity> :<ActivityIndicator size="large" color="#0000ff" />}   
<Text style={{color:'red'}}>{store.getState().UserReducer.error}</Text>
    </View>
    );
   

    
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  input: {
    width: 240,
    height: 44,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#ecf0f1',
    borderRadius:10
  },
});

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
const ConnexionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Connexion);

// == Export
export default ConnexionContainer;