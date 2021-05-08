import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig.json';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const addData = async (db: firebase.firestore.Firestore, document: { base: string, target: string }) => {
    const userid = getID()? getID() : undefined;
    const docRef = db.collection('prev-conv').doc(userid).collection('data').doc();
    try {
        await docRef.set({
            document: document,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        });
        if (!getID()) {
            const id = docRef.parent.parent?.id ? docRef.parent.parent?.id : '';
            localStorage.setItem('userid', id);
        }
    } catch (err) {
        console.error(err);
    }
}

const getData = async (db: firebase.firestore.Firestore): Promise<{base: string, target: string}[]> => {
    let array: { base: string; target: string; }[] = [];
    const userid = getID()? getID() : undefined;
    let colRef = db.collection('prev-conv').doc(userid).collection('data');
    if (getID()) {
        const data = await colRef.orderBy('timestamp', 'desc').limit(5).get();
        data.forEach((doc) => {
            array.push({
                base: doc.data().document.base,
                target: doc.data().document.target
            });
        });
        return array;
    } else {
        colRef = db.collection('prev-conv').doc().collection('data');
        await colRef.orderBy('timestamp', 'desc').limit(5).get();
        return array;
    }
}

const deleteData = async (db: firebase.firestore.Firestore) => {
    const userid = getID()? getID() : undefined;
    const colRef = db.collection('prev-conv').doc(userid).collection('data')
    const snapshot = await colRef.get();
    if (snapshot.size === 0) {
        return;
    }
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();
    deleteID();
}

const getID = (): string => {
    return localStorage.getItem('userid') || '';
}

const deleteID = (): void => {
    if (localStorage.getItem('userid')) {
        localStorage.clear();
    }
}

export {
    db,
    addData,
    getData,
    deleteData
} 