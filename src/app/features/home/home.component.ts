import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeCardComponent, BlogCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
