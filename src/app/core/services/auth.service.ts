import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	firebaseAuth = inject(Auth);
	user$ = user(this.firebaseAuth);
	currentUserSignal = signal<User | null | undefined>(undefined);

	register(username: string, email: string, password: string): Observable<any> {
		const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
			.then(response => updateProfile(response.user, { displayName: username }));
		return from(promise);
	}

	login(email: string, password: string): Observable<any> {
		const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password);
		return from(promise);
	}

	logout(): Observable<any> {
		const promise = signOut(this.firebaseAuth);
		return from(promise);
	}
}
