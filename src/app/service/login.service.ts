import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

const httpOptions = {
    // headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private loginUrl = 'http://192.168.229.128:8080/login';

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<string> {
        const options = {username, password};
        return this.http.post<string>(this.loginUrl, options)
            .pipe(
                catchError(this.handleError('login', username))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
