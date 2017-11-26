import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions/index';


class PostsIndex extends Component {
    componentWillMount() {
        // componentWillMount is a React lifecycle method, 
        //  https://www.udemy.com/react-redux/learn/v4/t/lecture/4419866
        //  when a method named: componentWillMount is defined, 
        //  react will call this method automatically -
        //  when the component is about to be rendered into the DOM for the first time
        //      it will not be called on subsequent renders
        //  meaning this method is called "once" and here is the best place to "fetch the data from the server"
        console.log("durning componentWillMount");
        this.props.fetchPosts();
        console.log("this.props.posts is: ", this.props.posts);

    }
    renderPosts() {
        console.log("within renderPosts ", this.props.posts);
        return this.props.posts.map((post) => {
            return (
                <li className="list-group-item" key={post.id}>
                    <span className="pull-xs-right">
                        {post.categories}
                    </span>
                    <strong>{post.title}</strong>
                </li>
            );
        });
    }


    render() {
        //Link is "tied" to a anchor tag, meaning it generates <href> tag
        //TODO why the Link is to the "url" and not to PostNew component
        return (
            <div>
                <div className="text-xs-right">
                    <Link to='/posts/new' className="btn btn-primary">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul>
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

// NOTE! we are replacing mapDispatchToProps with: {fetchPosts: fetchPosts} within the connect method,
//  this will still provide access to this.props.fetchPosts() within the component,
//  but without "implementing" mapDispatchToProps method..
//  and we can "condence" it even more with es6 "trick" - same key, same "value" becomes: { fetchPosts }
//
// function mapDispatchToProps(dispatch) {
//     // mapDispatchToProps provides access to: this.props.fetchPosts() within the component
//     return bindActionCreators({ fetchPosts }, dispatch);
// }

function mapStateToProps(state) {
    console.log("in mapStateToProps, state is: ", state );
    return { posts: state.posts.all }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);