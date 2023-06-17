import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from './Core/Services/post.service';
import { Post } from './Core/Interfaces/post';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  list$!: Observable<Post[]>;

  formInput!: FormGroup;

  formUpdate!: FormGroup;

  editor: boolean = false;

  selectedNoteId!: number;

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // $ Old way
    //this.list$ = this.todoService.fetchAll();

    //this.list$ = this.postService.getAll();

    this.list$ = this.postService.entities$;

    this.formInput = new FormGroup({
      title: new FormControl(''),
      input: new FormControl(''),
    })

    this.formUpdate = new FormGroup({
      titleupdate: new FormControl(''),
      noteupdate: new FormControl(''),
    })
  
  }

  onAddPost() {
    const post: Post = {
      id: Math.random(),
      title: this.formInput.value.title,
      note: this.formInput.value.input
    }
    this.postService.add(post);
    this.formInput.reset();
  }

  deletePost(id : number) {
    this.postService.delete(id);
  }

  toggleEditor(id: number) {
    this.editor = !this.editor;
    this.selectedNoteId = id;
  }

  updatePost() {
    const fullNote = {
      id: this.selectedNoteId,
      title: this.formUpdate.value.titleupdate,
      note: this.formUpdate.value.noteupdate
    }
    this.postService.update(fullNote);
    this.editor = !this.editor;
  }

}
