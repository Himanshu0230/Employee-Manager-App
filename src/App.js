import React , {Component} from 'react';
import firebase from '@react-native-firebase/app';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import reducers from './reducers';
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component {

    async UNSAFE_componentWillMount() {
        try {
        const firebaseConfig = {
            apiKey: "AIzaSyBMtEtvwuq7QQtZygS6xWz_3GBE325-c0E",
            authDomain: "manager-bd2ca.firebaseapp.com",
            databaseURL: "https://manager-bd2ca-default-rtdb.firebaseio.com",
            projectId: "manager-bd2ca",
            storageBucket: "manager-bd2ca.appspot.com",
            messagingSenderId: "948707912774",
            appId: "1:948707912774:web:134c7bd38b05d7bcacee47",
            measurementId: "G-2DHGHKERRH"
          };
          await firebase.initializeApp(firebaseConfig);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return(
            <Provider store={createStore(reducers , {} , applyMiddleware(ReduxThunk))}>
                <Router /> 
            </Provider>
        );
    }
}

export default App; 