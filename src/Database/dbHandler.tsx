import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig.json';

firebase.initializeApp(firebaseConfig);
  
const db = firebase.firestore();

const addData = (db: firebase.firestore.Firestore, document: any) => {
    var userid = getID()? getID() : undefined;
    var docRef = db.collection('prev-conv').doc(userid).collection('data').doc();
    docRef.set({
        document: document,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    })
    if (!getID()) {
        var id = docRef.parent.parent?.id? docRef.parent.parent?.id : '';
        localStorage.setItem('userid', id);
    }
}

const getData = (db: firebase.firestore.Firestore): Promise<{base: string, target: string}[]> => {
    var array: { base: any; target: any; }[] = [];
    var userid = getID()? getID() : undefined;
    var colRef = db.collection('prev-conv').doc(userid).collection('data');
    if (getID()) {
        return colRef.orderBy('timestamp', 'desc').limit(5).get().then((data) => {
            data.forEach((doc) => {
                array.push({
                    base: doc.data().document.base,
                    target: doc.data().document.target
                })
            })
            return array;
        });
    } else {
        colRef = db.collection('prev-conv').doc().collection('data');
        return colRef.orderBy('timestamp', 'desc').limit(5).get().then(() => {
            return array;
        });
    }
}

const getID = (): string => {
    var userid = localStorage.getItem('userid');
    if (userid) {
        return userid;
    } else {
        return '';
    }
}

export {
    db,
    getID,
    addData,
    getData,
} 