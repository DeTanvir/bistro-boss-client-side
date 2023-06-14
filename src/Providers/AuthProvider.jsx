import { useEffect, useState } from "react";
import { createContext } from "react";
// for [firebase auth]
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import { app } from "../firebase/firebase.config";
// [axios-js]
import axios from "axios";

// creating a [context] to export to anyone
export const AuthContext = createContext(null);

// [firebase auth] to use & [app] must be from [firebase.config.js]
const auth = getAuth(app);
// Google signIn provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    // create user in firebase
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // update [user-profile]
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    // sign in with email and password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // Google signIn
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // logOut from firebase
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }




    // to monitor users & change in users
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser);

            // only when an [user] exists, [jwt token req] would be sent, THEN THE ["TOKEN"] would be sent to [localStorage]
            if (currentUser) {
                // [axios] to fetch easily
                axios.post('http://localhost:5000/jwt', { email: currentUser.email })
                    .then(data => {
                        console.log(data.data.token);
                        // save [jwt token] to the localStorage
                        localStorage.setItem('access-token', data.data.token);
                    })
            }
            else{
                // remove [jwt token] if the user loggedOut
                localStorage.removeItem('access-token');
            }

            setLoading(false);
        });
        return () => {
            // by returning unsubscribe this useEffect stops
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile,
        signIn,
        googleSignIn,
        logOut
    }

    return (
        // the part that provide [AuthContext] to anyone
        // it provides the value={authInfo} to the {children} that calls by [useContext()] hook
        // the children: whoever is inside [AuthProvider]
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

        // here, [AuthProvider] is the supplier of AuthContext
        // any children(component from inside the [AuthProvider]) can call [AuthContext] by calling [useContext()] hook, then gets the value={authInfo}
    )
};

export default AuthProvider;