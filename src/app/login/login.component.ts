import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    validateForm!: FormGroup;

    submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
            if (this.validateForm.controls[i].invalid) {
                return;
            }
        }
        console.log(123);
        this.loginService.login(this.validateForm.value.username, this.validateForm.value.password)
            .subscribe(result => this.loginSuccess(result));
    }

    loginSuccess(result: any) {
        console.log('result: ' + JSON.stringify(result));
        const data = result.data;
        const token = data.token;
        const username = data.username
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', username);
        this.router.navigate(['/home/index']);
    }

    constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
    }

    ngOnInit(): void {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        this.validateForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            remember: [true]
        });
    }
}
