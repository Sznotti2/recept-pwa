import { Component, inject } from '@angular/core';
import { RecipeFirebaseService } from '../../core/services/recipe-firebase.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// https://dontpaniclabs.com/blog/post/2022/01/05/how-to-use-angular-formarrays-within-formgroups-in-reactive-forms/

@Component({
	selector: 'app-recipie-editor',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './recipie-editor.component.html',
	styleUrl: './recipie-editor.component.scss'
})
export class RecipieEditorComponent {
	recipeFirebaseService = inject(RecipeFirebaseService);
	recipeEditForm = this.formBuilder.group({
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

	constructor(private formBuilder: FormBuilder) {
		this.addCategory();
		this.addInstruction();
		this.addInstructionItem(0);
		this.addIngredient();
		this.addIngredientItem(0);
	}

	saveRecipe() {
		console.log(this.recipeEditForm.value);
	}

	// A FormArray getter metódusa a sablonhoz való könnyebb hozzáféréshez
	get categories(): FormArray {
		return this.recipeEditForm.get('categories') as FormArray;
	}
	addCategory() {
		const categoryGroup = this.formBuilder.group({
			name: [""]
		});
		this.categories.push(categoryGroup);
	}
	removeCategory(index: number) {
		this.categories.removeAt(index);
	}

	// handleKeyPress(event: KeyboardEvent) {
	// 	if (event.key === "Enter") {
	// 		event.preventDefault();
	// 		this.addCategory();
	// 	}
	// }

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
	addIngredientItem(ingredientIndex: number): void {
		const ingredientList = this.ingredients.at(ingredientIndex).get('ingredientList') as FormArray;
		ingredientList.push(this.formBuilder.control(""));
	}
	removeIngredientItem(ingredientIndex: number, itemIndex: number): void {
		const ingredientList = this.ingredients.at(ingredientIndex).get('ingredientList') as FormArray;
		ingredientList.removeAt(itemIndex);
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
	}
	addInstructionItem(instructionIndex: number): void {
		const instructionImages = this.instructions.at(instructionIndex).get('images') as FormArray;
		instructionImages.push(this.formBuilder.control(""));
	}
	removeInstructionItem(instructionIndex: number, itemIndex: number): void {
		const instructionImages = this.instructions.at(instructionIndex).get('images') as FormArray;
		instructionImages.removeAt(itemIndex);
	}
}
