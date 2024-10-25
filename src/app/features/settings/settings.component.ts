import { Component, inject } from '@angular/core';
import { BlogCard2Component } from '../../shared/components/blog-card2/blog-card2.component';
import { BlogService } from '../../core/services/blog.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, BlogCard2Component],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  blogs = inject(BlogService).getAllBlogs();
}
