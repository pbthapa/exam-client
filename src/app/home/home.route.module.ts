import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: 'dashboard', component: HomeComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
            { path: 'admin', loadChildren: '../admin/admin.module#AdminModule' }
        ]
    }
]

export const HomeRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);