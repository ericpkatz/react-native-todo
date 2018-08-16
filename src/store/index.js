import { createStore, applyMiddleware, combineReducers } from 'redux';
import todos from './reducers/todos';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  todos
})

const middlewares = applyMiddleware(thunk );
const store = createStore(reducer, middlewares);

export default store;

