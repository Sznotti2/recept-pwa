import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../interfaces/blog';
import { BlogService } from '../services/blog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../../core/interfaces/user';

@Component({
	selector: 'app-blog-view',
	standalone: true,
	imports: [DatePipe, RouterLink, CommonModule],
	templateUrl: './blog-view.component.html',
	styleUrl: './blog-view.component.scss'
})
export class BlogViewComponent {
	private route: ActivatedRoute = inject(ActivatedRoute);
	private blogServise = inject(BlogService);
	private authService = inject(AuthService);

	blog!: Blog;
	author!: User | null;
	errorMessage: string | null = null;

	constructor() {
		const blogSlug = this.route.snapshot.params['slug'];

		this.blogServise.getBlogBySlug(blogSlug).subscribe(blog => {
			this.blog = blog;

			console.log(this.blog.content);

			this.authService.getUser(blog.author_id).subscribe(author => {
				this.author = author;
			});
		});

	}
}
