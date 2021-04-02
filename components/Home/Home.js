// == Import : npm
import React from 'react';
import { Text, View ,TextInput, StyleSheet} from 'react-native';

export default  class HomePage extends React.Component {
  render() {
    
   
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         
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
      <Button title="Connexion" onPress={()=>this.gologin()} />   

      
      
      </View>
      );
    
  }
}




