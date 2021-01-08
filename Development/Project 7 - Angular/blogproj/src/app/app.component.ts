import { Component } from '@angular/core';
import { PostService } from './services/posts.service';
import { Post } from './post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ PostService ]
})
export class AppComponent {
  title = 'blogproj';
  posts:Post[];
  ttl: string;
  body: string;

  constructor(private _postService:PostService){
    this._postService.getPost().subscribe((posts:any) => {
      this.posts = posts;
    });
  }

  addPost(){
    var newPost = {
      id: this.posts[this.posts.length-1].id+1,
      title: this.ttl,
      body: this.body
    }
    this._postService.addPost(newPost).subscribe((post:any) => {
      console.log('Subscribed');
      this.posts.push(post);
    });
    return false;
  }
}
