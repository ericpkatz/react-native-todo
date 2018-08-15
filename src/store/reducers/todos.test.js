import reducer from './todos';

describe('todosReducer', ()=> {
  test('initial state', ()=>  {
    const expected = [];
    expect(reducer(undefined, {})).toEqual(expected);
  });

  test('TODOS_SET', ()=>  {
    const expected = ['TODO1', 'TODO2'];
    const action = {
      type: 'TODOS_SET',
      todos: ['TODO1', 'TODO2']
    };
    expect(reducer(undefined, action)).toEqual(expected);
  });

  test('TODO_CREATE', ()=>  {
    const state = [
      { id: 1, title: 'do it' }
    ];
    const todo = { title: 'just do it '};
    const expected = [...state, todo];
    const action = {
      type: 'TODO_CREATE',
      todo
    };
    expect(reducer(state, action)).toEqual(expected);
  });

  test('TODO_DESTROY', ()=>  {
    const state = [
      { id: 1, title: 'do it' },
      { id: 2, title: 'just do it '}
    ];
    const todo = state[1];
    const expected = [state[0]];
    const action = {
      type: 'TODO_DESTROY',
      todo
    };
    expect(reducer(state, action)).toEqual(expected);
  });

  test('TODO_UPDATE', ()=>  {
    const state = [
      { id: 1, title: 'do it' },
      { id: 2, title: 'just do it '}
    ];
    const todo = Object.assign({}, state[1], { title: 'JUST DO IT'}); 
    const expected = [state[0], todo];
    const action = {
      type: 'TODO_UPDATE',
      todo
    };
    expect(reducer(state, action)).toEqual(expected);
  });
});
