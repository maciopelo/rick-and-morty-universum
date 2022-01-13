import React from "react";
import ReactDOM from "react-dom";
import "./ModalsContainer.scss";
import { closeModal } from "../../redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import MODAL from "../../utils/modalTypesEnum";
import Login from "../modals/Login/Login";
import Register from "../modals/Register/Register";
import CharacterDetails from "../modals/CharacterDetails/CharacterDetails";

const ModalsContainer = () => {
  const modalRoot = document.querySelector("#modal");

  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modal.type);

  const handleModalClose = (e) => {
    e.target === e.currentTarget && dispatch(closeModal());
  };

  const renderProperModal = (type) => {
    switch (type) {
      case MODAL.LOGIN:
        return <Login />;
      case MODAL.REGISTER:
        return <Register />;
      case MODAL.CHARACTER:
        return <CharacterDetails />;
      default:
        return null;
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-bg" onClick={handleModalClose}>
      {renderProperModal(modalType)}
    </div>,
    modalRoot
  );
};

export default ModalsContainer;
