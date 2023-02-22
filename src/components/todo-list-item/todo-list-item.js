import PropTypes from 'prop-types';
import { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { formatDistanceToNowStrict } from "date-fns";

export default class TodoListItem extends Component {
  constructor(props) {
    super(props);
    const { label } = this.props;
    this.state = {
        labelState: label,
        edit: false,
        timeCount: 300,
    };
    this.interval = null;
    this.started = false;
}

  onLabelChange = (e) => {
    this.setState({
        labelState: e.target.value,
    });
};

onSubmit = (e) => {
    const { labelState } = this.state;
    const { changeTitle } = this.props;
    e.preventDefault();
    changeTitle(e.target.id, labelState);
    this.setState({
        edit: false,
    });
};

handlerClick = () => {
  const newEdit = true;
  this.setState({
      edit: newEdit,
  });
};

componentDidMount() {
    const { mins, secs } = this.props;
    let sum = Number(mins) * 60 + Number(secs);
    if (Number(mins) === 0 && Number(secs) === 0) {
      sum = 300;
    }
    this.setState({ timeCount: sum });
    if (Number.isNaN(Number(mins)) || Number.isNaN(Number(secs)) || Number(secs) < 0
    || Number(mins) < 0) {
      this.setState({ timeCount: 300 });
    }
  }

  handleStart = () => {
    clearInterval(this.interval);
    this.started = false;
    if (!this.started) {
      this.started = true;
      this.interval = setInterval(() => {
        const { timeCount } = this.state;
        const finalCount = timeCount - 1;
        if (finalCount > -1) this.setState({ timeCount: finalCount });
      }, 1000);
    }
  };

  handlePause = () => {
    clearInterval(this.interval);
    this.started = false;
  };

  render() {
    // eslint-disable-next-line object-curly-newline
    const { label, id, date,
      onDeleted,
      onToggleDone,
       status,
      // eslint-disable-next-line object-curly-newline
       } = this.props;

        const { labelState, timeCount } = this.state;
        const { edit } = this.state;

        const min = Math.floor(timeCount / 60);
        const sec = Math.floor(timeCount % 60);
        const context = this;

        function onEditClick(e) {
          clearInterval(context.interval);
          onToggleDone(id, e);
        }

        const field = edit ? (
            <form className='' onSubmit={this.onSubmit} id={id}>
                <input
                    type='text'
                    className='edit'
                    placeholder='Editing task'
                    onChange={this.onLabelChange}
                    value={labelState}
                    required
                />
            </form>
        ) : (
            <div className='view'>
                <input
                    id={id.toString()}
                    className='toggle'
                    type='checkbox'
                    onChange={onToggleDone}
                    checked={status}
                    onClick={onEditClick}
                />
                <label htmlFor={id} >
                    <span className={status ? 'completed description' : 'description' }>{label}</span>
                    <span className="created">
              <button type="button" className="icon icon-play" aria-label="start timer" onClick={this.handleStart} />
              <button type="button" className="icon icon-pause" aria-label="pause timer" onClick={this.handlePause} />
              {min.toString().padStart(2, '0')}:{sec.toString().padStart(2, '0')}
            </span>
                    <span className='created'>created {formatDistanceToNowStrict(date)} ago</span>
                </label>
                <button
                    type='button'
                    className='icon icon-edit float-right'
                    onClick={this.handlerClick}
                />
                <button
                    type='button'
                    className='icon icon-destroy float-right'
                    onClick={() => onDeleted(id)}
                />
            </div>
        );

        return <li className={edit ? 'editing' : ''}>{field}</li>;
    }
}

TodoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
};