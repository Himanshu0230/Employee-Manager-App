import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Actions } from 'react-native-router-flux';
import {EMPLOYEE_UPDATE , EMPLOYEE_CREATE , EMPLOYEE_FETCH_SUCCESS , EMPLOYEE_SAVE_SUCCESS} from './types';

export const employeeUpdate = ({ prop , value }) => {
    return {
        type:EMPLOYEE_UPDATE,
        payload: {prop , value}
    };
};

export const employeeCreate = ({ name , phone , shift }) => {
    const {currentUser} = auth();

    return (dispatch) => {
    database().ref(`/users/${currentUser.uid}/employees`)
        .push({ name , phone , shift })
        .then(() => {
            dispatch({ type:EMPLOYEE_CREATE })
            Actions.pop()
        });
    }
};

export const employeesFetch = () => {
    const {currentUser} = auth();

    return (dispatch) => {
        database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({ type: EMPLOYEE_FETCH_SUCCESS , payload: snapshot.val() });
            });
    };
};

export const employeeSave = ({name , phone , shift , uid}) => {
    const {currentUser} = auth();

    return (dispatch) => {
        database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({name , phone , shift})
            .then(() => {
                dispatch({type: EMPLOYEE_SAVE_SUCCESS})
                Actions.pop();
            });
    };
};

export const employeeDelete = ({ uid }) => {
    const {currentUser} = auth();

    return () => {
        database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                Actions.pop();
            });
    };
};