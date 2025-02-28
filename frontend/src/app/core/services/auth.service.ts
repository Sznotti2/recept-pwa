import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const API_URL = 'http://localhost:5000/api/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private http = inject(HttpClient);
	private router = inject(Router);
	
    private userSubject$: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

	constructor() {
        this.userSubject$ = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject$.asObservable();
	}

	register(username: string, email: string, password: string): Observable<any> {
		return this.http.post(
			API_URL + "/register", 
			{ username, email, password },
			httpOptions
		);
	}

	login(email: string, password: string): Observable<any> {
		return this.http.post(
			API_URL + "/login", 
			{ email, password },
			httpOptions
		).pipe(map(user => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem('user', JSON.stringify(user));
			this.userSubject$.next(user as User);
			return user;
		}));
	}

	logout(): Observable<any> {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject$.next(null);
        this.router.navigate(['/account/login']);

		return this.http.post(
			API_URL + `/logout`,
			{}
		);
	}

	editUser(username: string, email: string, currentPassword: string, newPassword: string): Observable<any> {
		return this.http.post(
			API_URL + `/edit`, 
			{ username, email, currentPassword, newPassword },
			httpOptions
		);
	}

	deleteUser(): Observable<any> {
		return this.http.post(
			API_URL + `/delete`, 
			{},
			httpOptions
		);
	}
}
