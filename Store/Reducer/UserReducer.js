// == Initial State
const initialState = {
    username: '',
    password: '',
    token: '',
    logged: false,
    playlist:[],
    loading:false,
    buttonLock:false,
    error :'',
    musicflux:false,
    player:false,
    currentFile:''
  };
  
  // == Types
  
  const SAVE_PLAYLIST = 'SAVE_PLAYLIST';
  const SAVE_USER = 'SAVE_USER';
  const ERROR = 'ERROR';
  const LOAD_FILENAME = 'LOAD_FILENAME';
  const READ_SRC = 'READ_SRC';
  const BACK_TO_PLAYLIST = 'BACK_TO_PLAYLIST';
  export const LOGOUT = 'LOGOUT';
  export const LOGIN = 'LOGIN';
  export const AUTHENTICATE = 'AUTHENTICATE';
  export const LOADING = 'LOADING';
  export const READ = 'READ'; 
  // == Reducer
  const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case ERROR:
      return {
        ...state,
        error: action.errors.status,
       
      };
      case SAVE_USER:
      return {
        ...state,
        logged: true,
        username: action.user.username,    
                
      };
      case LOADING:
        return {
          ...state,
          loading: !state.loading,
          buttonLock: !state.buttonLock
        };
      case LOGOUT:
        return {
          ...state,
          logged: false, 
          player:false,
        };
      case SAVE_PLAYLIST:
        return {
          ...state,
          playlist:action.playlist, 
        };
      case AUTHENTICATE:
      return {
        ...state,
       username:action.info.username,
       password:action.info.password
      };
      case BACK_TO_PLAYLIST:
        return {
          ...state,
          player:false,
        };
      case READ_SRC:
        return {
          ...state,
          musicflux:action.flux.flux,
        };  
      case LOAD_FILENAME:
        return {
          ...state,
          currentFile:action.filename.filename,
          player:true,
        };
      default:
        return state;
    }
  };
  
  // == Action Creators
  export const doloading=() => ({
    type: LOADING,
  });
  export const connectFunc = (info) => ({
    type: AUTHENTICATE,
    info
  });
  export const dologout = () => ({
    type: LOGOUT,
  });

  export const savePlaylist = (playlist) => ({
    type: SAVE_PLAYLIST,
    playlist,
  });
  export const saveUser = (user) => ({
    type: SAVE_USER,
    user,
  });
  export const loadError = (errors) => ({
    type: ERROR,
    errors,
  });
  export const readFile = () => ({
    type: READ,
    
  });
  export const readSrc = (flux) => ({
    type: READ_SRC,
    flux
  });
  export const loadFilename = (filename) => ({
    type: LOAD_FILENAME,
    filename,
  });
  export const backToPlaylist = () => ({
    type: BACK_TO_PLAYLIST,
   
  });
  // == Selectors
  
  
  
  // == Export
  export default Reducer;
  
  