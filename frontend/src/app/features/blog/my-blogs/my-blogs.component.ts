import { Component, inject } from '@angular/core';
import { BlogListComponent } from '../blog-list/blog-list.component';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';
import { BlogService } from '../services/blog.service';

@Component({
	selector: 'app-my-blogs',
	standalone: true,
	imports: [BlogListComponent, RouterLink],
	templateUrl: './my-blogs.component.html',
	styleUrl: './my-blogs.component.scss'
})
export class MyBlogsComponent {
	blogService = inject(BlogService);
	blogList!: Observable<Blog[]>;

	ngOnInit(): void {
		this.blogList = this.blogService.getBlogs();
	}
}
