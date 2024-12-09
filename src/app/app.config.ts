import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideDatabase, getDatabase } from '@angular/fire/database';

const firebaseConfig = {
	apiKey: "AIzaSyAI_CSK76SQzuCoqa-eZtRHHg92bCg80wU",
	authDomain: "recept-pwa.firebaseapp.com",
	projectId: "recept-pwa",
	storageBucket: "recept-pwa.firebasestorage.app",
	messagingSenderId: "55901601774",
	appId: "1:55901601774:web:8874d4423e168398bdd8ff",
	// databaseURL: "https://DATABASE_NAME.firebaseio.com",
	databaseURL: "https://recept-pwa-default-rtdb.europe-west1.firebasedatabase.app/"
};


export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes), 
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000'
		}), 
		provideAnimationsAsync(),
		provideFirebaseApp(() => initializeApp(firebaseConfig)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		provideStorage(() => getStorage()),
		provideDatabase(() => getDatabase()), // Realtime Database biztosítása
		provideHttpClient(
			withFetch(),
		),
	],
};
