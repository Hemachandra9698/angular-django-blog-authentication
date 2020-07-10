import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient,private dataService: DataService) { }

  private allPosts = this.dataService.getBackendDomain() + 'api/posts/';
  private checkUserPermsForEdit = this.dataService.getBackendDomain() + 'permissions/edit';
  public posts: any;
  public errors: any;

  getAllPosts() {
    return this.httpClient.get<[]>(this.allPosts);
  }
 
  getHttpOptions(token:string){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      })
    };
    return httpOptions;
  }

  getUserFromLocalStorage(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
  }

  create(desc: any) {
    //console.log(desc);
    
    //console.log(currentUser);
    let currentUser = this.getUserFromLocalStorage();
    var username = currentUser.username;
    const token = currentUser.token;

    let post = {'desc':desc, 'username':username}

    let httpOptions = this.getHttpOptions(token);
    return this.httpClient.post(this.allPosts, JSON.stringify(post), httpOptions);
  }

  checkUserPermissionsForEditing(){
    let currentUser = this.getUserFromLocalStorage();
    //console.log(currentUser);
    var username = currentUser.username;
    const token = currentUser.token;
    let httpOptions = this.getHttpOptions(token);
    return this.httpClient.post(this.checkUserPermsForEdit, {}, httpOptions);
  }
  
}
