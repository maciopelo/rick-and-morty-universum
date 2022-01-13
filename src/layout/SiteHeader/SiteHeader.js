import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import { openModal } from "../../redux/slices/modalSlice";
import { clearState } from "../../redux/slices/userSlice";
import "./SiteHeader.scss";
import MODAL from "../../utils/modalTypesEnum";
import logout from "../../assets/logout.png";

const SiteHeader = ({ scrolled }) => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearState());
  };

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <Logo />

      {isLogged ? (
        <div className="logout" onClick={handleLogout}>
          <img className="logout__icon" src={logout} alt="Rick Cucumber" />
          <span className="logout__text">logout</span>
        </div>
      ) : (
        <Button
          text="Login"
          onClick={() => dispatch(openModal({ type: MODAL.LOGIN }))}
        />
      )}
    </header>
  );
};

export default SiteHeader;
