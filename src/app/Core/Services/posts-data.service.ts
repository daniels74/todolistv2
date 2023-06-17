import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Post } from '../Interfaces/post';
import { Observable, map, pipe } from 'rxjs';
import { Update } from '@ngrx/entity';

@Injectable()
export class PostsDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): Observable<Post[]> {
    return this.http.get<[]>('http://localhost:3000/NOTES');
  }

  override add(post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:3000/NOTES', post).pipe(
      map((data) => {
        return { ...post };
      })
    );
  }

  override delete(id: number): Observable<any> {
    return this.http.delete<number>(`http://localhost:3000/NOTES/${id}`).pipe(
      map(() => {
        return id;
      })
    );
  }

  override update(note: Update<Post>): Observable<Post> {
    return this.http
      .put<Post>(`http://localhost:3000/NOTES/${note.id}`, {...note.changes})
  }
}
