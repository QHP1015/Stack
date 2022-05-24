import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-user-form' && 'nz-demo-notification-with-icon',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {
    title = '新增用户';
    userForm !: FormGroup;

    createNotification(type: string): void {
        type === 'success' ?
            this.notification.create(
                type,
                '添加成功',
                ''
            ) : this.notification.create(
                type,
                '添加失败',
                ''
            )
    }

    submitForm(): void {
        for (const i in this.userForm.controls) {
            this.userForm.controls[i].markAsDirty();
            this.userForm.controls[i].updateValueAndValidity();
            if (this.userForm.controls[i].invalid) {
                return;
            }
        }
        console.log(123)
        this.userService.addUser(this.userForm.value.username, this.userForm.value.password).subscribe(status => this.onSuccess(status))
    }

    onSuccess(statue: number) {
        if (statue)
            this.createNotification('success');
        else
            this.createNotification('error');
    }

    constructor(private fb: FormBuilder, private userService: UserService, private notification: NzNotificationService) {
    }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.email]],
            password: ['', [Validators.required]],
        });
    }
}
