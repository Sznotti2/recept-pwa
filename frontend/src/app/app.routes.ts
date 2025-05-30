import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { titleResolver } from './resolver';

export const routes: Routes = [
	{
		path: '',
		title: 'Recept PWA',
		component: HomeComponent,
		pathMatch: 'full'
	},
	{
		path: "search",
		title: 'Keresés',
		loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent)
	},
	{
		path: "search/:title",
		title: titleResolver,
		loadComponent: () => import('./features/recipe/recipe-view/recipe-view.component').then(m => m.RecipeViewComponent)
	},
	{
		path: "settings",
		canActivate: [authGuard],
		loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
		children: [
			{
				path: 'profile',
				title: 'Profil',
				loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
			},
			{
				path: 'my-recipes',
				title: 'Receptjeim',
				loadComponent: () => import('./features/recipe/my-recipies/my-recipies.component').then(m => m.MyRecipiesComponent)
			},
			{
				path: 'dashboard',
				title: 'Dashboard',
				loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
			},
			{
				path: 'recipe-editor',
				title: 'Recept készítése',
				loadComponent: () => import('./features/recipe/recipie-editor/recipie-editor.component').then(m => m.RecipieEditorComponent)
			},
			{
				path: 'my-blogs',
				title: 'Blogjaim',
				loadComponent: () => import('./features/blog/my-blogs/my-blogs.component').then(m => m.MyBlogsComponent)
			},
			{
				path: 'blog-editor',
				title: 'Blog készítése',
				loadComponent: () => import('./features/blog/blog-editor/blog-editor.component').then(m => m.BlogEditorComponent)
			},
			{
				path: 'blog-editor/:slug',
				title: 'Blog szerkesztése',
				loadComponent: () => import('./features/blog/blog-editor/blog-editor.component').then(m => m.BlogEditorComponent)
			}
		]
	},
	{
		path: 'about',
		loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
		title: 'Rólunk'
	},
	{
		path: 'blog',
		title: 'Blogok',
		loadComponent: () => import('./features/blog/blogs-page/blogs-page.component').then(m => m.BlogsPageComponent)
	},
	{
		path: 'blog/:slug',
		title: titleResolver,
		loadComponent: () => import('./features/blog/blog-view/blog-view.component').then(m => m.BlogViewComponent),
	},
	{
		path: 'login',
		title: 'Bejelentkezés',
		loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
	},
	{
		path: 'register',
		title: 'Regisztráció',
		loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
	},
	{
		path: '**',
		redirectTo: ''
	}
];
