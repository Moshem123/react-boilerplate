import React, {Component} from 'react';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {editing: false};
    }

    edit = () => {
        this.setState({editing: true});
    };
    remove = () => {
        this.props.removeComment(this.props.index);
    };
    save = () => {
        this.props.updateComment(this.refs.newText.value, this.props.index);
        this.setState({editing: false});
    };

    renderNormal = () => {
        return (
            <div className="commentContainer">
                <div className="commentText">{this.props.children}</div>
                <button onClick={this.edit} className="button-primary">Edit</button>
                <button onClick={this.remove} className="button-danger">Remove</button>
            </div>
        )
    };

    renderForm = () => {
        return (
            <div className="commentContainer">
                <textarea ref="newText" defaultValue={this.props.children} />
                <button onClick={this.save} className="button-success">Save</button>
            </div>
        )
    };

    render() {
        return this.state.editing && this.renderForm() || this.renderNormal();
    }
}

export default Comment;