import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { BlogService } from '../services/blog.service';
import { ImgbbService } from '../../../core/services/imgbb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../interfaces/blog';

@Component({
	selector: 'app-blog-editor',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgFor],
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
	blogId = -1;
	blog: Blog | null = null;

	ngOnInit(): void {
		this.blogEditForm = this.formBuilder.group({
			title: [""],
			description: [""],
			image: [""],
			content: this.formBuilder.array([]),
			slug: [""]
		});

		this.blogSlug = this.route.snapshot.params['slug'];
		if (this.blogSlug) {
			this.blogService.getBlogBySlug(this.blogSlug).subscribe({
				next: (res) => {
					this.blog = res;
					/*
					const content = JSON.parse(res.content);
					content.forEach((paragraph: any) => {
						const group = this.formBuilder.group({
							text: [paragraph.text, Validators.required],
							images: this.formBuilder.array([])
						});
						this.content.push(group);
	
						paragraph.images.forEach((image: string) => {
							this.getImagesAt(this.content.length - 1).push(this.formBuilder.control(image));
						});
					});
					*/
				},
				error: (err) => console.log(err)
			});

			this.blogEditForm.patchValue({
				title: this.blog!.title,
				description: this.blog!.description,
				slug: this.blog!.slug
			});
			this.blogImgSrc = this.blog!.image;
			this.blogId = this.blog!.id;
		} else {
			this.addParagraph();
			this.addImageInput(0);
		}
	}

	create() {
		const blog = this.blogEditForm.value;

		this.blogService.addBlog(blog).subscribe({
			next: () => this.router.navigateByUrl("/settings/my-blogs"),
			error: (err) => console.log(err)
		});
	}

	delete() {
		this.blogService.deleteBlog(this.blogId).subscribe({
			next: () => this.router.navigateByUrl("/settings/my-blogs"),
			error: (err) => console.log(err)
		});
	}

	onTitleChange(event: any) {
		this.slug = event.target.value.toLowerCase().replace(/ /g, "-");
		this.blogEditForm.patchValue({ slug: this.slug });
	}

	get content(): FormArray {
		return this.blogEditForm.get("content") as FormArray;
	}
	addParagraph(): void {
		const group = this.formBuilder.group({
			text: ["", Validators.required],
			images: this.formBuilder.array([])
		});
		this.content.push(group);
	}
	removeParagraph(index: number): void {

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

	onBlogImageSelected(event: any) {
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

}
