import { Component, inject } from '@angular/core';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card.component';
import { RecipeCard2Component } from '../../shared/components/recipe-card2/recipe-card2.component';
import { RecipeCard3Component } from '../../shared/components/recipe-card3/recipe-card3.component';
import { BlogCard2Component } from '../../shared/components/blog-card2/blog-card2.component';
import { Recipe } from '../../core/interfaces/recipe';
import { RecipeService } from '../../core/services/recipe.service';
import { Blog } from '../../core/interfaces/blog';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeCardComponent, RecipeCard2Component, RecipeCard3Component, BlogCardComponent, BlogCard2Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  recipeList: Recipe[] = [];
	recipeService = inject(RecipeService);

  blogList: Blog[] = [];
	blogService = inject(BlogService);

	constructor() {
		this.recipeList = this.recipeService.getAllRecipes().slice(0, 8);
		this.blogList = this.blogService.getAllBlogs().slice(0, 6);
	}
}
