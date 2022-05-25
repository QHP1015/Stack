import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    validateForm!: FormGroup;
    isVisible = false;
    passwordForm!: FormGroup;

    submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
            if (this.validateForm.controls[i].invalid) {
                return;
            }
        }
        console.log(123);
        this.loginService.login(this.validateForm.value.name, this.validateForm.value.password)
            .subscribe(result => this.loginSuccess(result));
    }

    loginSuccess(result: any) {
        if (result.status === 0) {
            console.log('result: ' + JSON.stringify(result));
            const data = result.data;
            const token = data.token;
            const name = data.name;
            const id = data.id;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('name', name);
            sessionStorage.setItem('id', id);
            this.router.navigate(['/home/index']);
        } else {
            alert("登录失败,请输入正确的账密")
        }
    }

    showModal(): void {
        this.isVisible = true;
    }

    submitPasswordForm(): void {
        for (const i in this.passwordForm.controls) {
            this.passwordForm.controls[i].markAsDirty();
            this.passwordForm.controls[i].updateValueAndValidity();
            if (this.passwordForm.controls[i].invalid) {
                return;
            }
        }
        this.userService.modifyPassword(this.passwordForm.value.name, this.passwordForm.value.email).subscribe(result => this.ResetSuccess(result.status))
        console.log(123)
    }

    ResetSuccess(status: number): void {
        if (status === 0)
            alert("重置成功")
    }

    handleOk(): void {
        console.log('Button ok clicked!');
        this.submitPasswordForm();
        this.isVisible = false;
    }

    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
    }

    constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, private userService: UserService) {
    }

    ngOnInit(): void {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('id');
        this.validateForm = this.fb.group({
            name: ['', [Validators.required]],
            password: ['', [Validators.required]],
            remember: [true]
        });
        this.passwordForm = this.fb.group({
            name: [''],
            email: [''],
        });
    }
}
