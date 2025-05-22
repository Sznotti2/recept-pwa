import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RecipeViewComponent } from './features/recipe/recipe-view/recipe-view.component';
import { SearchComponent } from './features/search/search.component';
import { RecipieEditorComponent } from './features/recipe/recipie-editor/recipie-editor.component';
import { authGuard } from './core/guards/auth.guard';
import { MyRecipiesComponent } from './features/recipe/my-recipies/my-recipies.component';
import { BlogEditorComponent } from './features/blog/blog-editor/blog-editor.component';
import { BlogsPageComponent } from './features/blog/blogs-page/blogs-page.component';
import { BlogViewComponent } from './features/blog/blog-view/blog-view.component';
import { MyBlogsComponent } from './features/blog/my-blogs/my-blogs.component';

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
                // loadComponent: () => import('./features/my-blogs/my-blogs.component').then(m => m.MyBlogsComponent),
                component: MyBlogsComponent,
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
            {
                path: 'blog-editor',
                component: BlogEditorComponent,
                canActivate: [authGuard]
            },
            {
                path: 'blog-editor/:slug',
                component: BlogEditorComponent,
                canActivate: [authGuard]
            }
        ]
    },
    {
        path: 'about',
        loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'blog',
        component: BlogsPageComponent,
    },
    {
        path: 'blog/:slug',
        component: BlogViewComponent,
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
