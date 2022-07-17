import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../config/firebaseConfig";

function Sidebar() {
    const auth = getAuth(app);
    const user = auth.currentUser;
    const navigate = useNavigate();

    const handleSignout = () => {
        signOut(auth)
        .then(() => navigate('/'))
        .catch((error) => console.log(error))
    }

    return (
        <div className="w-[20vw] min-h-screen p-8 bg-gray-200">
            <h1 className="text-3xl">NFToad</h1>
            <p className="mb-8">Hello, {user.displayName}</p>
            <div className="text-left flex flex-col gap-4">
                <Link to="/create-read-app/home">Home</Link>
                <Link to="/create-read-app/mynfts">My NFTs</Link>
                <button className="text-left" onClick={handleSignout}>Signout</button>
            </div>
        </div>
    )
}

export default Sidebar;