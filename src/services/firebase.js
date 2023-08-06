import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, where, query, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC3Zmzh5oSaGK8fgh_fWaRQqUUuhHHtEqc",
  authDomain: "kitkatscript-f686a.firebaseapp.com",
  projectId: "kitkatscript-f686a",
  storageBucket: "kitkatscript-f686a.appspot.com",
  messagingSenderId: "19613731408",
  appId: "1:19613731408:web:d4e77d5afcc08ffe3ddf55"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

async function getData () {

  const productsRef = collection (db, "products");
  const documentsSnapshot = await getDocs (productsRef);
  const documents = documentsSnapshot.docs;
  const docsData = documents.map (item => { return { ...item.data(), id: item.id }});

  if (docsData.length === 0) {

    throw new Error ("No hay nada para mostrar")

  }

  else {

    return (docsData);

  }

}

async function getProductData (id) {

    const docRef = doc (db, "products", id);
    const docSnapshot = await getDoc (docRef);

    if (docSnapshot.exists ()) {

      return {...docSnapshot.data(), id: docSnapshot.id};

    }

    else {

      throw new Error ("No se encontró tal producto.");

    }


}


async function getCategoryData (id) {

  const productsRef = collection (db, "products");
  const q = query (productsRef, where ("category", "==", id));

  const documentsSnapshot = await getDocs (q);
  const documents = documentsSnapshot.docs;
  const docsData = documents.map (item => { return { ...item.data(), id: item.id }});

  if (docsData.length === 0) {

    throw new Error ("No hay nada para mostrar")

  }

  else {

    return (docsData);

  }

}

async function createOrder (orderData) {

  const collectionRef = collection (db, "orders");
  const docCreated = await addDoc (collectionRef, orderData);

  return (docCreated.id)

}

async function getOrder (id) {

  const docRef = doc (db, "orders", id);
  const docSnapshot = await getDoc (docRef);

  if (docSnapshot.exists ()) {

    return {...docSnapshot.data(), id: docSnapshot.id};

  }

  else {

    throw new Error ("No encontramos ese producto.");

  }

}

export { getData, getOrder, getProductData, getCategoryData, createOrder };