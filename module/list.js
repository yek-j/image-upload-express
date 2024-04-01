const { initializeApp } = require('firebase/app');
const { getStorage, ref, listAll, getDownloadURL } = require("firebase/storage");

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = async function() {
    const images = [];  // 이미지 이름
    const urls = []; // 이미지 URL (다운로드)

    const listRef = ref(storage, '/');
    await listAll(listRef)
    .then((res) => {
        res.items.forEach((itemRef) => {
            images.push(itemRef._location.path_);
        });
    }).catch((error) => {
        console.error(error);
    });

    for(img of images) {
        await getDownloadURL(ref(storage, img))
             .then((url) => {
                 urls.push(url);
             })
             .catch((error) => {
                 console.error(error);
             })
     }

     return urls;
}