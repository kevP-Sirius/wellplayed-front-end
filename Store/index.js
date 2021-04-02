// == Import : npm
import { createStore, compose, applyMiddleware } from 'redux';

// == Import : local
import reducers from './Reducer/reducer';
import Middleware from './middleware';

// == Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const enhancers = composeEnhancers(
//   applyMiddleware(Middleware),
// );


// On peut avoir plusieurs middlewares :
// nos actions passeront tour à tout dans chaque middleware dans l'ordre avant d'arriver au reducer
const enhancers = composeEnhancers(
  applyMiddleware(
    Middleware,
    
  )
);


const store = createStore(
  reducers,
  enhancers,
);


// == Export
export default store;
