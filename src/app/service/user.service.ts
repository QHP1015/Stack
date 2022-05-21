import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userUrl = 'http://192.168.229.128:8080/user/';

    getUsers(): Observable<any> {
        return this.http.get(`${this.userUrl}getAll`,);
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
