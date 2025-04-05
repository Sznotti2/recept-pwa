import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { BlogListComponent } from '../blog-list/blog-list.component';

@Component({
	selector: 'app-blogs-page',
	standalone: true,
	imports: [BlogListComponent, ReactiveFormsModule, FormsModule],
	templateUrl: './blogs-page.component.html',
	styleUrl: './blogs-page.component.scss'
})
export class BlogsPageComponent {
	blogService = inject(BlogService);
	blogs = this.blogService.getBlogs();

	selectedOption = "";
	blogSortForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.blogSortForm = this.formBuilder.group({
			timeAsc: [""],
			timeDesc: [""],
			nameAsc: [""],
			nameDesc: [""],
		});
	}

	toggleDropdown(event: any) {
		event.preventDefault();
		event.stopPropagation();
		event.target.classList.toggle('expanded');

		const targetId = event.target.getAttribute('for');
		const element = document.querySelector(`#${targetId}`) as HTMLInputElement;
		element.checked = true;
	}

	sortBlogsByDate(ascending: boolean = false) {
		// this.blogs = this.blogService.sortBlogsByDate(this.blogs, ascending);
	}

	sortBlogsByName(ascending: boolean = false) {
		// this.blogs = this.blogService.sortBlogsByName(this.blogs, ascending);
	}

	sortBlogs() {
		if (this.selectedOption === "time-asc") {
			this.sortBlogsByDate();
		} else if (this.selectedOption === "time-desc") {
			this.sortBlogsByDate(true);
		} else if (this.selectedOption === "name-asc") {
			this.sortBlogsByName();
		} else if (this.selectedOption === "name-desc") {
			this.sortBlogsByName(true);
		}
	}
}
