import { setItem, getItem } from '../localStore';
const fetchTodos = ()=> {
  return async (dispatch) => {
    try {
      const todos = await getItem('todos',[]);
      dispatch({ type: 'TODOS_SET', todos });
    }
    catch(ex){
      throw ex;
    }
  };
};

const createTodo = (todo)=> {
  return async (dispatch, getState) => {
    try {
      const todos = getState().todos;
      const maxId = todos.reduce((memo, _todo)=>{
        if(_todo.id > memo){
          memo = _todo.id;
        }
        return memo;
      }, 0);
      const _todo = { ...todo, id: ++maxId }; 
      await setItem('todos', [...todos, _todo]); 
      dispatch({ type: 'TODO_CREATE', todo: _todo });
    }
    catch(ex){
      throw ex;
    }
  };
};

const destroyTodo = (todo)=> {
  return async (dispatch, getState) => {
    try {
      const todos = getState().todos.filter(_todo => _todo.id !== todo.id);
      await setItem('todos', todos);
      dispatch({ type: 'TODO_DESTROY', todo });
    }
    catch(ex){
      throw ex;
    }
  };
};

export { fetchTodos, createTodo, destroyTodo };
