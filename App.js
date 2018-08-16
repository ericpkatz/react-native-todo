import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { clearTodos, fetchTodos, createTodo } from './src/store/actions/todos';

import Todos from './src/Components/Todos';

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
        <Button title='Clear Todos' onPress={()=> this.props.clearTodos()}></Button>
        <Button title='About' onPress={()=> this.props.navigation.navigate('About')}></Button>
        <Button title={ `Todos ${todos.length}` } onPress={()=> this.props.navigation.navigate('Todos')}></Button>
      </View>
    );
  }
}
const HomeScreen = connect(
  ({todos})=>({ todos }),
  (dispatch)=>({ 
    fetchTodos: ()=> dispatch(fetchTodos()),
    clearTodos: ()=> dispatch(clearTodos()),
  })
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
    screen: Todos
  }
});

export default App;
