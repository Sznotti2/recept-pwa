import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/interfaces/user';
import { ImgbbService } from '../../core/services/imgbb.service';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [ReactiveFormsModule, NgClass, CommonModule],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss'
})
export class ProfileComponent {
	authService = inject(AuthService);
	cd = inject(ChangeDetectorRef);

	imgbb = inject(ImgbbService);
	imageSrc = "";
	selectedImage: File | null = null; // ez lesz elküldve az imgbb-nek
	imgUrl = "";

	user!: User;
	editForm: FormGroup;
	constructor(private formBuilder: FormBuilder) {

		this.editForm = this.formBuilder.group({
			username: [""],
			bio: [""],
			password: ["", {
				validators: [Validators.required],
			}],
			image: [""],
		});

		// Ha a felhasználó már be van jelentkezve, töltsd fel az űrlapot az adataival
		this.authService.user$.subscribe(user => {
			if (user) {
				this.editForm.patchValue({
					username: user.name || "",
					bio: user.bio || "",
					image: user.profilePicture || "",
				});
			}
		});
	}

	/**
   *@param event {EventObject} - the javascript change event
   *@param field {String} - the form field control name
   */
	onFileChange(event: Event) {
		const reader = new FileReader();
 
		const target = event.target as HTMLInputElement;
		if(target && target.files && target.files.length > 0) {
			this.selectedImage = target.files[0];

			// const [file] = Array.from(target.files); // több kép esetén
			const file = target.files[0];
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.imageSrc = reader.result as string; // kép megjelenítéshez
			
				// need to run CD since file load runs outside of zone
				this.cd.markForCheck();
			};
		}
	}

	public edit(): void {
		if (this.editForm.valid) {
			const form = this.editForm.value;
			if (this.selectedImage !== null) {
				this.imgbb.upload(this.selectedImage as File).subscribe({
					next: (res) => this.imgUrl = res,
					error: (err) => console.error("Upload error", err)
				});
			}
			this.authService.editUser(form.username, form.password, form.bio, this.imgUrl).subscribe({
				next: (res) => console.log("Update successful", res),
				error: (err) => console.error("Update error", err)
			});
		} else {
			console.log("Invalid form");
		}
	}

	public delete() {
		this.authService.deleteUser().subscribe({
			next: (res) => console.log("Delete successful", res),
			error: (err) => console.error("Delete error", err)
		});
	}

	passwordVisible = false;
	inputType = "password";
	revealPassword() {
		this.passwordVisible = !this.passwordVisible;
		this.inputType = this.passwordVisible ? "text" : "password";
	}

	// Getters
	get username() {
		return this.editForm.controls["username"];
	}
	get bio() {
		return this.editForm.controls["bio"];
	}
	get password() {
		return this.editForm.controls["password"];
	}
	get image() {
		return this.editForm.controls["image"];
	}
}
