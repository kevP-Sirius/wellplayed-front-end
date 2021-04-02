// == Import : npm
import React from 'react';
import { Text, View , ScrollView , TouchableOpacity , StyleSheet,AppState , ImageBackground} from 'react-native';
import store from '../../Store';
import {NativeRouter , Switch , Route,Redirect , Router,Link} from "react-router-native";
import Player from '../Player/Player'
import { ListItem,Image  } from 'react-native-elements'
import {
  loadFilename, readFile , backToPlaylist
} from '../../Store/Reducer/UserReducer';
import { Video , Audio } from 'expo-av'; 
import { VideoProps } from 'expo-av/build/Video'
export default  class Dashboard2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    playlistLocal:[],
    indexPrev:0,
    indexNext:0,
    indexCurrent:0,
    duration:0,
    isfirst:true
      
    };
    
  }
  
  
  render() {
    Audio.setAudioModeAsync({staysActiveInBackground :true})
    var url = "http://82.224.142.66/api/readfile/"+store.getState().UserReducer.currentFile
    //var url = "http://82.224.142.66/api/readfile/alonzo-binta-paroles-avec-audio-officiel.mp3"
    console.log(url)

  
      return (
        <ScrollView > 
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} > 
        <Text style={{color:"white", paddingBottom:"1%"}}>{(store.getState().UserReducer.player===false)?"Votre liste de musique":store.getState().UserReducer.currentFile}</Text> 
        {(store.getState().UserReducer.player===false)?
         
         store.getState().UserReducer.playlist.playlist.map((song,index) =>(

           
          <ListItem
          key={index}
          leftAvatar={<Image   source={require('../../assets/Music-icon.png') }
          style={{ width: 40, height: 40 }}
          
          /> }
          style={{
            width:300,
             
          }}
          imageProps={{width:200}}
          title={song}
          subtitle={song}
          titleNumber={index}
          bottomDivider
          onPress={()=>{ <Redirect to={{ pathname: "/Player", 

          }} />
            console.log(index)
             var prev = index-1
             var next = index+1
              this.setState({indexCurrent: index})
              this.setState({indexPrev: prev})
              this.setState({indexNext: next},function(){
                const filename= {
                  filename:song
                }
                store.dispatch(loadFilename(filename)),console.log('redirect')
              })
             
            }}
        />
     
             
            
  
           )): <Player/>
         
               
              
    
             }
            
           
      </View>
      </ScrollView>
      );
    
  }
  
}




