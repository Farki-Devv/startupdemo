import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
	apiKey: 'AIzaSyDRSklxrHDdD6t8piAsSN0egJhZ4VEELT8',
	authDomain: 'praktikum-ec8ef.firebaseapp.com',
	projectId: 'praktikum-ec8ef',
	storageBucket: 'praktikum-ec8ef.appspot.com',
	messagingSenderId: '909494617943',
	appId: '1:909494617943:web:f044350f65200a1afd6012',
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
