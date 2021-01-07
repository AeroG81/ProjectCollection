import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
/*import { POSTS } from '../mock-posts';*/
import { Post } from "../post";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService{
    constructor(private _http:HttpClient){

    }

    getPost(){
        return this._http.get('https://jsonplaceholder.typicode.com/posts?_limit=10').pipe(map(res => res));
    }

    addPost(post:any){
        var headers = new HttpHeaders();
        headers.append('Content-type','application/json');
        return this._http.post('https://jsonplaceholder.typicode.com/posts',post,{headers:headers}).pipe(map(res=>res));
    }
}