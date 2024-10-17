import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


export const hasOnlyLowercaseLetters = (control: AbstractControl): ValidationErrors | null => {
	return /[A-Z]/.test(control.value) ? null : { hasOnlyLowercaseLetters: true };
}

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, NgClass],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	loginForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private router: Router) {
		this.loginForm = this.formBuilder.group({
			email: ["", {
				validators: [Validators.required, Validators.email],
			}],
			password: ["", {
				validators: [Validators.required],
			}],
		});
	}

	public login(): void {
		if (this.loginForm.valid) {
			console.log(this.loginForm.value);
			this.router.navigateByUrl("/");
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

	passwordVisible = false;
	inputType = "password";
	revealPassword() {
		this.passwordVisible = !this.passwordVisible;
		this.inputType = this.passwordVisible ? "text" : "password";
	}
}
