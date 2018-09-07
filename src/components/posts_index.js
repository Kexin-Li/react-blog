import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
  componentDidMount() {
    // ajax request
    this.props.fetchPosts();
  }

  renderList() {
    // convert object to array
    return _.map(this.props.posts, (post) => {
      return (
        <li key={post.id} className="list-group-item">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link 
            className="btn btn-primary" 
            to="/posts/new"
            style={{ margin: '10px 0px' }}
          >
            New Post
          </Link>
        </div>
        <ul className="list-group">
          {this.renderList()}
        </ul>
      </div>
    );
  }
};

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
