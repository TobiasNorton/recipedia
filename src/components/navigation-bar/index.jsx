import './style.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPepperHot } from '@fortawesome/free-solid-svg-icons';

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <Link to="/" className="logo">
        Recipedia
        <FontAwesomeIcon icon={faPepperHot} />
      </Link>
    </div>
  );
};

export default NavigationBar;
