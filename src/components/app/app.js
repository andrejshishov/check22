/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTodo from '../NewTodo';
import TodoList from '../TodoList/TodoList';
import Footer from '../Footer/Footer';

import './App.css';

export default class App extends Component {
  state = {
    items: [
     this.createTodoItem('First task', 300),
      this.createTodoItem('Second task', 300),
      this.createTodoItem('Third task', 300),
  ],
  filter: 'all',
  };

  createTodoItem(label, sec) {
    return {
      label,
      status: false,
      date: new Date(),
      id: uuidv4(),
      time: '0 seconds',
      fulltime: sec,
      isTimer: null,
    };
  }

  addItem = (label, sec) => {
    const newItem = this.createTodoItem(label, sec);
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

  onPause = (id) => {
    const { items } = this.state;
    const index = items.findIndex((el) => el.id === id);
    const oldItem = items[index];
    const clean = clearInterval(oldItem.isTimer);

    const newItem = {
        ...oldItem,
        isTimer: clean,
    };
    const newData = [
        ...items.slice(0, index),
        newItem,
        ...items.slice(index + 1),
    ];
    this.setState(() => ({
      items: newData,
    }));
};

onStart = (id) => {
    const count = setInterval(() => {
        const { items } = this.state;

        const index = items.findIndex((el) => el.id === id);
        const oldItem = items[index];

        const time = oldItem.fulltime - 1;
        if (time < 0 || oldItem.status) {
            clearInterval(count);
            return;
        }

        const newItem = {
            ...oldItem,
            isTimer: count,
            fulltime: time,
        };
        const newData = [
            ...items.slice(0, index),
            newItem,
            ...items.slice(index + 1),
        ];
        this.setState(() => ({
          items: newData,
        }));
    }, 1000);
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
      changeTitle={this.changeTitle}
      onStart={this.onStart}
      onPause={this.onPause}
      />
      <Footer
      left={items.filter((item) => item.status === false).length}
      filter={filter}
      onFilterChange={ this.onFilterChange }
      clearCompleted={ this.onClearCompleted }
      />
    </section>
    </section>
  )
  }
}
