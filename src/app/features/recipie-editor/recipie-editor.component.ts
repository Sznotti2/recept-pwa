import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RecipeFirebaseService } from '../../core/services/recipe-firebase.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// https://dontpaniclabs.com/blog/post/2022/01/05/how-to-use-angular-formarrays-within-formgroups-in-reactive-forms/
// https://www.tektutorialshub.com/angular/nested-formarray-example-add-form-fields-dynamically/

// ingredients interface
interface Ingredient {
	title: string;
	ingredientList: string[];
}
@Component({
	selector: 'app-recipie-editor',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, CommonModule, NgFor],
	templateUrl: './recipie-editor.component.html',
	styleUrl: './recipie-editor.component.scss'
})
export class RecipieEditorComponent implements OnInit {
	recipeFirebaseService = inject(RecipeFirebaseService);
	recipeEditForm!: FormGroup;
	recipeImgSrc = "";
	instructionImgSrc: Map<string, string> = new Map();

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.recipeEditForm = this.formBuilder.group({
			name: [""],
			description: [""],
			image: [""],
			categories: this.formBuilder.array([]),
			timeToMake: [0],
			servings: [0],
			isFavorite: [false],
			ingredients: this.formBuilder.array([]),
			instructions: this.formBuilder.array([])
		});

		this.addCategory();
		this.addInstruction();
		this.addImageInput(0);
		this.addIngredient();
		this.addIngredientItem(0);
	}

	saveRecipe() {
		const recipe = this.recipeEditForm.value;
		this.recipeFirebaseService.addRecipe(
			recipe.name,
			recipe.description,
			this.recipeEditForm.get('image')?.value,
			recipe.categories,
			recipe.timeToMake,
			recipe.servings,
			recipe.ingredients,
			recipe.instructions
		);
		console.log(recipe);

	}

	onRecipeImageSelected(event: any) {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
	
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					this.recipeImgSrc = reader.result as string;
				}
			};
			reader.readAsDataURL(file);
		}
	};

	onInstructionImageSelected(event: any, instructionIndex: number, imageIndex: number) {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
	
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					// const key = `${instructionIndex}-${imageIndex}`;
					const value = reader.result as string;
					this.instructionImgSrc.set(instructionIndex + "-" + imageIndex, value);
				}
			};
			reader.readAsDataURL(file);
		}
	}

	// A FormArray getter metódusa a sablonhoz való könnyebb hozzáféréshez
	get categories(): FormArray {
		return this.recipeEditForm.get('categories') as FormArray;
	}
	addCategory() {
		this.categories.push(this.formBuilder.control(""));
	}
	removeCategory(index: number) {
		this.categories.removeAt(index);
	}

	get ingredients(): FormArray {
		return this.recipeEditForm.get('ingredients') as FormArray;
	}
	addIngredient(): void {
		const ingredientGroup = this.formBuilder.group({
			title: [""],
			ingredientList: this.formBuilder.array([])
		});
		this.ingredients.push(ingredientGroup);
	}
	removeIngredient(index: number): void {
		this.ingredients.removeAt(index);
	}
	getIngredientListAt(index: number): FormArray {
		return this.ingredients.at(index).get("ingredientList") as FormArray
	}
	addIngredientItem(index: number): void {
		this.getIngredientListAt(index).push(this.formBuilder.control(""));
	}
	removeIngredientItem(ingredientIndex: number, itemIndex: number): void {
		this.getIngredientListAt(ingredientIndex).removeAt(itemIndex);
	}

	get instructions(): FormArray {
		return this.recipeEditForm.get("instructions") as FormArray;
	}
	addInstruction(): void {
		const instructionGroup = this.formBuilder.group({
			text: ["", Validators.required],
			images: this.formBuilder.array([])
		});
		this.instructions.push(instructionGroup);
	}
	removeInstruction(index: number): void {
		this.instructions.removeAt(index);
		// removing all of the images that are assciated with the instruction
		this.instructionImgSrc.forEach((value, key) => {
			if (key.includes(index.toString())) {
				this.instructionImgSrc.delete(key);
			}
		});
		// TODO: shift the indexes of the images below the removed instruction
	}
	getImagesAt(index: number): FormArray {
		return this.instructions.at(index).get("images") as FormArray
	}
	addImageInput(instructionIndex: number): void {
		this.getImagesAt(instructionIndex).push(this.formBuilder.control(""));
	}
	removeImageInput(instructionIndex: number, imageIndex: number): void {
		this.getImagesAt(instructionIndex).removeAt(imageIndex);
		// removing the image from the map
		this.instructionImgSrc.delete(instructionIndex + "-" + imageIndex);
	}
}
