import { getDatabase, push, ref, remove, get } from "firebase/database";
import { app } from "../config/firebaseConfig";
const database = getDatabase(app);

export function addFavorite(nftId, userId) {
    try {
        const id = Date.now();
        push(ref(database, "star/" + nftId), {
            user: userId
        });
        return id;
    } catch (error) {
        console.log(error);
    }
}

export function removeFavorite(nftId, userId) {
    try {
        get(ref(database, `star/${nftId}`)).then((snapshot) => {
            const data = snapshot.val();
            const keys = Object.keys(data);
            const star = keys.find((key) => data[key].user === userId);
            remove(ref(database, `star/${nftId}/${star}`))
        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}