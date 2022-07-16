import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../config/firebaseConfig";

function AuthGuard({ children }) {
    const auth = getAuth(app);
    const [hasUser, setHasUser] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
               setHasUser(true)
            }
        })
    }, [])

    return hasUser ? <>{children}</> : null;
}

export default AuthGuard;