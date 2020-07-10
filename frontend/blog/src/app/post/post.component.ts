import { PostService } from './../post.service';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private dataService: DataService, private postService: PostService) { }

  private authenticated: any;
  public newPost: any;
  public posts= [];
  public displayedColumns = ['user', 'created', 'desc', 'columnedit' ]
  private options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  public dataSource;

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(data=>{
        this.posts = data;
        for (let post of this.posts) {
          post.created = new Date(post.created).toLocaleDateString("en-US", this.options);
          //console.log(post);
        }
        this.dataSource = new MatTableDataSource(this.posts);
      });
    //this.token = this.dataService.getToken();
  }

  createPost() {
    this.postService.create(this.newPost).subscribe(
       data => {
         // refresh the list
         this.postService.getAllPosts().subscribe(data=>{
          this.posts = data;
          for (let post of this.posts) {
            post.created = new Date(post.created).toLocaleDateString("en-US", this.options);
          }
          this.dataSource = new MatTableDataSource(this.posts);
        });
         return true;
       },
       error => {
         console.error('Error saving!');
         return throwError(error);
       }
    );
  }

  delete(elm: any) {
    this.postService.checkUserPermissionsForEditing().subscribe(
      res => {
        this.authenticated = res;
        if(!this.authenticated){
          alert("You are not authenticated for editing any post.");
        }else{
          this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
        }
      }
    );
  }
}
