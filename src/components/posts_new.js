import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { createPost } from '../actions/index';

class PostsNew extends Component {

    static contextTypes = { router: PropTypes.object };

    onSubmit(props) {
            this.props.createPost(props)
                .then( () => {
                    this.context.router.push('/');
                });
        }
    
    render() {

        const { fields: { title, categories, content}, handleSubmit } = this.props;
        
        return (
            <div> 
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h3>Create a new post </h3>
                    <div className="`form-group ${title.touched && title.invalid ? 'has-danger' : '' }`">
                        <label>Title</label>
                        <input type="text" className="form-control" {...title} />
                        <div className="text-help">
                            {title.touched ? title.error : ""}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Categories</label>
                        <input type="text" className="form-control" {...categories} />
                        <div className="text-help">
                            {categories.touched ? categories.error : ""}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea className="form-control" {...content} />
                        <div className="text-help">
                            {content.touched ? content.error : ""}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link> 
                </form>    
            </div>

        );
    }
}

//function to validate fields
function validate(values) {
    const errors = {};

    if(!values.title) {
        errors.title = "Please enter a title";
    }

    if(!values.categories) {
        errors.categories = "Please enter a category or categories";
    }

    if(!values.content) {
        errors.content = "Please enter content";
    }

    return errors;
}

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew);