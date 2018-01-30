import * as PostAPI from '../utils/PostsAPI';
export const INIT_CAT = 'INIT_CAT'
export const INIT_POST = 'INIT_POST'
export const INIT_COM = 'INIT_COM'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export function initStoreCategories(categories) {
    return {
        type: INIT_CAT,
        categories
    }
}

export function initStorePosts(posts) {
    return {
        type: INIT_POST,
        posts
    }
}

export function initStoreComments(postID, comments) {
    return {
        type: INIT_COM,
        postID,
        comments
    }
}

export function addPostToStore(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function updateVoteOfPost(post) {
   
    return {
        type: VOTE_POST,
        post
    }
}



export function getComments(id) {
    return function (dispatch) {
        PostAPI.getCommentsFrom(id)
            .then(comments => dispatch(initStoreComments(id, comments)))
    }       
}

export function addPost(post) {
    return function (dispatch) {
        PostAPI.addPost(post)
            .then(res => dispatch(addPostToStore(Object.assign({}, post, res))))
    }
}

export function votePost(id, vote) {
    return function (dispatch) {
        PostAPI.votePost(id, vote)
            .then(res => dispatch(updateVoteOfPost(res)))
    }

}
