import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  EntityDataModule,
  EntityDataService,
} from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { PostsDataService } from './Core/Services/posts-data.service';
import { RouterModule, Routes } from '@angular/router';
import { PostsResolver } from './Shared/Resolvers/posts.resolver';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: AppComponent, resolve: {posts: PostsResolver}}
]
@NgModule({
  declarations: [AppComponent],
  imports: [
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PostsDataService, PostsResolver],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    entityDataService: EntityDataService,
    PostsDataService: PostsDataService
  ) {
    entityDataService.registerService('Post', PostsDataService);
  }
}
