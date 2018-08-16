import React, { Component } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { fetchTodos, createTodo } from '../store/actions/todos';

class _TodoInput extends Component{
  constructor(){
    super();
    this.state = { text: '' };
    this.save = this.save.bind(this);
  }
  save(){
    this.props.createTodo(this.state.text)
      .then(()=> this.setState({ text: '' }));
  }
  render(){
    const { text } = this.state;
    return (
    <View style={{ flex: 1, width: '100%', paddingTop: 10, display: 'flex', flexDirection: 'row' }}>

      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, flex: 2}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      {
        text.length > 0 && 
      <Button title='Create It' style={{ flex: 1}} onPress={()=> this.save()}></Button>
      }
    </View>
    );
  }
}

const TodoInput = connect(
  null,
  (dispatch)=> ({
    createTodo: (title)=> dispatch(createTodo({ title }))
  })
)(_TodoInput);

export default TodoInput;
