// == Import : npm
import React from 'react';
import { ToolbarAndroid ,Text, View , ScrollView , TouchableOpacity , StyleSheet,AppState , ImageBackground,StatusBar,Button,PermissionsAndroid } from 'react-native';
import store from '../../Store';
import {NativeRouter , Switch , Route,Redirect , Router} from "react-router-native";
import { Notifications } from 'expo';
import { ListItem,Image  } from 'react-native-elements'
import {
  loadFilename, readFile , backToPlaylist
} from '../../Store/Reducer/UserReducer';
import { Video , Audio } from 'expo-av';   
import { VideoProps } from 'expo-av/build/Video';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import axios from 'axios';
import querystring from 'query-string';
export default  class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
    playlistLocal:[],
    indexPrev:0,
    indexNext:0,
    indexCurrent:store.getState().UserReducer.playlist.playlist.indexOf(store.getState().UserReducer.currentFile), 
    duration:0,
    isfirst:true,
    expoPushToken : "b0401df9-778f-4c0b-ba24-bebdfa85091a",
    notification: {}, 
    };
   
 
  }
  playbackObject = undefined;
  
  async componentDidMount() {
    console.log('i mounted')  
    console.log(PermissionsAndroid) 
    if (!this.playbackObject) return;
    let videoUrl = 'http...';
    let progress = 100;
    console.log('currentFileIndex:'+store.getState().UserReducer.playlist.playlist.indexOf(store.getState().UserReducer.currentFile))
    try { 
      await this.playbackObject.loadAsync(
      {uri: "http://91.171.100.233/api/readfile/"+store.getState().UserReducer.currentFile}, {shouldPlay: true})
      this.playbackObject.positionMillis = progress; 
      this.playbackObject.usePoster=true,
      this.playbackObject.posterSource=require('../../assets/playgif.gif'); 
      this.playbackObject.staysActiveInBackground = true;
      this.playbackObject.shouldDuckAndroid = false;
      this.playbackObject.isMuted = false;
      this.playbackObject.isLooping = false;
      this.playbackObject.useNativeControls = true;
      this.playbackObject.playThroughEarpieceAndroid = true ;
      this.playbackObject.androidImplementation ="ExoPlayer"; 
      await this.playbackObject.playAsync();
      await this.playbackObject.setProgressUpdateIntervalAsync(15000);
    } catch (error) {
      console.log('error', error);
    }
  }
  async launchNext() {
    if (!this.playbackObject) return;
    let videoUrl = 'http...';
    let progress = 100;
    console.log('test')
    try { 
     await this.playbackObject.loadAsync(
      {uri: "http://91.171.100.233/api/readfile/"+store.getState().UserReducer.currentFile}, {shouldPlay: true})
      this.playbackObject.positionMillis = progress; 
      this.playbackObject.usePoster=true,
      this.playbackObject.posterSource=require('../../assets/playgif.gif'),
      this.playbackObject.staysActiveInBackground = true;
      this.playbackObject.shouldDuckAndroid = false;
      this.playbackObject.isMuted = false;
      this.playbackObject.isLooping = false;
      this.playbackObject.useNativeControls = true ;
      this.playbackObject.playThroughEarpieceAndroid = true ;
      this.playbackObject.androidImplementation ="ExoPlayer"  ;
      await this.playbackObject.playAsync(); 
      await this.playbackObject.setProgressUpdateIntervalAsync(15000);
      console.log(this.playbackObject.androidImplementation)
    } catch (error) {
      console.log('error', error);
    }
  }
  _onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus) return;
    if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
        //console.log(playbackStatus.positionMillis , playbackStatus.durationMillis );
      }
        
    if(playbackStatus.didJustFinish){
      if(this.state.indexCurrent>0 && this.state.indexCurrent<store.getState().UserReducer.playlist.playlist.length-1){
            const filename= {
               filename:store.getState().UserReducer.playlist.playlist[this.state.indexCurrent+1] 
             }
             this.setState({indexCurrent: this.state.indexCurrent+1})
             store.dispatch(loadFilename(filename)),console.log('next')
             this.launchNext()
           }else{
             const filename= {
               filename:store.getState().UserReducer.playlist.playlist[0]
             }
             this.setState({indexCurrent: 0 })
             store.dispatch(loadFilename(filename)),console.log('restart')
             this.launchNext()
           }
        }
        
        // Update your UI for the paused state
        
      

      if (playbackStatus.isBuffering) {
       // console.log('is buffering');
      }
  }
  render() {
 
    
<StatusBar
  barStyle = "dark-content"
  // dark-content, light-content and default
  hidden = {false}
  //To hide statusBar
  backgroundColor = "#00BCD4"
  //Background color of statusBar only works for Android
  translucent = {false}
  //allowing light, but not detailed shapes
  networkActivityIndicatorVisible = {true}
/>
     
    var url = "http://91.171.100.233/api/readfile/"+store.getState().UserReducer.currentFile
    //var url = "http://91.171.100.233/api/readfile/alonzo-binta-paroles-avec-audio-officiel.mp3"
    console.log(url)
 
  
      return (
        <ScrollView > 
          
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} > 
        <View 
          style={{ 
          flex: 1, 
          justifyContent: "space-around" , 
          flexDirection:"row",
          backgroundColor:"#b1bab9",
          width:"100%",
          alignItems:"flex-end"
        }}>
       
       <ImageBackground source={require('../../assets/playgif.gif')} style={{width: '100%', height: '100%'}}>
       <Video
          ref={(ref) => {this.playbackObject = ref;}}
          rate={1.0}
          volume={1.0}
          shouldPlay
          useNativeControls={true} 
          style={{ 
          width:300, 
          height: 300,
          borderRadius:20}}
          onProgress={this.onProgress}
          onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
        /> 
 
        </ImageBackground>
       

            
               
            </View>
            
            <View 
           style={{ 
           flex: 1, 
           justifyContent: "center" , 
           flexDirection:"row",
          
           
           width:"100%",
           }}>

       
       
          <TouchableOpacity onPress={()=>{ 
           
            
            const filename= {
              filename:store.getState().UserReducer.playlist.playlist[this.state.indexCurrent-1]
            }
            this.setState({indexCurrent: this.state.indexCurrent-1})
            store.dispatch(loadFilename(filename)),console.log('prev')
            this.launchNext()
          }}
          >
           <Image   source={require('../../assets/skip_previous-24px.png') }
          style={{ width: 50, height: 50 }}
          
          >
            <Text style={{color:"purple",paddingTop:"3%"}} >   </Text>
            </Image>
          </TouchableOpacity>
         
          <TouchableOpacity onPress={()=>{ 
          store.dispatch(backToPlaylist())
            ,console.log('playlist')}}
            
          >
          <Image   source={require('../../assets/playlist_play-24px.png') }
          style={{ width: 50, height: 50 }}
          
          >
            <Text style={{color:"purple",paddingTop:"3%"}} > </Text>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ 
           const filename= {
            filename:store.getState().UserReducer.playlist.playlist[this.state.indexCurrent+1]
          }
          this.setState({indexCurrent: this.state.indexCurrent+1})
          store.dispatch(loadFilename(filename)),console.log('next')
          this.launchNext()
          }}
          >
          <Image   source={require('../../assets/skip_next-24px.png') }
          style={{ width: 50, height: 50 }}
          
          >
          <Text style={{color:"purple",paddingTop:"3%"}} > </Text>
          </Image>
          </TouchableOpacity>
         </View>
      </View>
      </ScrollView>
      );
    
  }
  
}




