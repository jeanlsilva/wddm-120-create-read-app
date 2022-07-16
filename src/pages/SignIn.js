import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebaseConfig";

function SignIn() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const navigate = useNavigate();
    
    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                navigate("/home")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <button className="rounded-lg border p-3" onClick={handleSignIn}>Sign in with Google</button>
        </div>
    )
}

export default SignIn;