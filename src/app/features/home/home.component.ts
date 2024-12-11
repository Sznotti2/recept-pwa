import { Component, inject } from '@angular/core';
import { Recipe } from '../../core/interfaces/recipe';
import { RecipeService } from '../../core/services/recipe.service';
import { Blog } from '../../core/interfaces/blog';
import { BlogService } from '../../core/services/blog.service';
import { BlogListComponent } from '../../shared/components/blog-list/blog-list.component';
import { RecipeListComponent } from '../../shared/components/recipe-list/recipe-list.component';
import { map, Observable } from 'rxjs';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [RecipeListComponent, BlogListComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	recipeList: Observable<Recipe[]>;
	recipeService = inject(RecipeService);

	blogList: Blog[] = [];
	blogService = inject(BlogService);

	constructor() {
		this.recipeList = this.recipeService.getRecipes().pipe(
			map(recipes => recipes.slice(0, 8))
		);
		this.blogList = this.blogService.getAllBlogs().slice(0, 6);
	}
}
