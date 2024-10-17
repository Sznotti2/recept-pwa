import { JsonPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export const hasOnlyLowercaseLetters = (control: AbstractControl) : ValidationErrors | null => {
	return /[A-Z]/.test(control.value) ? null : { hasOnlyLowercaseLetters: true };
}

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, JsonPipe, NgClass],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent {
	registerForm: FormGroup;
	constructor(private formBuilder: FormBuilder, private router: Router) {
		this.registerForm = this.formBuilder.group({
			username: ["", {
				validators: [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
			}],
			email: ["", {
				validators: [Validators.required, Validators.email],
			}],
			password: ["", {
				validators: [Validators.required, Validators.minLength(6), Validators.maxLength(32), hasOnlyLowercaseLetters],
			}],
			passwordAgain: ["", {
				validators: [Validators.required],
			}],
			terms: [false, {
				validators: [Validators.requiredTrue],
			}]
		});
	}

	// registerForm: FormGroup;
	// constructor(private formBuilder: FormBuilder) {
	// 	this.registerForm = this.formBuilder.group({
	// 		username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
	// 		email: ["", [Validators.required, Validators.email]],
	// 		password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
	// 		passwordAgain: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
	// 		terms: ["", [Validators.requiredTrue]],
	// 	});
	// }

	public register(): void {
		if (this.registerForm.valid) {
			console.log(this.registerForm.value);
			this.router.navigateByUrl("/");
		} else {
			console.log("Invalid form");
		}
	}

	get username() {
		return this.registerForm.controls["username"];
	}
	get email() {
		return this.registerForm.controls["email"];
	}
	get password() {
		return this.registerForm.controls["password"];
	}
	get passwordAgain() {
		return this.registerForm.controls["passwordAgain"];
	}
	get terms() {
		return this.registerForm.controls["terms"];
	}

	passwordVisible = false;
	inputType = "password";
	revealPassword() {
		this.passwordVisible = !this.passwordVisible;
		this.inputType = this.passwordVisible ? "text" : "password";
	}
}
