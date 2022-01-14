import React from "react";
import "./CharacterTile.scss";
import RenderSmoothImage from "render-smooth-image-react";
import "render-smooth-image-react/build/style.css";
import heartIcon from "../../assets/heart";
import { useSelector } from "react-redux";

const CharacterTile = ({ character, onClick }) => {
  const { id, name, image, location } = character;
  const { user } = useSelector((state) => state.user);
  const isFavourite = user?.favourites
    .map((fav) => fav.characterId)
    .includes(id);

  return (
    <div className="character-tile" onClick={onClick}>
      <div className="character-tile__image">
        <RenderSmoothImage src={image} alt="alternate-text" objectFit="cover" />
      </div>

      <div className="character-tile__desc">
        <div
          className="character-tile__fav"
          data-isfavourites={Boolean(isFavourite)}
        >
          {heartIcon}
        </div>
        <div className="character-tile__info">
          <span>Who?</span>
          <span>{name}</span>
        </div>

        <div className="character-tile__info">
          <span>From?</span>
          <span>{location.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterTile;
