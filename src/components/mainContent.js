import { getAuth } from "firebase/auth";
import { getDatabase, query, ref, onValue } from "firebase/database";
import { getDownloadURL, getStorage, ref as storageRef, list as listFiles } from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../config/firebaseConfig";
import GridItem from "./gridItem";
import ModalDisplayNft from "./modalDisplayNft";

function MainContent() {
    const [isOpen, setIsOpen] = useState(false);
    const storage = getStorage(app);
    const [nftListResult, setNftListResult] = useState({});
    const [selectedItem, setSelectedItem] = useState(undefined);
    const [nftList, setNftList] = useState([]);
    const auth = getAuth(app);
    const user = auth.currentUser;

    useEffect(() => {
        console.log(user)
        const database = getDatabase(app);
        const results = query(ref(database, "nft/"))
        console.log(results)
        onValue(results, (snapshot) => {
            console.log(snapshot);
            const data = snapshot.val();
            console.log(data);
            setNftListResult(data);
        });
    }, []);

    useEffect(() => {
        if (nftListResult !== {} && nftListResult !== null) {
            const keys = Object.keys(nftListResult);
            if (keys.length > 0) {
                const items = keys.flatMap((key) => {
                    const itemsKeys = Object.keys(nftListResult[key]);
                    return itemsKeys.flatMap((item) => {
                        const nft = {...nftListResult[key][item], id: item, nft: key}
                        return nft;
                    })
                });
    
                setNftList(items);
                
                items.map((item) => {
                    let image;
                    listFiles(storageRef(storage, `images/${item.id}`))
                    .then((data) => {
                    if (data.items.length > 0) {
                        getDownloadURL(data.items[0]).then((url) => {
                            console.log(item);
                            if (url) {
                                const img = document.getElementById(item.id);
                                img.setAttribute('src', url);
                            }
                        })
                    }
                    })
                    return {...nftListResult[item], image}
                });
            }
        }
    }, [nftListResult]);

    const select = (item) => {
        const img = document.getElementById(item.id);
        const src = img.getAttribute("src");

        setSelectedItem({...item, image: src})

        setIsOpen(true)
    }

    return (
        <>
            <div className="w-[80vw] p-8">
                <div className="w-full grid grid-cols-2 gap-x-8 gap-y-8 m-auto pb-20">
                    {nftList.length > 0 ? (
                        nftList.map((item) => (
                            <GridItem key={item.id} item={item} itemId={item.id} onClick={() => select(item)} />
                        ))
                    ) : (
                        <h2 className="text-2xl font-bold absolute left-[50%] top-[50%]">There are no created NFTs yet</h2>
                    )}
                </div>
            </div>
            <ModalDisplayNft isOpen={isOpen} setIsOpen={setIsOpen} item={selectedItem} setItem={setSelectedItem} user={user} />
        </>
    )
}

export default MainContent;