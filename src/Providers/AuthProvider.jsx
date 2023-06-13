import { useEffect, useState } from "react";
import { createContext } from "react";
// for [firebase auth]
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { app } from "../firebase/firebase.config";

// creating a [context] to export to anyone
export const AuthContext = createContext(null);

// [firebase auth] to use & [app] must be from [firebase.config.js]
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    // create user in firebase
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // sign in with firebase
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
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
        signIn,
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