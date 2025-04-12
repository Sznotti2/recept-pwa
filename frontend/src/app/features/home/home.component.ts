import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Blog } from '../blog/interfaces/blog';
import { BlogListComponent } from '../blog/blog-list/blog-list.component';
import { BlogService } from '../blog/services/blog.service';
import { Recipe } from '../recipe/interfaces/recipe';
import { RecipeListComponent } from '../recipe/recipe-list/recipe-list.component';
import { RecipeService } from '../recipe/services/recipe.service';

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

	blogList: Observable<Blog[]>;
	blogService = inject(BlogService);

	constructor() {
		this.recipeList = this.recipeService.getRecipes().pipe(
			map(recipes => recipes.slice(0, 8))
		);
		this.blogList = this.blogService.getBlogs().pipe(
			map(blog => blog.slice(0, 6))
		);
	}
}
