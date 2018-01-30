import React, { Component } from 'react';
import * as PostAPI from '../utils/PostsAPI'

class VoteButton extends Component {
 
     
    render () {
        return (
            <div>
                <span>{this.props.voteScore}</span>
                <button onClick={this.props.handleVote} value="like">like</button>
                <button onClick={this.props.handleVote} value="dislike">dislike</button>
            </div>
        )
        
    }
}

export default VoteButton