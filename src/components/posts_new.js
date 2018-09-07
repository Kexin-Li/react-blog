import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost } from '../actions/index';

class PostsNew extends Component {
  renderField(field) {
    const { touched, error } = field.meta;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          { touched ? error : '' }
        </div>
      </div>
    );
  }

  submitHandler(values) {
    this.props.createPost(values, () => {
      // when create a post successfully, redirect to the home page
      this.props.history.push('/');
    });
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.submitHandler.bind(this))}>
          <Field 
            label="Title"
            name="title" 
            // it's a reference!!!
            component={this.renderField}
          />
          <Field 
            label="Categories"
            name="categories" 
            component={this.renderField}
          />
          <Field 
            label="Content"
            name="content" 
            component={this.renderField}
          />
          <button className="btn btn-primary">Submit</button>
          <Link className="btn btn-danger" to="/">Cancel</Link>
        </form>
      </div>
    );
  }
};

function validate(values) {
  // console.log(values) -> {title: 'asa', categories: 'ads', content: 'dasd'}
  const errors = {};

  // validate the inputs from 'values'
  if (!values.title) {
    errors.title = 'Enter a Title!';
  }
  if (!values.categories) {
    errors.categories = 'Enter some Categories!';
  }
  if (!values.content) {
    errors.content = 'Enter some Content!';
  }

  // if errors is empty, the form is fine to submit
  // if error has any properties, redux form assumes form is invalid
  return errors;
}

let createReduxForm = reduxForm({
  validate,
  form: 'postsNewForm' 
});

export default connect(null, { createPost })(createReduxForm(PostsNew));
