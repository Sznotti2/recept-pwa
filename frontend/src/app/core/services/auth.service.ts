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

	constructor() {
        this.userSubject$ = new BehaviorSubject<any>(null);
	}

	checkAuthStatus(): void {
		this.http.get(API_URL + "/me", { withCredentials: true })
			.subscribe({
				next: (userData: any) => this.userSubject$.next(userData),
				error: () => this.userSubject$.next(null)
			});
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
			this.userSubject$.next(user as User);
			return user;
		}));
	}

	logout(): Observable<any> {
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
