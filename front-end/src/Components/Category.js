import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post  from './Post';
import Modal from 'react-modal'
import { getComments, addPost } from '../Actions'
import { Link } from 'react-router-dom';
import * as PostAPI from '../utils/PostsAPI'
import VoteButton from './VoteButton';

class Category extends Component {
    state={
        detailModalOpen: false,
        postToDisplay: '',
        comments_fetched: {},
        orderBy: 'decreasing-by-time',
        adding: false
    }
    openDetailModal = (event) => {
        const id = event.target.value
        if (this.state.comments_fetched[id]) {
            this.setState({
                detailModalOpen: true, 
                postToDisplay: id
            })
            return
        }
        this.props.dispatch(getComments(id))
        this.setState((state) => ({
            detailModalOpen: true, 
            postToDisplay: id,
            comments_fetched: Object.assign({}, state.comments_fetched, {[id]: true})
        }))
    }
    closeDetailModal = () => this.setState(() => ({ detailModalOpen: false }))
    handleSortMethodChange = (val) => this.setState({orderBy: val})

    openAddModal = () => {
        this.setState({
            adding: true
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const uuidv1 = require("uuid/v1")
        const timestamp = Date.now()
        const post = {
            id: uuidv1(),
            timestamp: timestamp,
            title: this.title.value,
            body: this.body.value,
            author: this.author.value,
            category: this.category.value
        }
        this.props.dispatch(addPost(post))
        this.setState({
            adding: false
        })    
    }

    render() {
        const cats = this.props.categories
        const posts = this.props.posts
        switch (this.state.orderBy) {
            case 'decreasing-by-time':
                posts.sort(function(a, b) {
                    return -a.timestamp + b.timestamp
                })
                break
            case 'increasing-by-time':
                posts.sort(function(a, b) {
                    return a.timestamp - b.timestamp
                })
                break
            case 'most-score':
                posts.sort((a, b) =>(
                    b.voteScore - a.voteScore
                ))
                break
        }

        return (
            <div className="post-gallery">  
                <h1>Readable</h1>
                <div className="category-bar">
                    <Link to='/' className="nav-link" key="root">ALL</Link>
                    {cats.length > 0 && cats.map(cat => (
                    <Link to={cat} className="nav-link" key={cat}>{cat.toUpperCase()}</Link>
                    ))}
                </div>
                <div className="sort-method">
                    <select value={this.state.orderBy} onChange={(event) => this.handleSortMethodChange(event.target.value)}>
                        <option value="decreasing-by-time">Latest First</option>
                        <option value="increasing-by-time">Oldest First</option>
                        <option value="most-score">Most Score First</option>
                    </select>
                </div>
                <div className="adding-button">
                    <button onClick={this.openAddModal}>add</button>
                </div>
                <div className="posts-list">
                    {posts.length > 0 && posts.map( post => (
                        <div className="post-container" key={post.id}>
                            <p>{post.title}</p>
                            <button onClick={this.openDetailModal} value={post.id}>detail</button>
                        </div>
                    ))}
                </div>
                
                <Modal 
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={this.state.detailModalOpen}
                    onRequestClose={this.closeDetailModal}
                    contentLabel='Modal'
                    ariaHideApp={false}
                >
                    {this.state.detailModalOpen && <Post id={this.state.postToDisplay} close={this.closeDetailModal}/>}
                </Modal>
                <Modal 
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={this.state.adding}
                    // onRequestClose={}
                    contentLabel='Modal'
                    ariaHideApp={false}
                >
                    <div className="adding-form">
                        <form onSubmit={this.handleSubmit}>
                            <label>title: <input type="text" name="title" ref={(input) => this.title = input} /></label><br />
                            <label>content: <input type="text" name="body" ref={(input) => this.body = input}/></label><br />
                            <label>username: <input type="text" name="author" ref={(input) => this.author = input}/></label><br />
                            <label>categories:
                                <select name="category" ref={input => this.category = input}>
                                    <option value="react">react</option>
                                    <option value="redux">redux</option>
                                    <option value="udacity">udacity</option>
                                </select>
                            </label>
                            <input type="submit" value="Submit" />
                            <button onClick={() => this.setState({adding: false})}>cancel</button>
                        </form>
                        
                    </div>
                </Modal>

            </div>    
        )
    }
}
function mapStateToProps(state, ownProps) {
    const posts = []
    for (let [k, v] of Object.entries(state.posts)) {
        if (ownProps.display === "root") {
            posts.push(v)
        } else if (ownProps.display === v.category) {
            posts.push(v)
        }
    }
    return {
        categories: state.categories,
        posts: posts
    }
}

export default connect(mapStateToProps)(Category)