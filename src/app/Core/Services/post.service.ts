import { EntityAction, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Post } from '../Interfaces/post';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class PostService extends EntityCollectionServiceBase<Post> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Post', serviceElementsFactory);
    }
}