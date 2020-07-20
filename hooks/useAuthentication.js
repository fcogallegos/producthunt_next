import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

function useAuthentication() {
    const [ userAuthenticated, saveUserAuthenticated ] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(user => {
            if(user) {
                saveUserAuthenticated(user);
            } else {
                saveUserAuthenticated(null);
            }
        });
        return () => unsuscribe();
    }, []);

    return userAuthenticated;
}

export default useAuthentication;
