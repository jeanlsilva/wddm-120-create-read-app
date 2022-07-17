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
                navigate("home")
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-9xl font-bold">NFToad</h1>
            <h2 className="text-2xl mb-10">The best NFT trading platform</h2>
            <button 
                className="rounded-lg border p-3 hover:bg-gray-200 hover:border-black transition-all ease-in-out duration-500" 
                onClick={handleSignIn}
            >
                Sign in with Google
            </button>
        </div>
    )
}

export default SignIn;