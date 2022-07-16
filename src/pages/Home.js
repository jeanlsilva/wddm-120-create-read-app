import MainContent from "../components/mainContent";
import Sidebar from "../components/sidebar";

function Home() {
    return (
        <div className="flex">
            <Sidebar />
            <MainContent />
        </div>
    )
}

export default Home;