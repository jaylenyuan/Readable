import * as PostAPI from './utils/PostsAPI';
import { initStoreCategories, initStorePosts } from './Actions/index';

export function config(store) {
    PostAPI.getAllCategories().then(categories => store.dispatch(initStoreCategories(categories)))
    PostAPI.getAllPosts().then(posts => store.dispatch(initStorePosts(posts)))       
}