//import npm
import React, { Component } from 'react';
import { Text, View , ImageBackground} from 'react-native';
import {NativeRouter , Switch , Route,Redirect } from "react-router-native";
import { Provider } from 'react-redux';
import store from './Store';
import * as ScreenOrientation from 'expo-screen-orientation';
//import local
import HomePage from '../AwesomeProject/components/Home/Home';
import Inscription from '../AwesomeProject/components/Inscription/Inscription';
import Connexion from '../AwesomeProject/components/Connexion/Connexion';
import Contact from '../AwesomeProject/components/Contact/Contact';
import Header from '../AwesomeProject/components/Header/Header';
import Page from '../AwesomeProject/components/Page/Page';
import Footer from '../AwesomeProject/components/Footer/Footer';
const App = () => (
    
    
      <Provider store={store}>
      <NativeRouter>
      
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
      
        <Header/>
        
      <View style={{ width:"100%", minHeight:"50%", flex: 1, justifyContent: "center", alignItems: "center" ,  backgroundColor: "#75e6ff" }}> 
       <Page/>
      </View>
      <Footer/>
      </View>
     
      </NativeRouter>
      </Provider>
    );
export default App;

 