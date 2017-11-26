import { FETCH_POSTS } from '../actions/index';

// this is the "default" piece of state that the reducer responsible for
//  all -> reflects the list of all the blog posts
//  post -> reflects the indivial posts, the information that needed for showing a single post
// based on: https://www.udemy.com/react-redux/learn/v4/t/lecture/4419862?start=0
//TODO why not split the reducer to 2 reducers - 
//  one reducer for "all posts"
//  and one reducer for "cuurent post"
//why they have to be in the same "piece of state"
const INITIAL_STATE = { all: [], post: null };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POSTS:
            //  TODO why do we include the "previous state" in the newly returned state?
            //      I would assume that we can only return the newly retrieived posts in the state
            // from: https://www.udemy.com/react-redux/learn/v4/t/lecture/4419864?start=0
            return { ...state, all: action.payload };
        default:
            return state;
    }
}