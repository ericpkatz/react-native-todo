import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { fetchTodos, createTodo } from './src/store/actions/todos';

import store from './src/store';

class _HomeScreen extends React.Component {
  componentDidMount(){
    this.props.fetchTodos();
  }
  render() {
    const { todos } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title='About' onPress={()=> this.props.navigation.navigate('About')}></Button>
        <Button title={ `Todos ${todos.length}` } onPress={()=> this.props.navigation.navigate('Todos')}></Button>
      </View>
    );
  }
}
const HomeScreen = connect(
  ({todos})=>({ todos }),
  (dispatch)=>({ fetchTodos: ()=> dispatch(fetchTodos())})
)(_HomeScreen);

class AboutScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>About Screen</Text>
      </View>
    );
  }
}

class _TodosScreen extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.fetchTodos();
    console.log('mounting');
  }
  render() {
    const { todos } = this.props;
    const { createTodo } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Todos { todos.length }</Text>
        {
          todos.map( todo => <Text key={ todo.id }>{ todo.title }</Text>)
        }
        <Button title='add a todo' onPress={()=> createTodo()}></Button>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    fetchTodos: ()=> dispatch(fetchTodos()),
    createTodo: ()=> dispatch(createTodo({ title: 'DO IT' }))
  };
};
const mapStateToProps = ({ todos })=> {
  return {
    todos
  };
};
const TodosScreen = connect(mapStateToProps, mapDispatchToProps)(_TodosScreen);

const App = ()=> {
  return (
    <Provider store={ store }>
      <RootStack />
    </Provider>
  );
};

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  About: {
    screen: AboutScreen
  },
  Todos: {
    screen: TodosScreen
  }
});

export default App;
