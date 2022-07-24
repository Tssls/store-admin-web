import React, { useReducer,useEffect } from 'react';
import reducer from './reducers';

export const ThemeContext = React.createContext({});

const persistent = JSON.parse(window.localStorage.getItem('persistentStorage'))

let initialState = {
    temp: {}
};

if (persistent) {
    initialState = {...persistent}
    window.localStorage.removeItem('persistentStorage');
}

function StoreContent({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        window.onbeforeunload = function (e) {
            e = e || window.event;
            window.localStorage.setItem('persistentStorage', JSON.stringify(state));
        }
    },[state])
    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default StoreContent;