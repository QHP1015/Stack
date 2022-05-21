import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {IndexComponent} from "./Pages/index/index.component";
import {UserComponent} from "./Pages/user/user.component";
import {LoginGuard} from "./login.guard";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UserFormComponent} from "./Pages/user/user-form/user-form.component";
// import * as path from "path";

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/home/index'},
    {
        path: 'home', component: HomeComponent, canActivate: [LoginGuard], children: [
            {path: 'index', component: IndexComponent},
            {path: 'user', component: UserComponent},
            {path: 'user/addUser', component: UserFormComponent}
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
