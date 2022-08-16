import { getAuth } from "firebase/auth";
import { getDatabase, onValue, query, ref } from "firebase/database";
import { list as listFiles, getDownloadURL, ref as storageRef, getStorage } from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../config/firebaseConfig";
import AddNewItemBtn from "./addNewItemBtn";
import GridItem from "./gridItem";
import ModalAddNft from "./modalAddNft";

function MyNFTsMainContent() {
    const [isOpen, setIsOpen] = useState(false);
    const auth = getAuth(app);
    const user = auth.currentUser;
    const storage = getStorage(app);
    const handleOpenModal = () => setIsOpen(true);
    const [nftListResult, setNftListResult] = useState({});

    useEffect(() => {
        const database = getDatabase(app);
        const results = query(ref(database, "nft/" + user.uid))
        onValue(results, (snapshot) => {
            const data = snapshot.val();
            setNftListResult(data);
        });
    }, []);

    useEffect(() => {
        console.log(nftListResult)
        if (nftListResult !== {} && nftListResult !== null) {
            const keys = Object.keys(nftListResult);
        
            if (keys.length > 0) {
                keys.map((key) => {
                    let image;
                   listFiles(storageRef(storage, `images/${key}`))
                   .then((data) => {
                    if (data.items.length > 0) {
                        getDownloadURL(data.items[0]).then((url) => {
                            console.log(key);
                            if (url) {
                                const img = document.getElementById(key);
                                img.setAttribute('src', url);
                            }
                        })
                    }
                   })
                    return {...nftListResult[key], image}
                });
            }
        }
    }, [nftListResult]);

    return (
        <>
            <div className="w-[80vw] p-8">
                <div className="w-full grid grid-cols-2 gap-x-8 gap-y-8 m-auto pb-20">
                    {Object.keys(nftListResult || {}).map((key) => (
                        <GridItem key={key} item={nftListResult[key]} itemId={key} />
                    ))}
                    <AddNewItemBtn onClick={handleOpenModal} />
                </div>
            </div>
            <ModalAddNft isOpen={isOpen} setIsOpen={setIsOpen} user={user.uid} />
        </>
    )
}

export default MyNFTsMainContent;