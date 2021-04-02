// == Import : npm
import React from 'react';
import { Text, View , ScrollView , TouchableOpacity , StyleSheet,AppState , ImageBackground} from 'react-native';
import store from '../../Store';
import {NativeRouter , Switch , Route,Redirect , Router} from "react-router-native";

import { ListItem,Image  } from 'react-native-elements'
import {
  loadFilename, readFile , backToPlaylist
} from '../../Store/Reducer/UserReducer';
import { Video , Audio } from 'expo-av'; 
import { VideoProps } from 'expo-av/build/Video'
export default  class Dashboard extends React.Component {
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
  
  onProgress = (data) => {
    console.log(data.currentTime );
  };
    onEnd=()=>{
    if(this.state.indexCurrent>0 && this.state.indexCurrent<store.getState().UserReducer.playlist.playlist.length-1){
      filename= {
        filename:store.getState().UserReducer.playlist.playlist[this.state.indexCurrent+1]
      }
      this.setState({indexCurrent: this.state.indexCurrent+1})
      store.dispatch(loadFilename(filename)),console.log('next')
    }else{
      const filename= {
        filename:store.getState().UserReducer.playlist.playlist[0]
      }
      this.setState({indexCurrent: 0 })
      store.dispatch(loadFilename(filename)),console.log('restart')
    }
   
  }
  componentWillUnmount=() =>{
    console.log("unmount here")
  }
  _onPlaybackStatusUpdate = status => {
    if (status.didJustFinish) {
      if(this.state.indexCurrent+1<=store.getState().UserReducer.playlist.playlist.length-1){
        const filename= {
          filename:store.getState().UserReducer.playlist.playlist[this.state.indexCurrent+1]
        }
       
        this.setState({indexCurrent: this.state.indexCurrent+1})
        store.dispatch(loadFilename(filename)),console.log('next')
      }else{
        const filename= {
          filename:store.getState().UserReducer.playlist.playlist[0]
        }
       
        this.setState({indexCurrent: 0 })
        store.dispatch(loadFilename(filename)),console.log('next')
      }
    }
  };
  render() {
    Audio.setAudioModeAsync({staysActiveInBackground :true})
    const playbackObject = new Audio.Sound();
    
    var url = "http://91.171.100.233/api/readfile/"+store.getState().UserReducer.currentFile
    //var url = "http://91.171.100.233/api/readfile/alonzo-binta-paroles-avec-audio-officiel.mp3"
    console.log(url) 
    console.log(this.state.playlistLocal)
    var styles = StyleSheet.create({
      backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
    });
    
   
 

  

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
          title={song.split('.')[0]}
          subtitle={song.split('.')[1]}
          titleNumber={index}
          bottomDivider
          onPress={()=>{ 
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
        
             
            
  
           )):<View 
           style={{ 
           flex: 1,
           flexDirection:"column",
           backgroundColor:"#b1bab9",
           width:"100%",
           }}>
       
       
       <Video
          
          onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
          source={{ uri: url }}
          rate={1.0}
          volume={1.0}
          resizeMode={Video.RESIZE_MODE_STRETCH}
          isMuted={false}
          ignoreSilentSwitch={"obey"}
          onSpooff={console.log("test spofff")}
          shouldPlay
          onLoad={(data)=>console.log(data)}
          onEnd={()=>this.onEnd()}
          useNativeControls={true} 
          style={{ backgroundColor:"transparent",
          width:300, 
          height: 300,
          }}
          
          onProgress={(data)=>this.onProgress(data)}
          ref={this._handleVideoRef}
        /> 
 
        


      
        </View>
        
        
        
        
        }
         {(store.getState().UserReducer.player===false)?null :  <View 
          style={{ 
          flex: 1, 
          justifyContent: "center" , 
          flexDirection:"row",
          width:"100%",
          }}>

       

          <TouchableOpacity onPress={()=>{ 
           
           if(this.state.indexCurrent-1>0){
            const filename= {
              filename:store.getState().UserReducer.playlist.playlist[this.state.indexCurrent-1]
            }
           
            this.setState({indexCurrent: this.state.indexCurrent-1})
            store.dispatch(loadFilename(filename)),console.log('prev')
          }else{
            const filename= {
              filename:store.getState().UserReducer.playlist.playlist[store.getState().UserReducer.playlist.playlist.length-1]
            }
           
            this.setState({indexCurrent: store.getState().UserReducer.playlist.playlist.length-1})
            store.dispatch(loadFilename(filename)),console.log('prev')
          }
          
          }}
          >
            <Image
          source={require('../../assets/skip_previous-24px.png')}
          style={{ width: 40, height: 40 }}/>
          
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{ 
          store.dispatch(backToPlaylist())
            ,console.log('playlist')}}
          ><Image
          source={require('../../assets/playlist_play-24px.png')}
          style={{ width: 40, height: 40 }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ 
           if(this.state.indexCurrent+1<=store.getState().UserReducer.playlist.playlist.length-1){
            const filename= {
              filename:store.getState().UserReducer.playlist.playlist[this.state.indexCurrent+1]
            }
           
            this.setState({indexCurrent: this.state.indexCurrent+1})
            store.dispatch(loadFilename(filename)),console.log('next')
          }else{
            const filename= {
              filename:store.getState().UserReducer.playlist.playlist[0]
            }
           
            this.setState({indexCurrent: 0 })
            store.dispatch(loadFilename(filename)),console.log('next')
          }
          }}
          
          ><Image
          source={require('../../assets/skip_next-24px.png')}
          style={{ width: 40, height: 40 }}/>
          </TouchableOpacity>
         </View> }
          
      </View>
      </ScrollView>
      );
    
  }
  
}




