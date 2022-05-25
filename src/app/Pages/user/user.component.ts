import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

interface User {
    id: string;
    name: string;
    email?: string;
    enabled: boolean;
    domain_id: string;
    password?: string;
}

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.less']
})

export class UserComponent implements OnInit {
    users: User[] = [];
    isVisible = false;
    userForm !: FormGroup;
    user = {
        id: '',
        name: '',
        email: '',
        password: '',
        enabled: true,
        domain_id: '',
    };

    constructor(private fb: FormBuilder, private userService: UserService) {
    }

    ngOnInit(): void {
        this.searchData();
    }

    searchData(reset: boolean = false): void {
        this.userService.getUsers().subscribe(result => this.onSuccess(result));
    }

    onSuccess(result: any) {
        if (result.status === 0) {
            console.log('result: ' + JSON.stringify(result));
            const data = result.data;
            this.users = data;
        } else {
            alert('没有权限访问')
        }
    }

    delete(id: string): void {
        this.userService.deleteUser(id).subscribe(result => this.searchData());
    }

    showModal(data: any): void {
        this.isVisible = true;
        this.user = data
        this.userForm = this.fb.group({
            id: [this.user.id, [Validators.required]],
            username: [this.user.name],
            password: ['123456', ],
            email: [this.user.email, ],
            enabled: [this.user.enabled,],
            domain_id: [this.user.domain_id, ],
        });
    }

    submitForm(): void {
        for (const i in this.userForm.controls) {
            this.userForm.controls[i].markAsDirty();
            this.userForm.controls[i].updateValueAndValidity();
            if (this.userForm.controls[i].invalid) {
                return;
            }
        }
        this.userService.modifyUser(this.userForm.value.username, this.userForm.value.email, this.userForm.value.id,
            this.userForm.value.password, this.userForm.value.enabled, this.userForm.value.domain_id,)
            .subscribe(result => this.searchData());
        console.log(123)
    }

    handleOk(): void {
        console.log('Button ok clicked!');
        this.submitForm();
        this.isVisible = false;
    }

    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
    }


}
