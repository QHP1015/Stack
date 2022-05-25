import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userUrl = 'http://localhost:8080/user';

    getUsers(): Observable<any> {
        return this.http.get(`${this.userUrl}getAll`,);
    }

    getOne(
        id: string
    ): Observable<any> {
        const params = new HttpParams().append('id', id);
        return this.http.post(`${this.userUrl}getOne`, params);
    }

    deleteUser(
        id: string
    ): Observable<any> {
        const params = new HttpParams().append('id', id);
        return this.http.post(`${this.userUrl}delete`, params);
    }

    modifyUser(
        id: string,
        email: string,
        password: string,
        name: string,
        enabled: string,
        domain_id: string
    ): Observable<any> {
        const options = {name, email, id, password, enabled, domain_id};
        console.log(options);
        return this.http.post(`${this.userUrl}update`, options);
    }

    modifyPassword(
        name: string,
        email: string,
    ): Observable<any> {
        const options = {name, email};
        console.log(options)
        return this.http.post(`${this.userUrl}reset`, options);
    }

    addUser(
        name: string,
        password: string,
        email: string,
    ): Observable<any> {
        const options = {name, password, email};
        return this.http.post(`${this.userUrl}add`, options);
    }

    constructor(private http: HttpClient) {
    }
}
