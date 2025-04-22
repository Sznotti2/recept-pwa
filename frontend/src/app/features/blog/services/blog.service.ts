import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Blog } from '../interfaces/blog';

const API_URL = 'http://localhost:5000/api/blog';

@Injectable({
	providedIn: 'root'
})
export class BlogService {
	private http = inject(HttpClient);

	addBlog(blog: Blog): Observable<any> {
		blog.image = "path-to-img";
		blog.content = JSON.stringify(blog.content);

		return this.http.post<any>(
			API_URL + "/",
			blog,
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		).pipe(
			catchError(error => {
				console.error("Hiba történt a recept hozzáadása során:", error);
				return of({ error: error });
			})
		);
	}

	getBlogs(): Observable<Blog[]> {
		return this.http.get<{ rows: Blog[] }>(
			API_URL + "/",
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		).pipe(
			map(response => response.rows ?? []), // Ha null vagy undefined, akkor üres tömböt ad vissza
			catchError(error => {
				console.error("Hiba történt a receptek lekérésekor:", error);
				return of([]); // Hiba esetén is üres tömböt adunk vissza, így elkerüljük a hibát a sablonban
			})
		);
	}

	getBlogBySlug(slug: string): Observable<Blog> {
		return this.http.get<{ row: Blog }>(
			API_URL + "/" + slug,
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		).pipe(
			map(res => {
				res.row.content = JSON.parse(res.row.content);
				return res.row;
			}),
			catchError(error => {
				//console.error("Hiba történt a recept lekérésekor:", error);
				return throwError(() => error);
			})
		);
	}

	updateBlog(blog: Blog): Observable<any> {
		return this.http.put<any>(
			API_URL + "/",
			blog,
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		).pipe(
			catchError(error => {
				console.error("Hiba történt a recept hozzáadása során:", error);
				return throwError(() => error);
			})
		);
	}

	deleteBlog(id: number): Observable<any> {
		return this.http.delete(
			API_URL + "/" + id,
			{
				withCredentials: true,
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
		);
	}

	sortBlogsByName(blogs: Blog[], descending: boolean = false): Blog[] {
		return blogs.sort((a, b) => {
			const comparison = a.title.localeCompare(b.title);
			return descending ? comparison * -1 : comparison
		});
	}

	sortBlogsByDate(blogs: Blog[], descending: boolean = false): Blog[] {
		return blogs.sort((a, b) => {
			const comparison = b.created_at.getTime() - a.created_at.getTime();
			return descending ? comparison * -1 : comparison
		});
	}
}
