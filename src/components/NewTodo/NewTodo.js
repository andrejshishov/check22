import { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTodo.css';

export default class NewTodo extends Component {
  state = {
    label: '',
    mins: '',
    secs: '',
  };

  onLabelChange = (e) => {
    if (e.target.value.length === 1) {
        const label = e.target.value.trim().replace(/ +/g, ' ');
        this.setState({
            label,
        });
    } else {
        this.setState({
            label: e.target.value,
        });
    }
};

onSubmit = (e) => {
  e.preventDefault();
  this.setState({
      label: '',
      secs: '',
      mins: '',
  });

  const { label, mins, secs } = this.state;
  const sec = Number(mins) * 60 + Number(secs);
  const { onItemAdded } = this.props;
  onItemAdded(label, sec);
};

onSetTimer = (e) => {
  if (/[0-9]|\./.test(e.target.value) || e.target.value === '') {
      this.setState({
          [e.target.name]: e.target.value,

      });
  }
};

  render() {
    const { mins, secs, label } = this.state;
    return (
    <header className="header">
            <h1>todos</h1>
      <form className="new-todo-form" onSubmit={this.onSubmit}>
      <input type="text"
           className="new-todo"
           placeholder="What needs to be done?"
           autoFocus
           onChange={this.onLabelChange}
           value={label}
           required
           />
           <input name="mins" value={mins} className="new-todo-form__timer" placeholder="Min" onChange={this.onSetTimer} />
          <input name="secs" value={secs} className="new-todo-form__timer" placeholder="Sec" onChange={this.onSetTimer} />
          <input className="hidden" type="submit" />
      </form>
    </header>
    );
  }
}

NewTodo.defaultProps = {
  onItemAdded: () => {},
};

NewTodo.propTypes = {
  onItemAdded: PropTypes.func,
};