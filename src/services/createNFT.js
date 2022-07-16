import { getDatabase, ref, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { app } from "../config/firebaseConfig";

const database = getDatabase(app);

export function uploadImage(image, nftId) {
    try {
        const storage = getStorage(app);
        const imageRef = storageRef(storage, `images/${nftId}/${image.name}`);
        uploadBytes(imageRef, image)
        .then((snapshot) => console.log(snapshot))
        return imageRef.fullPath;
    } catch (error) {
        console.log(error)
    }
}

export function createNFT(data) {
    try {
        const id = data.hiddenId || Date.now();
        const image = uploadImage(data.image[0], id);
        set(ref(database, "nft/" + data.user + "/" + id), {
            title: data.title,
            description: data.description,
            price: data.price,
            image,
            user: data.user
        });
        console.log(data)
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}