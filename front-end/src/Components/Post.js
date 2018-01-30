import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PostAPI from '../utils/PostsAPI'
import { initStoreComments, votePost } from '../Actions';
import Modal from 'react-modal'


class Post extends Component  {
    state = {
        addComment: false
    }
    handleVote = (event) => {
        switch (event.target.value) {
            case "like":
                this.props.dispatch(votePost(this.props.id, "upVote"))
                break;
            case "dislike":
                this.props.dispatch(votePost(this.props.id, "downVote"))
                break;
        }
    }
    openAddCommentModal = () => {
        this.setState({
            addComment: true
        })
    }
    render() {
        const content = this.props.post
        const time = new Date(content.timestamp).toISOString()
        const coms = this.props.comments

        return (
            <div className='post'>
                <p>Title: {content.title}</p>
                <p>Content: {content.body}</p>
                <p>Author: {content.author}</p>
                <p>Votes: {content.voteScore}</p>
                <button onClick={this.handleVote} value="like">like</button>
                <button onClick={this.handleVote} value="dislike">dislike</button>
                <p>Published Time: {time}</p>
                <div className='comment-container'>
                    {coms && coms.map(c => (
                        <div key={c.id}>
                            <p>{c.body}</p>
                        </div>
                    ))}
                </div>
                <button onClick={this.props.close}>close</button>
                <button onClick={this.openAddCommentModal}>comment</button>
                <Modal 
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={this.state.addComment}
                    // onRequestClose={}
                    contentLabel='Modal'
                    ariaHideApp={false}
                >
                </Modal>
            </div>
        )
    }
}
function mapStateToProps(prestate, ownProps) {
    return  {
        post: prestate.posts[ownProps.id],
        comments: prestate.comments[ownProps.id]
    }
}
export default connect(mapStateToProps)(Post)