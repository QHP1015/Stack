import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {IndexComponent} from "./Pages/index/index.component";
// import * as path from "path";


const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/home'},
    {
        path: 'home', component: HomeComponent, children: [
            {path: 'index', component: IndexComponent}]
    },
    // { path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
