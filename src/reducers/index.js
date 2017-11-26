import { combineReducers } from 'redux';
//INFO: import reducer from redux-form and create variable named "formReducer",
//  this is done to avoid any naming conflicts - distinguish formReducer from other reducers named "reducer"
import {reducer as formReducer} from 'redux-form';

import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer, // PostsReducer is the reducer responsible for the !piece of application state! named: "posts"
                      //  meaning that any component, after implementing mapStateToProps redux method, can access the "posts" within application state
  form: formReducer,  // INFO the key must be "form" and not anything else!
});

export default rootReducer;
