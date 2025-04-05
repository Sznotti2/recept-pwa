import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { ImgbbService } from './imgbb.service';

const API_URL = 'http://localhost:5000/api/user';
const imgbbUrl = `https://api.imgbb.com/1/upload?key=cb3b7fec7215b3181f55cd79b56f426c`;

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private http = inject(HttpClient);
	private router = inject(Router);
	imgbbService = inject(ImgbbService);

	user$: BehaviorSubject<User | null>;

	constructor() {
		this.user$ = new BehaviorSubject<any>(null);
	}

	refreshToken(): void {
		this.http.get(
			API_URL + "/refreshtoken",
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		).subscribe();
	}

	autoLogin(): void {
		this.http.get<any>(API_URL + "/me", { withCredentials: true }).subscribe(response => {
			this.user$.next(response.user);
		});
	}

	register(username: string, email: string, password: string, passwordAgain: string): Observable<any> {
		return this.http.post(
			API_URL + "/register",
			{ "name": username, "email": email, "password": password, "password2": passwordAgain },
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		);
	}

	login(email: string, password: string): Observable<any> {
		return this.http.post(
			API_URL + "/login",
			{ "email": email, "password": password },
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		).pipe(map(user => {
			this.user$.next(user as User);
		}));
	}

	logout(): Observable<any> {
		this.user$.next(null);
		this.router.navigate(['/account/login']);

		return this.http.post(
			API_URL + `/logout`,
			{},
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		);
	}
	/*
		editUser(name: string, password: string, bio: string, image: File): Observable<any> {
			return this.imgbbService.upload(image).pipe(
				map(profilePicture => {
					// Itt már a profilePicture tartalmazza az uploadImage eredményét,
					// amit felhasználhatsz a PUT kérésben.
					return this.http.put(
						API_URL + `/`,
						{ name, password, bio, profilePicture },
						{
							withCredentials: true,
							headers: new HttpHeaders({ 'Content-Type': 'application/json' })
						}
					);
				}),
				tap(() => {
					console.log("editUser sent");
				})
			);
		}
	*/
	editUser(name: string, password: string, bio: string, image: string): Observable<any> {
		return this.http.put(
			API_URL + `/`,
			{ name, password, bio, image },
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		);
	}

	deleteUser(): Observable<any> {
		return this.http.post(
			API_URL + `/delete`,
			{},
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		);
	}

	getUser(id: number): Observable<User> {
		return this.http.get<{ row: User }>(
			API_URL + "/" + id,
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		).pipe(
			map(response => response.row)
		);
	}
}
