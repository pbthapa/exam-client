import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', loadChildren: './home/home.module#HomeModule' }
        ])
    ],
    exports: [RouterModule]
   
})
export class AppRoutingModule { 
    constructor(private router: Router) {
        this.router.errorHandler = (error: any) => {
            console.log(error);
            //this.router.navigate(['404']); // or redirect to default route
        }
      }
}