import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../core/interfaces/user';
import { ImgbbService } from '../../../core/services/imgbb.service';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private http = inject(HttpClient);
	imgbbService = inject(ImgbbService);
	apiUrl = environment.apiUrl + 'user';

	user$: BehaviorSubject<User | null>;

	constructor() {
		this.user$ = new BehaviorSubject<User | null>(null);
	}

	refreshToken(): Observable<any> {
		return this.http.get(
			this.apiUrl + "/refreshtoken"
		);
	}

	register(username: string, email: string, password: string, passwordAgain: string): Observable<any> {
		return this.http.post(
			this.apiUrl + "/register",
			{ "name": username, "email": email, "password": password, "password2": passwordAgain }
		);
	}

	login(email: string, password: string): Observable<any> {
		return this.http.post(
			this.apiUrl + "/login",
			{ "email": email, "password": password }
		).pipe(map(user => {
			this.user$.next(user as User);
		}));
	}

	logout(): Observable<any> {
		this.user$.next(null);

		return this.http.post(
			this.apiUrl + `/logout`,
			{}
		);
	}

	editUser(name: string, password: string, bio: string, profilePicture: string): Observable<any> {
		return this.http.put(
			this.apiUrl + `/`,
			{ name, password, bio, profilePicture }
		);
	}

	deleteUser(): Observable<any> {
		this.user$.next(null);
		return this.http.delete(
			this.apiUrl + `/`,
			{}
		);
	}

	getUser(id: number): Observable<User> {
		return this.http.get<{ row: User }>(
			this.apiUrl + "/" + id
		).pipe(
			map(response => response.row)
		);
	}
	
	autoLogin(): Observable<any> {
		return this.http.get<{ user: User }>(
			this.apiUrl + "/me"
		).pipe(
			map(response => {
				const user = response.user as User;
				this.user$.next(user);
				return user;
			}),
			catchError((error) => {
				this.user$.next(null);
				console.error("Error during auto-login:", error);
				return of(null);
			})
		);
	}
}
