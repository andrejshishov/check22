import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTodo extends Component {
  state = {
    label: '',
    mins: '',
    secs: '',
  };

  onLabelChange = (e) => {
    if (e.target.value.length === 1) {
        const label = e.target.value.replace(/^\s*$/, ' ');
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
    const { label, mins, secs } = this.state;
    const { onItemAdded } = this.props;
    onItemAdded(label, mins, secs);
    e.preventDefault();
    this.setState({
        label: '',
        mins: '',
        secs: '',
    });
};

    setSecs = (e) => {
      this.setState({ secs: e.target.value });
    };

    setMins = (e) => {
      this.setState({ mins: e.target.value });
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
           required/>
           <input name="mins" value={mins} className="new-todo-form__timer" placeholder="Min" onChange={this.setMins} />
          <input name="secs" value={secs} className="new-todo-form__timer" placeholder="Sec" onChange={this.setSecs} />
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