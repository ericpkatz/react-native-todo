const todosReducer = (state = [], action)=> {
  switch(action.type){
    case 'TODOS_SET':
      state = action.todos;
      break;
    case 'TODOS_CLEAR':
      state = [];
      break;
    case 'TODO_CREATE':
      state = [...state, action.todo ];
      break;
    case 'TODO_DESTROY':
      state = state.filter(todo=> action.todo.id !== todo.id); 
      break;
    case 'TODO_UPDATE':
      state = state.map(todo => {
        if(todo.id === action.todo.id){
          return action.todo;
        }
        return todo;
      });
      break;
  }
  return state;
};

export default todosReducer; 
