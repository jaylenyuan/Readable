import { combineReducers } from 'redux';
import {
    INIT_CAT, INIT_POST, INIT_COM, ADD_POST, VOTE_POST
} from '../Actions';
import Category from '../Components/Category';
const initialState = {
    categories: [],
    posts: {},
    comments: {}, //postID -> []
}


function CategoryReducer(categories=[], action) {
    switch (action.type) {
        case INIT_CAT:
            const obj_cat = action.categories.reduce((obj, cur) => {
                obj.push(cur.name)
                return obj
            }, [])
            return obj_cat
        default:
            return categories
    }
}
function PostReducer(posts={}, action) {
    switch (action.type) {
        case INIT_POST:
            const obj_post = action.posts.reduce((obj, cur) => {
                obj[cur.id] = cur
                return obj
            }, {})
            return obj_post
        case ADD_POST:
            return Object.assign({}, posts, {[action.post.id]: action.post})
        case VOTE_POST:
            return Object.assign({}, posts, {[action.post.id]: action.post})
        default:
            return posts
    }
}
function CommentReducer(comments={}, action) {
    switch (action.type) {
        case INIT_COM:
            const com = Object.assign({}, comments)
            com[action.postID] = action.comments
            return com
        default:
            return comments
    }
}
export default combineReducers({
    categories: CategoryReducer,
    posts: PostReducer,
    comments: CommentReducer
})