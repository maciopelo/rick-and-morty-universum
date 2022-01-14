import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import { openModal } from "../../redux/slices/modalSlice";
import { clearState } from "../../redux/slices/userSlice";
import "./SiteHeader.scss";
import MODAL from "../../utils/modalTypesEnum";
import profile from "../../assets/profile.png";
import logout from "../../assets/logout.png";
import { useNavigate } from "react-router-dom";

const SiteHeader = ({ scrolled }) => {
  let navigate = useNavigate();
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
        <nav className="site-nav">
          <div className="option" onClick={() => navigate("/profile")}>
            <div
              className="option__icon option__icon--profile"
              style={{ backgroundImage: `url(${profile})` }}
            />
            <span className="option__text">profile</span>
          </div>

          <div className="option" onClick={handleLogout}>
            <div
              className="option__icon  option__icon--logout"
              style={{ backgroundImage: `url(${logout})` }}
            />
            <span className="option__text">logout</span>
          </div>
        </nav>
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
