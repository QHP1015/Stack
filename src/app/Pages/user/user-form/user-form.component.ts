import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {
    title = '新增用户';
    userForm !: FormGroup;

    submitForm(): void {
        for (const i in this.userForm.controls) {
            this.userForm.controls[i].markAsDirty();
            this.userForm.controls[i].updateValueAndValidity();
            if (this.userForm.controls[i].invalid) {
                return;
            }
        }
        this.userService.addUser(this.userForm.controls.username.value, this.userForm.controls.password.value,)
    }

    constructor(private fb: FormBuilder, private userService: UserService,) {
    }

    updateConfirmValidator(): void {
        /** wait for refresh value */
        Promise.resolve().then(() => this.userForm.controls.checkPassword.updateValueAndValidity());
    }

    ngOnInit(): void {
    }

}
