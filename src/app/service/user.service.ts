import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userUrl = 'http://144.168.59.208:3000/mock/11/';

    getUsers(): Observable<any> {
        return this.http.get(`${this.userUrl}getAll`,);
    }

    getOne(
        id:string
    ):Observable<any> {
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
        originalPassword: string,
        password: string
    ): Observable<any> {
        const options = {id, originalPassword, password};
        console.log(options)
        return this.http.post(`${this.userUrl}modify`, options);
    }

    addUser(
        username: string,
        password: string
    ): Observable<any> {
        const options = {username, password};
        return this.http.post(`${this.userUrl}add`, options);
    }

    constructor(private http: HttpClient) {
    }
}
