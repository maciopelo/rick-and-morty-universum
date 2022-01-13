import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SiteHeader from "./layout/SiteHeader/SiteHeader";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import SiteFooter from "./layout/SiteFooter/SiteFooter";
import SvgIcon from "./components/SvgIcon/SvgIcon";
import rocket from "./assets/rocket.svg";
import { useDispatch, useSelector } from "react-redux";
import ModalsContainer from "./components/ModalsContainer/ModalsContainer";
import { authUser } from "./redux/slices/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    winScroll !== 0 ? setIsVisible(true) : setIsVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const checkLocalStorage = () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      dispatch(authUser(jwt));
    }
  };

  useEffect(() => {
    checkLocalStorage();
    window.addEventListener("scroll", listenToScroll);

    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <BrowserRouter>
      {isModalOpen && <ModalsContainer />}
      <div className="app-container">
        <SiteHeader scrolled={isVisible} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>

        <div className="scroll-up-button" data-visible={isVisible}>
          <SvgIcon icon={rocket} size={[70, 70]} onClick={scrollToTop} />
        </div>

        <SiteFooter />
      </div>
    </BrowserRouter>
  );
};

export default App;
