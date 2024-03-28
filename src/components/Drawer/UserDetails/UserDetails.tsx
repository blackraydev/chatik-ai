import { Link } from 'react-router-dom';
import { UserIcon } from '../../../icons';
import { useDrawerVisibilityScope, useUserScope } from '../../../scopes';
import './UserDetails.css';

export const UserDetails = () => {
  const { hideDrawer } = useDrawerVisibilityScope();
  const { user } = useUserScope();

  if (!user) return null;

  const { firstName, lastName, photoURL, tariff } = user;

  const handleUpgradePlanClick = () => {
    hideDrawer();
  };

  return (
    <div className="user-details">
      <div className="user-details-left">
        <div className="user-avatar">
          {photoURL ? <img src={photoURL} /> : <UserIcon size={24} />}
        </div>
        <div className="user-data">
          <p>{`${firstName} ${lastName}`}</p>
          <span>{tariff} plan</span>
        </div>
      </div>
      <Link to={'/upgrade-plan'} className="user-upgrade" onClick={handleUpgradePlanClick}>
        Upgrade plan
      </Link>
    </div>
  );
};
