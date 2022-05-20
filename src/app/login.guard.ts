import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        let isLogin: boolean;
        // 判断用户是否登录
        const token = sessionStorage.getItem('token');
        if (!token) {
            isLogin = false;
            // 未登录跳转到登录界面
            this.router.navigateByUrl('/login');
        } else {
            isLogin = true;
        }
        return isLogin;
    }
}
