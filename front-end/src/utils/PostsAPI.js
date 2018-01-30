const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())

export const getPostsFrom = (cat) => 
    fetch(`${api}/category/${cat}`, { headers })
        .then(res => res.json())


export const getCommentsFrom = (postID) => 
    fetch(`${api}/posts/${postID}/comments`, { headers })
        .then(res => res.json())

export const addPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({[post.id]: post})    
    }).then(res => res.json())

export const votePost =  (id, vote) => 
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option: vote})
    }).then(res => res.json())
