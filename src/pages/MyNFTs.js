import MyNFTsMainContent from "../components/myNFTsMainContent";
import Sidebar from "../components/sidebar";

function MyNFTs() {
    return (
        <div className="flex">
            <Sidebar />
            <MyNFTsMainContent/>
        </div>
    )
}

export default MyNFTs;