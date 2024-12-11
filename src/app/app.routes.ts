import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RecipeViewComponent } from './shared/components/recipe-view/recipe-view.component';
import { SearchComponent } from './features/search/search.component';
import { BlogComponent } from './features/blog/blog.component';
import { MyRecipiesComponent } from './features/my-recipies/my-recipies.component';
import { RecipieEditorComponent } from './features/recipie-editor/recipie-editor.component';
import { authGuard } from './core/guards/auth.guard';

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
		path: "settings",
        loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
        children: [
            {
                path: 'profile',
                loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
            },
            {
                path: 'my-blogs',
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
				canActivate: [authGuard]
            },
            {
                path: 'my-recipes',
				component: MyRecipiesComponent,
				canActivate: [authGuard]
                // loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
			{
				path: 'recipe-editor',
				component: RecipieEditorComponent,
				canActivate: [authGuard]
				// loadComponent: () => import('./features/recipie-editor/recipie-editor.component').then(m => m.RecipieEditorComponent)
			},
        ]
	},
    {
        path: 'about',
        loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'blog',
        component: BlogComponent,
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
