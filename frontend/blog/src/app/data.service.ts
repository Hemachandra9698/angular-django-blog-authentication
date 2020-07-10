import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private DJANGO_SERVER = "http://localhost:8000/";
  private httpOptions: any;
  public errors: any = [];
  public token: string;
  public token_expires: Date;
  public username: string;
  public full_token;

  constructor(private router: Router, private httpClient: HttpClient, private _cookieService: CookieService) {
    let csrf = this._cookieService.get("csrftoken");
    if (typeof(csrf) === 'undefined') {
      csrf = '';
    }
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic my-auth-token',
        'X-CSRFToken': csrf
      })
    };
   }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  private navigateToPost(){
    this.router.navigate(["post"]);
  }

  public getBackendDomain(){
    return this.DJANGO_SERVER;
  }

  public updateData(token) {
    this.token = token;
    this.errors = [];
 
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }

  public logincall(user: { username: string; password: string; email: string; }){
    this.httpClient.post(this.DJANGO_SERVER + "api/token/", JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.full_token = data['token'];
        this.updateData(data['token']);
        let token_data =  {
        'token': this.token,
        'username':this.username,
        'token_expy':this.token_expires
      };
        localStorage.setItem('currentUser', JSON.stringify(token_data));
        //console.log(token_data);
        if(token_data != null){
          this.navigateToPost();
        }  
      },
      err => {
        this.errors = err['error'];
        return throwError(err['error']);
      }
    );
  }

  public getToken(){
    return this.token;
  }

  public refreshToken() {
    this.httpClient.post('/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

}
