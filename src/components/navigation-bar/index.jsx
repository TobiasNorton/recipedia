import './style.scss';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <Link to="/" className="logo">
        Recipedia
        <i className="fa-solid fa-pepper-hot" />
      </Link>
    </div>
  );
};

export default NavigationBar;
