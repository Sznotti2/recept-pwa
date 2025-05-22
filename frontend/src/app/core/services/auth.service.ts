import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { ImgbbService } from './imgbb.service';

const API_URL = 'http://localhost:5000/api/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private http = inject(HttpClient);
	imgbbService = inject(ImgbbService);

	user$: BehaviorSubject<User | null>;

	constructor() {
		this.user$ = new BehaviorSubject<User | null>(null);
	}

	refreshToken(): Observable<any> {
		return this.http.get(
			API_URL + "/refreshtoken"
		);
	}

	register(username: string, email: string, password: string, passwordAgain: string): Observable<any> {
		return this.http.post(
			API_URL + "/register",
			{ "name": username, "email": email, "password": password, "password2": passwordAgain }
		);
	}

	login(email: string, password: string): Observable<any> {
		return this.http.post(
			API_URL + "/login",
			{ "email": email, "password": password }
		).pipe(map(user => {
			this.user$.next(user as User);
		}));
	}

	logout(): Observable<any> {
		this.user$.next(null);

		return this.http.post(
			API_URL + `/logout`,
			{}
		);
	}

	editUser(name: string, password: string, bio: string, profilePicture: string): Observable<any> {
		return this.http.put(
			API_URL + `/`,
			{ name, password, bio, profilePicture }
		);
	}

	deleteUser(): Observable<any> {
		this.user$.next(null);
		return this.http.delete(
			API_URL + `/`,
			{}
		);
	}

	getUser(id: number): Observable<User> {
		return this.http.get<{ row: User }>(
			API_URL + "/" + id
		).pipe(
			map(response => response.row)
		);
	}
	
	autoLogin(): Observable<User> {
		return this.http.get<{ user: User }>(
			API_URL + "/me"
		).pipe(
			map(response => {
				const user = response.user as User;
				this.user$.next(user);
				return user;
			})
		);
	}
}
