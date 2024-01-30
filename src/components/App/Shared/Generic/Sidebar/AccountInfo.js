import no_picture from "../../../../../img/no_picture.svg";
import { useAuthContext } from "../../../Auth/AuthProvider";
import { Link } from "react-router-dom";
import { ProfielRoute } from "../../../../../core/routes";

const AccountInfo = () => {
  const { auth } = useAuthContext();

  return (
    <Link to={ProfielRoute.Index}>
      <div className="account-info">
        <img src={no_picture} alt="geen afbeelding" />
        <p>
          {auth.user.voornaam} {auth.user.achternaam}
        </p>
        <p className="user-id">{auth.user.rol}</p>
      </div>
    </Link>
  );
};

export default AccountInfo;
