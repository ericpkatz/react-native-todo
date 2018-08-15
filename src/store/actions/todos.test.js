import { fetchTodos, createTodo, destroyTodo } from './todos';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
import * as localStore from '../localStore';

describe('todos (actions)', ()=> {
  afterEach(()=> jest.restoreAllMocks());
  describe('fetch todos', ()=> {
    test('success', ()=> {
      jest.spyOn(localStore, 'getItem').mockImplementation(()=> Promise.resolve([ ]));
      const store = mockStore({});
      const expectedActions = [
        { type: 'TODOS_SET', todos: []  },
      ];
      return store.dispatch(fetchTodos())
        .then(()=> {
          expect(store.getActions()).toMatchObject(expectedActions);
        });
    });
  });


  describe('create todo', ()=> {
    test('success', ()=> {
      const mockSetItem = jest.spyOn(localStore, 'setItem').mockImplementation(()=> Promise.resolve([ ]));
      const store = mockStore({
        todos: [{ id: 1 }]
      });
      const expectedActions = [
        { type: 'TODO_CREATE', todo: { id: 2, title: 'learn jest'}  },
      ];
      return store.dispatch(createTodo({ title: 'learn jest' }))
        .then(()=> {
          expect(store.getActions()).toMatchObject(expectedActions);
          expect(mockSetItem.mock.calls[0]).toMatchObject([
            'todos',
            [
              { id: 1 },
              { id: 2, title: 'learn jest' }
            ]
          ]);
        });
    });

  });
  describe('delete todo', ()=> {
    test('success', ()=> {
      const mockSetItem = jest.spyOn(localStore, 'setItem').mockImplementation(()=> Promise.resolve([ ]));
      const store = mockStore({
        todos: [{ id: 1 }, { id: 2 }]
      });
      const expectedActions = [
        { type: 'TODO_DESTROY', todo: { id: 2 }  },
      ];
      return store.dispatch(destroyTodo({ id: 2 }))
        .then(()=> {
          expect(store.getActions()).toMatchObject(expectedActions);
          expect(mockSetItem.mock.calls[0]).toMatchObject([
            'todos',
            [
              { id: 1 },
            ]
          ]);
        });
    });
  });
});
