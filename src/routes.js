import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostNew from './components/post_new';

// routing map - "hey for this url show this component"
// IndexRoute -> will be shown whenever:
//      the url mathces the path defined by the parent but not his children
// in our example - whenever the url is: "/" ->
//      show the App component and PostIndex component

// react router appears as going to different pages,
// but actually swapping the content shown on the page

export default (
    // path="/" is the root of the webside
    // google.com/ => renders the "App" 
    <Route path="/" component={App} >
        <IndexRoute component={PostsIndex} />
    <Route path="posts/new" component={PostNew} />
    </Route>
);