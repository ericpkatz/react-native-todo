import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { fetchTodos } from './src/store/actions/todos';

import store from './src/store';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title='About' onPress={()=> this.props.navigation.navigate('About')}></Button>
        <Button title='Todos' onPress={()=> this.props.navigation.navigate('Todos')}></Button>
      </View>
    );
  }
}

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
  }
  render() {
    const { todos } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Todos { todos.length }</Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    fetchTodos: ()=> dispatch(fetchTodos())
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
