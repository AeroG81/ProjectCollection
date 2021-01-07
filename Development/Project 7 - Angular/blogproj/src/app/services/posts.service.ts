import { Injectable } from '@angular/core';
import { POSTS } from '../mock-posts';
import { Post } from "../post";

@Injectable()
export class PostService{
    getPost():Promise<Post[]>{
        return Promise.resolve(POSTS);
    }
    addPost(post:any){
        POSTS.push(post);
    }
}