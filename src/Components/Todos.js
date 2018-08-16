import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchTodos, createTodo } from '../store/actions/todos';

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
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>Todos { todos.length }</Text>
        <FlatList
          data={ todos }
          renderItem={({ item })=> <View><Text style={{ height: 60}}>{ item.title }</Text></View>}
          keyExtractor={(item, index)=> item.id.toString()}
        />
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

export default TodosScreen;
