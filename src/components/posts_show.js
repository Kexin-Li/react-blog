import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions/index';

class PostsShow extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteHandler() {
    const {id} = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const {post} = this.props;
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link 
          className="btn btn-primary" 
          to="/"
          style={{ margin: '10px 0px' }}
        >
          Back To Index
        </Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteHandler.bind(this)}
          style={{ margin: '10px 0px' }}
        >
          Delete
        </button>
        <div className="list-group" style={{ backgroundColor: '#eee', padding: '20px' }}>
          <h2 style={{ textAlign: 'center' }}>{post.title}</h2>
          <h6 style={{ margin: '20px 0px' }}>Categories: {post.categories}</h6>
          <p>{post.content}</p>
        </div>
      </div>
    );
  }
};

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
