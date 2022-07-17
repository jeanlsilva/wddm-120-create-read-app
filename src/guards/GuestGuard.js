import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebaseConfig";

function GuestGuard({ children }) {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const [hasUser, setHasUser] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setHasUser(true);
                navigate("home")
                return null;
            } else {
                setHasUser(false)
            }
        })
    }, []);

    return hasUser ? null : <>{children}</>
}

export default GuestGuard;