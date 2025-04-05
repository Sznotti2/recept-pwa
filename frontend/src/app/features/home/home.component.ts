import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Recipe } from '../../core/interfaces/recipe';
import { RecipeService } from '../../core/services/recipe.service';
import { Blog } from '../blog/interfaces/blog';
import { BlogListComponent } from '../blog/blog-list/blog-list.component';
import { RecipeListComponent } from '../../shared/components/recipe-list/recipe-list.component';
import { BlogService } from '../blog/services/blog.service';

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
