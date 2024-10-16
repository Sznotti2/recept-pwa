import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card.component';
import { RecipeCard2Component } from '../../shared/components/recipe-card2/recipe-card2.component';
import { RecipeCard3Component } from '../../shared/components/recipe-card3/recipe-card3.component';
import { BlogCard2Component } from '../../shared/components/blog-card2/blog-card2.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeCardComponent, RecipeCard2Component, RecipeCard3Component, BlogCardComponent, BlogCard2Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
