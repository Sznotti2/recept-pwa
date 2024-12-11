import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile, user } from '@angular/fire/auth';
import { from, Observable, switchMap } from 'rxjs';
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

	reauthenticate(password: string): Observable<any> {
		const currentUser = this.firebaseAuth.currentUser;

		if (!currentUser || !currentUser.email) {
			throw new Error('No user is currently logged in.');
		}

		const credential = EmailAuthProvider.credential(currentUser.email, password);
		const promise = reauthenticateWithCredential(currentUser, credential);
		return from(promise);
	}

	editProfile(username: string, email: string, currentPassword: string, newPassword: string): Observable<any> {
		const currentUser = this.firebaseAuth.currentUser;

		if (!currentUser) {
			throw new Error('No user is currently logged in.');
		}

		const promises: Promise<void>[] = [];

		return this.reauthenticate(currentPassword).pipe(
			switchMap(() => {
				if (username) {
					promises.push(updateProfile(currentUser, { displayName: username }));
				}

				if (email) {
					promises.push(updateEmail(currentUser, email));
				}

				if (newPassword) {
					promises.push(updatePassword(currentUser, newPassword));
				}

				return from(Promise.all(promises));
			})
		);
	}

	deleteUser(): Observable<any> {
		const currentUser = this.firebaseAuth.currentUser;

		if (!currentUser) {
			throw new Error('No user is currently logged in.');
		}

		const promise = deleteUser(currentUser);
		return from(promise);
	}
}
