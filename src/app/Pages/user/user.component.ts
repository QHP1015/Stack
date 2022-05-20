import {Component, OnInit} from '@angular/core';


interface Person {
    id: string;
    name: string;
    email: string;
    state: boolean;
    domain: string;
}

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.less']
})

export class UserComponent implements OnInit {


    constructor() {
    }

    ngOnInit(): void {
    }

    listOfData: Person[] = [
        {
            id: '2dd5b88b53e3465ab6da9041bac1a80d',
            name: 'John Brown',
            email: '2439462872@qq.com',
            state: true,
            domain: 'default'
        },
        {
            id: '2',
            name: 'Jim Green',
            email: '2439462872@qq.com',
            state: true,
            domain: 'default'
        },
        {
            id: '3',
            name: 'Joe Black',
            email: '2439462872@qq.com',
            state: true,
            domain: 'default'
        }
    ];
}
