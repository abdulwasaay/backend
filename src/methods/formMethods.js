const { app } = require("@/app/firebase-config");
import { compare, hash } from "bcryptjs";
import { getDatabase, ref, set, onValue ,push} from "firebase/database";

const db = getDatabase(app);

export function getAll() {
    const allData = ref(db, 'users/');
    return allData
}

export function getByEmail(email) {
    return new Promise((resolve, reject) => {
        const data = getAll();
        const arr = [];
        onValue(data, (u) => {
            for (let key in u.val()) {
                if (u.val().hasOwnProperty(key)) {
                    arr.push(u.val()[key]);
                }
            }
            resolve(arr.find((u) => u.email.toLowerCase() === email.toLowerCase()));
        }, (error) => {
            reject(error);
        });
    });
}

export async function getByPassword(password, hashpassword) {
    const confirmPassword = await compare(password, hashpassword)
    return confirmPassword
}

export async function addData(email, password) {
    let found = await getByEmail(email)
    if (found) {
        throw new Error("User already exists.");
    }
    const db = getDatabase(app);
    const newDocumentRef = push(ref(db, "users"));
    const hashedPassword = await hash(password, 12);
    set(newDocumentRef,{
        email,
        password: hashedPassword,
    });
}