import { PropTypes } from 'prop-types';
import { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import TodoListItem from '../todo-list-item';

export default class TodoList extends Component {
  render() {
    // eslint-disable-next-line max-len, object-curly-newline
    const { items, onDeleted, onToggleDone, filter, changeTitle } = this.props;

    // eslint-disable-next-line no-shadow
    function filterItems(items, filter) {
      if (filter === 'active') {
        return items.filter((item) => item.status === false);
      }
      if (filter === 'completed') {
        return items.filter((item) => item.status === true);
      }
      return items;
    }

    const elements = filterItems(items, filter).map((item) => (
      <TodoListItem
      {...item}
      key={item.id}
      onDeleted={onDeleted}
      onToggleDone={() => onToggleDone(item.id)}
      changeTitle={changeTitle}
      />
    ));

    return (
      <ul className='todo-list'>
        { elements }
      </ul>
    );
  }
}

TodoList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  changeTitle: () => {},
}

TodoList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  changeTitle: PropTypes.func,
};
