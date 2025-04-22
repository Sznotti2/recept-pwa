import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { BlogService } from '../services/blog.service';
import { ImgbbService } from '../../../core/services/imgbb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../interfaces/blog';
import { DropdownSelectComponent } from '../../../shared/components/dropdown-select/dropdown-select.component';

@Component({
	selector: 'app-blog-editor',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgFor, DropdownSelectComponent],
	templateUrl: './blog-editor.component.html',
	styleUrl: './blog-editor.component.scss'
})
export class BlogEditorComponent implements OnInit {
	private blogService = inject(BlogService);
	private formBuilder = inject(FormBuilder);
	private imgbbService = inject(ImgbbService);
	private route: ActivatedRoute = inject(ActivatedRoute);
	private router = inject(Router);

	blogEditForm!: FormGroup;
	blogImgSrc = "";
	paragraphImgSrc: Map<string, string> = new Map();
	slug = "";
	blogSlug = "";
	blog: Blog | null = null;

	ngOnInit(): void {
		this.blogEditForm = this.formBuilder.group({
			title: [""],
			description: [""],
			image: [""],
			content: this.formBuilder.array([]),
			slug: [""],
			status: [""],
			meta_description: [""]
		});

		this.blogSlug = this.route.snapshot.params['slug'];
		if (this.blogSlug) {
			this.blogService.getBlogBySlug(this.blogSlug).subscribe({
				next: (res) => {
					this.blog = res;
					this.blogEditForm.patchValue({
						title: res.title,
						description: res.description,
						slug: res.slug
					});
				},
				error: (err) => console.log(err)
			});
		} else {
			this.addContent();
			this.addImageInput(0);
		}
	}

	create() {
		const blog = this.blogEditForm.value;

		console.log(blog);
		this.blogService.addBlog(blog).subscribe({
			next: () => this.router.navigateByUrl("/settings/my-blogs"),
			error: (err) => console.log(err)
		});
	}

	update() {
		this.blogService.updateBlog(this.blog!).subscribe({
			next: () => this.router.navigateByUrl("/settings/my-blogs"),
			error: (err) => console.log(err)
		});
	}

	delete() {
		this.blogService.deleteBlog(this.blog!.id).subscribe({
			next: () => this.router.navigateByUrl("/settings/my-blogs"),
			error: (err) => console.log(err)
		});
	}

	onDropdownSelect(event: any) {
		console.log(event);
	}
	
	selectedValue: string = '';
	onSelectionChange(selected: string) {
		this.selectedValue = selected;
		console.log('Kiválasztott érték:', selected);
	}

	onTitleChange(event: any) {
		this.slug = event.target.value.toLowerCase().replace(/ /g, "-");
		this.blogEditForm.patchValue({ slug: this.slug });
	}

	onContentImageSelected(event: any) {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];

			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					this.blogImgSrc = reader.result as string;
				}
			};
			reader.readAsDataURL(file);
		}
	};

	get content(): FormArray {
		return this.blogEditForm.get("content") as FormArray;
	}
	addContent(): void {
		const group = this.formBuilder.group({
			contentType: ["", Validators.required],
			text: ["", Validators.required],
			images: this.formBuilder.array([])
		});
		this.content.push(group);
	}
	removeContent(index: number): void {

	}
	getContentTypeAt(index: number): FormGroup {
		return this.content.at(index).get("contentType") as FormGroup;
	}
	getImagesAt(index: number): FormArray {
		return this.content.at(index).get("images") as FormArray
	}
	addImageInput(index: number): void {
		this.getImagesAt(index).push(this.formBuilder.control(""));
	}
	removeImageInput(paragraphIndex: number, imageIndex: number): void {
		this.getImagesAt(paragraphIndex).removeAt(imageIndex);
		// removing the image from the map
		this.paragraphImgSrc.delete(paragraphIndex + "-" + imageIndex);
	}
	onParagraphImageSelected(event: any, paragraphIndex: number, imageIndex: number) {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];

			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					const value = reader.result as string;
					this.paragraphImgSrc.set(paragraphIndex + "-" + imageIndex, value);
				}
			};
			reader.readAsDataURL(file);
		}
	}

}
