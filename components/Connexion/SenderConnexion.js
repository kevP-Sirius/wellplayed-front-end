import axios from 'axios';
import querystring from 'query-string';
import PropTypes from 'prop-types'
import { Text, View ,TextInput, StyleSheet ,ActivityIndicator, AsyncStorage} from 'react-native';

const Sender=(id,password)=>{
   
    if(id!=null && password!=null){
      console.log('je suis sender connexion')
      
      const data = querystring.stringify({
        username : "admin",
        password: "Prime$972!",
      });
      
      axios({
    
        method: 'post',
        url: 'http://91.171.100.233/api/signin',
        headers:{
    
          JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.NFCEbEEiI7zUxDU2Hj0YB71fQVT8YiQBGQWEyxWG0po',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          
        },
        data: data,  
      }).then((response) => {
        console.log(response)
        if(response.loginstatus===true){
          this.setState({logged:true})
           
        }else{
          this.setState({firstsubmit:true})
        }
        
    
      }).catch(function (error) {
        console.log(error);
      }).finally(() => {
        
      });
      
    };
  

  
   
  };

  Sender.propTypes={
   id:PropTypes.string.isRequired,
    password:PropTypes.string.isRequired
  }
  export default Sender;