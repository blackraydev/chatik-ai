import { UserIcon } from '../../../icons';
import { useUserScope } from '../../../scopes';
import './UserDetails.css';

export const UserDetails = () => {
  const { user } = useUserScope();

  if (!user) return null;

  const { firstName, lastName, photoURL, tariff } = user;

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
      <button className="user-upgrade"></button>
    </div>
  );
};
