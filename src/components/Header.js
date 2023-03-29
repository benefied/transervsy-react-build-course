import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router-dom';

const Header = ({tittle, showAddTask, taskState}) => {
  const location = useLocation();
  return(
    <header className="header jumbotron">
        {tittle}
        {location.pathname === '/' && (<Button color={taskState? 'green': 'red'} text={taskState? 'Hide': 'Show'} onClick={showAddTask}/>)}
    </header>
  )
}

Header.defaultProps = {
    tittle: "unknown",
}
Header.propTypes = {
    tittle: PropTypes.string.isRequired,
}



export default Header;