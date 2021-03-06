import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import MyNFTs from "./pages/MyNFTs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wddm-120-create-read-app" element={
          <GuestGuard>
            <SignIn />
          </GuestGuard>
        } />
        <Route path="/wddm-120-create-read-app/home" element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        } />
        <Route path="/wddm-120-create-read-app/mynfts" element={
          <AuthGuard>
            <MyNFTs />
          </AuthGuard>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
