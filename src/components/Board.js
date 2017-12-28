import React, {Component} from 'react';
import Comment from './Comment';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [
                'Hello world', 'This is another one', 'Bacon'
            ],
        }
    }

    eachComment = (e, i) => {
        return (
            <Comment key={i} index={i} updateComment={this.updateComment} removeComment={this.removeComment}>
                {e}
            </Comment>
        );
    };

    addComment = (text) => {
        let comments = this.state.comments;
        comments.push(text);
        this.setState({comments,});
    };

    removeComment = (i) => {
        let comments = this.state.comments;
        comments.splice(i, 1);
        this.setState({comments,});
    };
    updateComment = (newText, i) => {
        let comments = this.state.comments;
        comments[i] = newText;
        this.setState({comments,});
    };

    render() {
        return (
            <div>
                <button className="button-info create" onClick={this.addComment.bind(null, '')}>Add New</button>
                <div className="board">
                    {this.state.comments.map(this.eachComment)}
                </div>
            </div>
        );
    }
}

export default Board;