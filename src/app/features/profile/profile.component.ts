import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [ReactiveFormsModule, NgClass],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss'
})
export class ProfileComponent {
	loginForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.loginForm = this.formBuilder.group({
			username: [""],
			email: ["", {
				validators: [Validators.required, Validators.email],
			}],
			password: ["", {
				validators: [Validators.required],
			}],
			image: [""],
		});
	}

	public login(): void {
		if (this.loginForm.valid) {
			console.log(this.loginForm.value);
		} else {
			console.log("Invalid form");
		}
	}

	get email() {
		return this.loginForm.controls["email"];
	}
	get password() {
		return this.loginForm.controls["password"];
	}
	get username() {
		return this.loginForm.controls["username"];
	}
	get image() {
		return this.loginForm.controls["image"];
	}

	passwordVisible = false;
	inputType = "password";
	revealPassword() {
		this.passwordVisible = !this.passwordVisible;
		this.inputType = this.passwordVisible ? "text" : "password";
	}
}
