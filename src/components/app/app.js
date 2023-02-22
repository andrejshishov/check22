/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTodo from '../new-todo';
import TodoList from '../todo-list/todo-list';
import Footer from '../footer/footer';

import './app.css';

export default class App extends Component {
  state = {
    items: [
     this.createTodoItem('First task'),
      this.createTodoItem('Second task'),
      this.createTodoItem('Third task'),
  ],
  filter: 'all',
  };

  createTodoItem(label, min, sec) {
    return {
      label,
      status: false,
      date: new Date(),
      id: uuidv4(),
      time: '0 seconds',
      mins: min,
      secs: sec,
    };
  }

  addItem = (label, min, sec) => {
    const newItem = this.createTodoItem(label, min, sec);
    this.setState(({ items }) => {
      const newArr = [
        ...items,
        newItem,
      ];
      return {
        items: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ items }) => {
      const idx = items.findIndex((el) => el.id === id);
      const newData = [
        ...items.slice(0, idx),
        ...items.slice(idx + 1),
      ];
      return {
        items: newData,
      };
    })
  };

  onToggleDone = (id) => {
    this.setState(() => ({
        items: this.toggleProperty(id, 'status'),
    }));
};

toggleProperty(id, property) {
  const { items } = this.state;
  const index = items.findIndex((el) => el.id === id);
  const oldItem = items[index];
  const newItem = {
      ...oldItem,
      [property]: !oldItem[property],
  };
  return [
      ...items.slice(0, index),
      newItem,
      ...items.slice(index + 1),
  ];
}

  changeTitle = (id, text) => {
    this.setState(({ items }) => {
        const index = items.findIndex((el) => el.id === id);
        const oldItem = items[index];

        const newItem = { ...oldItem, label: text };

        const newData = [
            ...items.slice(0, index),
            newItem,
            ...items.slice(index + 1),
        ];

        return {
            items: newData,
        };
    });
};

  onFilterChange = (value) => {
    this.setState({
      filter: value,
    });
  };

  onClearCompleted = () => {
    this.setState(({ items }) => {
      const compArr = [...items].filter((el) => !el.status);
      return {
        items: compArr,
      }
    });
  };

  render() {
   const { items, filter } = this.state;

   return (
    <section className='todoapp'>
      <NewTodo onItemAdded={this.addItem}/>
    <section className='main'>
      <TodoList
      items={ items }
      onDeleted={ this.deleteItem }
      onToggleDone={ this.onToggleDone }
      filter={filter}
      changeTitle={this.changeTitle}/>
      <Footer
      left={items.filter((item) => item.status === false).length}
      filter={filter}
      onFilterChange={ this.onFilterChange }
      clearCompleted={ this.onClearCompleted }/>
    </section>
    </section>
  )
  }
}
