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
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.less']
})
export class PersonComponent implements OnInit {
    user: User={
        id: '',
        name: '',
        email: '',
        enabled: true,
        domain_id: ''
    }
    id = sessionStorage.getItem('id')

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.searchData();
    }

    searchData(reset: boolean = false): void {
        this.userService.getOne('id').subscribe(result => this.onSuccess(result));
    }

    onSuccess(result: any) {
        console.log('result: ' + JSON.stringify(result));
        const data = result.data[0];
        this.user = data;
        console.log(this.user)
    }
}
