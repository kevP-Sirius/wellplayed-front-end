import axios from 'axios';
import querystring from 'query-string';

import {
  LOGIN , saveUser, LOGOUT, dologout , LOADING , doloading, savePlaylist , AUTHENTICATE , loadError , READ , readFile , readSrc
} from '../Store/Reducer/UserReducer';


const Middleware = (store) => (next) => (action) => {
  
  console.log('je suis le middleware');
  next(action);
  const baseUrl = 'http://91.171.100.233/api/';
  
  
  switch (action.type) {
    case LOGOUT: {
      console.log("je suis le case logout ")
        //store.dispatch(dologout());
      
      break;
    }
    case AUTHENTICATE: { 
      console.log("je suis le case authenticate")
      const data = querystring.stringify({
        username:store.getState().UserReducer.username.trim(),
        password:store.getState().UserReducer.password.trim(),
      });
      console.log("username:"+store.getState().UserReducer.username,"password:"+store.getState().UserReducer.password)
      axios({
    
        method: 'post',
        url: 'http://91.171.100.233/api/signin',
        headers:{
    
          JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.NFCEbEEiI7zUxDU2Hj0YB71fQVT8YiQBGQWEyxWG0po',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          
        },
        data: data,  
      }).then(
        (response) => {
        console.log(response.data)
        if(response.data.loginstatus===true){
          const user={
            username: store.getState().UserReducer.username,
            
          };
          const playlist={
            playlist: response.data.musicList,
            
          };
         
         store.dispatch(savePlaylist(playlist));


         store.dispatch(doloading());
         store.dispatch(saveUser(user)); 
         
        }else{
         console.log("status error:"+response.data.error)
          
        const errors= {
           status: response.data.error,
          }; 
          store.dispatch(loadError(errors)); 
          store.dispatch(doloading()); 
        }
        
    
      }
      ).catch(function (error) {
        
      }).finally(() => {
        
      });
      
      break;
    }
    case READ: {
      console.log("je suis le case read");
      const data = querystring.stringify({
        filename:store.getState().UserReducer.currentFile.trim(),
       
      });
      axios({
    
        method: 'post',
        url: 'http://91.171.100.233/api/readfile',
        headers:{
            
          JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.NFCEbEEiI7zUxDU2Hj0YB71fQVT8YiQBGQWEyxWG0po',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          
        },
        data: data,  
      }).then(
        (response) => {
        console.log(response.data)
        if(response.data.flux===true){
          
          const flux={
            flux: response.data.src,
            
          };
          
         
         store.dispatch(readSrc(flux));


         
         
        }else{
        
         console.log("status error:"+response.data.error)
          
        const errors= {
           status: response.data.error,
          }; 
          store.dispatch(loadError(errors)); 
          //store.dispatch(doloading()); 
        }
        
    
      }
      ).catch(function (error) {
        
      }).finally(() => {
        
      });
      break;
    }
    default:
      //next(action);
  }
};

export default Middleware;
