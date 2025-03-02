import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [ReactiveFormsModule, NgClass],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss'
})
export class ProfileComponent {
	authService = inject(AuthService);

	editForm: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this.editForm = this.formBuilder.group({
			username: ["", {
				validators: [Validators.required],
			}],
			email: ["", {
				validators: [Validators.required, Validators.email],
			}],
			oldPassword: ["", {
				validators: [Validators.required],
			}],
			newPassword: ["", {
				validators: [Validators.required],
			}],
			image: [""],
		});

		// TODO: Set form values if user is logged in
		
	}

	public edit(): void {
		if (this.editForm.valid) {
			const form = this.editForm.value;
			// this.authService.editProfile(form.username, form.email, form.oldPassword, form.newPassword)
		} else {
			console.log("Invalid form: " + this.editForm.value);
		}
	}

	public delete() {
		this.authService.deleteUser();
	}

	passwordVisible = false;
	inputType = "password";
	revealPassword() {
		this.passwordVisible = !this.passwordVisible;
		this.inputType = this.passwordVisible ? "text" : "password";
	}

	// Getters
	get email() {
		return this.editForm.controls["email"];
	}
	get oldPassword() {
		return this.editForm.controls["oldPassword"];
	}
	get newPassword() {
		return this.editForm.controls["newPassword"];
	}
	get username() {
		return this.editForm.controls["username"];
	}
	get image() {
		return this.editForm.controls["image"];
	}
}
