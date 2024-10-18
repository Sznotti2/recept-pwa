import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RecipeViewComponent } from './shared/components/recipe-view/recipe-view.component';
import { SearchComponent } from './features/search/search.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: "search/:id",
        component: RecipeViewComponent,
    },
	{
		path: "search",
		component: SearchComponent
	},
    {
        path: 'about',
        loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'blog',
        loadComponent: () => import('./features/blog/blog.component').then(m => m.BlogComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
