import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {NzFormTooltipIcon} from 'ng-zorro-antd/form';
import {UserService} from "../service/user.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
    validateForm!: FormGroup;
    captchaTooltipIcon: NzFormTooltipIcon = {
        type: 'info-circle',
        theme: 'twotone'
    };

    submitForm(): void {
        // if (this.validateForm.valid) {
        //     console.log('submit', this.validateForm.value);
        // } else {
        //     Object.values(this.validateForm.controls).forEach(control => {
        //         if (control.invalid) {
        //             control.markAsDirty();
        //             control.updateValueAndValidity({onlySelf: true});
        //         }
        //     });
        // }
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
            if (this.validateForm.controls[i].invalid) {
                return;
            }
        }
        console.log(123);
        this.userService.addUser(this.validateForm.value.username, this.validateForm.value.password)
            .subscribe(result => this.registerSuccess(result));
    }

    registerSuccess(result:any):void{
        if (result.status===0){
            alert('注册成功')
        }
    }

    updateConfirmValidator(): void {
        /** wait for refresh value */
        Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return {required: true};
        } else if (control.value !== this.validateForm.controls.password.value) {
            return {confirm: true, error: true};
        }
        return {};
    };


    constructor(private fb: FormBuilder, private userService: UserService) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
            checkPassword: [null, [Validators.required, this.confirmationValidator]],
            username: [null, [Validators.required]],
        });
    }
}
