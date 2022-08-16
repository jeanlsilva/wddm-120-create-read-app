import { getDatabase, ref, push } from "firebase/database";
import { app } from "../config/firebaseConfig";

const database = getDatabase(app);

export function addComment(data) {
    try {
        const id = data.hiddenId || Date.now();
        push(ref(database, "comment/" + data.nft + "/" + id), {
            message: data.message,
            user: data.user,
            name: data.name,
            date: Date.now()
        });
        console.log(data)
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}