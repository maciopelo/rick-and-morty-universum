import React, { useEffect } from "react";
import "./Login.scss";
import { loginSchema } from "../../../validators/yupSchemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import rickAndMorty from "../../../assets/rick_morty_login.png";
import Button from "../../Button/Button";
import Close from "../../Close/Close";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../../redux/slices/modalSlice";
import {
  loginUser,
  clearMessageAndStatus,
} from "../../../redux/slices/userSlice";
import MODAL from "../../../utils/modalTypesEnum";

const Login = () => {
  const dispatch = useDispatch();

  const { resMessage, status, isLogged } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    setTimeout(() => dispatch(clearMessageAndStatus()), 5 * 1000);
    reset();
  };

  const handleRegisterModal = () => {
    dispatch(openModal({ type: MODAL.REGISTER }));
  };

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        dispatch(closeModal());
      }, 1 * 1000);
    }
  }, [isLogged, dispatch]);

  return (
    <div className="login-modal-wrapper">
      <Close onClick={() => dispatch(closeModal())} />
      <header className="login-header">
        <span className="login-header__text">Login</span>
        <div className="login-header__image">
          <img
            data-islogged={status === "loading" || status === "succeeded"}
            src={rickAndMorty}
            alt="Rick and Morty"
          />
        </div>
      </header>

      <form
        className="login-form"
        onSubmit={handleSubmit(onSubmit)}
        id="login-form"
      >
        <div className="input-wrapper">
          <input
            type="text"
            className="input"
            placeholder="login"
            {...register("login")}
          />
          <span className="error-msg">{errors.login?.message}</span>
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            className="input"
            placeholder="password"
            {...register("password")}
          />
          <span className="error-msg">{errors.password?.message}</span>
        </div>
      </form>

      <div className="login-response-message">
        <span data-error={status === "failed"}>
          {status === "failed" && resMessage}
        </span>
      </div>
      <div className="login-bottom-panel">
        <span
          className="login-bottom-panel__text"
          onClick={handleRegisterModal}
        >
          don't have an account?
        </span>
        <Button text="login" form="login-form" type="submit" />
      </div>
    </div>
  );
};

export default Login;
