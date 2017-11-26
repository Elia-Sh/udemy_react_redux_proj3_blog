import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import {Link} from 'react-router';

import { createPost } from '../actions/index';

class PostNew extends Component {
    // getting router object/property from context.
    // whenever PostNew instace is created, 
    // react will see that contextTypes was declared and we want to get access to a "router" property,
    // react will search all parent components and look for "router" peice of context
    // bottom line: provides access to "this.context.router" inside our component
    // try to avoid such methods - ok only when accessing "router" propertly
    static contextTypes = {
        router: PropTypes.object
    };
    onSubmit(props) {
        this.props.createPost(props)
            .then(() => {
                // blog post was successfully created - promise resolved,
                // navigate user using router.push
                this.context.router.push('/');
            });

    }
    render() {
        // get from "props" passed by reduxForm, the variable/handler named "handleSubmit"; reduxForm props + es6
        // const { handleSubmit } = this.props;
        // same as:
        // const handleSubmit = this.props.handleSubmit
        // this handleSubmit function triggers reduxForm validations and blocks the formSubmit if the validations don't pass
        const { fields: { title, categories, content }, handleSubmit } = this.props;
        // and now we get fields 'configuration objects' in addition to handleSubmit from reduxForm,
        // same es6 trick that replaces:
        // const title = this.props.fields.title
        // those configuration objects will be passed to the "input" elements
        // we use 'distructure': {...} for passing the configuration objects
        // this is basically passing the "management" of the field to reduxForm completly,
        // it passes reduxForm event handles like "onBlur", "onFocus", "onChange", etc to the input field, and other properties

        // handleSubmit will be called with the redux action creator to sent the data to the API server
        // the reduxForm can be used as the redux "connect" method, no need wrap the component twice,
        //  once with "connect" methond and the second time with reduxForm.
        // handleSubmit will be called with the content of the form, with the keys as names of the fields and value of the fields

        // {title.error} -> the field named "title" has an error property is the text returned from the validate function
        // similary is {title.touched} is a property applied by redux-form
        // similary is title.invalid, that is used for adding a bootsrap "error css class" to the field:
        //  <div className={`form-group ${title.touched && title.invalid} ? 'has-danger' : ''`}>

        // handleSubmit calls this.onSubmit and passes to it the properties from redux form
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                    <input type='text' className='form-control' {...title} />
                    <div className='text-help'>
                        {title.touched ? title.error : ''}
                    </div>
                </div>
                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type='text' className='form-control' {...categories} />
                    <div className='text-help'>
                        {categories.touched ? categories.error : ''}
                    </div>
                </div>
                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Content</label>
                    <textarea className='form-control' {...content} />
                    <div className='text-help'>
                        {content.touched ? content.error : ''}
                    </div>
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/' className='btn btn-danger'>Cancel</Link>
            </form>
        );
    }
}

// the validate function is called by reduxForm,
// we need to pass it's name within the reduxForm configuration
function validate(values) {
    // values are the values from the form.
    const errors = {};
    // if returned object - errors object in this case,
    // has a key that matches to one of field names passed within the reduxForm configuration
    // the reduxForm will fail the validation and prevent from "submit" to proceed
    if (!values.title) {
        // field named: title, was submitted with no value.
        errors.title = 'Enter a title'
    }
    if (!values.categories) {
        // field named: title, was submitted with no value.
        errors.categories = 'Enter categories'
    }
    if (!values.content) {
        // field named: title, was submitted with no value.
        errors.content = 'Enter some content'
    }
    return errors;

}

// INFO: the connect redux method has 2 arguments - 
//          first: mapStateToProps, second: mapDispatchToProps
//       reduxForm has 3 arguments - 
//          fist "config", second: mapStateToProps, third: mapDispatchToProps
// so generally speaking the export of a redux form looks like:
//  export default reduxForm(<config JS object>, <things we get from props>, <action creators>)(<name of the component>)
// for "shorthand" notation of mapDispatchToProps - 
//  https://gist.github.com/MrLeebo/1b33ecb80f0493324d6b42e4b3b3783e
//  this is skipping the usage of: bindActionCreators/mapDispathToProps


// INFO: we are replacing the regular "export default":
//      export default PostNew;
//  with a wrapper that is similar to the redux "connect" method
//      export default reduxForm(<JS object that describles this specific form configrations>)(<component class name>)
//  and now we access this.props.createPost within the component
export default reduxForm({
    //this is the JS object that supplies configuration for reduxForm
    form: 'PostNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostNew)

// this configuration translated to a record in redux, meaning in the !application state!
// this is updated on every change to the field done by the user - type, etc..
/*
    application state == {
        form: {     // remember this is the special key we defined in reducers/index.js
            PostNewForm: {
                title: '..<values entered by user to title field>..',
                categories: '..<values entered by user to categories field>..',
                contenct: '..<values entered by user to content field>..'
            }
        }
    }
*/


