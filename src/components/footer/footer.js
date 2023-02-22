import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import Filters from "../filters/filters";

// eslint-disable-next-line object-curly-spacing, object-curly-newline
const Footer = ({left, filter, onFilterChange, clearCompleted}) => (
    <footer className="footer">
        <span className="todo-count">{left} items left</span>
        <Filters
        filter={filter}
        onFilterChange={onFilterChange}/>
        <button className="clear-completed"
        onClick={clearCompleted}>Clear completed</button>
    </footer>
);

export default Footer;

Footer.defaultProps = {
  clearCompleted: () => {},
  left: 0,
};

Footer.propTypes = {
  clearCompleted: PropTypes.func,
  left: PropTypes.number,
};