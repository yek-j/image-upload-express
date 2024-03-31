const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

module.exports = async function (fileName, strMetadata, buffer)  {
    let uploadTime;
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    const storageRef = ref(storage, fileName);
    const metadata = {
      contentType: strMetadata,
    };

    const startTiem = Date.now();

    await uploadBytes(storageRef, buffer, metadata).then((snapshot) => {
        const endTime = Date.now();
        uploadTime = endTime - startTiem;
        console.log("업로드 완료 : " + uploadTime);
    });

    return uploadTime;
}