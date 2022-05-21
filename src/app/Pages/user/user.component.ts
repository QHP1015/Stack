import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";


interface User {
    id: string;
    name: string;
    email?: string;
    enabled: boolean;
    domain_id: string;
}

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.less']
})

export class UserComponent implements OnInit {
    users:User[] = [];

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.searchData();
    }

    searchData(reset: boolean = false): void {
        this.userService.getUsers().subscribe(result => this.onSuccess(result));
    }

    onSuccess(result: any) {
        console.log('result: ' + JSON.stringify(result));
        const data = result.data;
        this.users = data;
    }

    delete(id: string): void {
        this.userService.deleteUser(id).subscribe(result => this.searchData());
    }

}
