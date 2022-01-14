import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import MODAL from "../../utils/modalTypesEnum";
import "./Profile.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    user: { login, email, commentsCount, favourites },
  } = useSelector((state) => state.user);

  return (
    <main className="profile-container">
      <section className="account-information">
        <header className="account-information__header">
          Account information:
        </header>
        <div className="account-information__info">
          <span>Username:</span>
          <span>{login}</span>
        </div>
        <div className="account-information__info">
          <span>E-mail:</span>
          <span>{email}</span>
        </div>
        <div className="account-information__info">
          <span>Written comments:</span>
          <span>{commentsCount}</span>
        </div>
      </section>

      <section className="account-information">
        <header className="account-information__header">
          Favourite characters ({favourites.length}):
        </header>
        <div className="account-information__favs-list">
          {favourites.map((fav) => {
            return (
              <div
                className="single-fav-character"
                key={fav.id}
                onClick={() =>
                  dispatch(openModal({ type: MODAL.CHARACTER, data: fav }))
                }
              >
                <img src={fav.image} alt="Fav Icon" />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Profile;
