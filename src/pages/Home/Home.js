import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CharacterTile from "../../components/CharacterTile/CharacterTile";
import {
  fetchCharacters,
  fetchMoreCharacters,
  fetchWithQueryParam,
} from "../../redux/slices/charachtersSlice";
import "./Home.scss";
import SvgIcon from "../../components/SvgIcon/SvgIcon";
import cross from "../../assets/cross.svg";
import search from "../../assets/search.svg";
import { openModal } from "../../redux/slices/modalSlice";
import MODAL from "../../utils/modalTypesEnum";

const HomePage = () => {
  const [filterKeyword, setFilterKeyword] = useState("");

  const dispatch = useDispatch();
  const { characters, status, nextPage } = useSelector(
    (state) => state.characters
  );

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const handleFetchMoreCharacters = () => {
    dispatch(fetchMoreCharacters(nextPage));
  };

  const handleFilterKeywordChange = ({ target: { value } }) => {
    setFilterKeyword(value.trim());
  };

  const handleFilterKeywordReset = () => {
    setFilterKeyword("");
    dispatch(fetchCharacters());
  };

  const handleSearch = () => {
    if (filterKeyword.length > 0) dispatch(fetchWithQueryParam(filterKeyword));
  };

  return (
    <>
      <main className="characters-container">
        <div className="find-person-wrapper">
          <SvgIcon
            icon={cross}
            size={[20, 20]}
            onClick={handleFilterKeywordReset}
          />

          <div className="input-wrapper">
            <input
              value={filterKeyword}
              onChange={handleFilterKeywordChange}
              className="input"
              placeholder="Find character..."
            />
          </div>

          <SvgIcon icon={search} size={[32, 32]} onClick={handleSearch} />
        </div>

        <div className="characters-list">
          {characters.map((character, idx) => {
            const mappedCharacter = {
              ...character,
              characterId: character.id,
              episode: character.episode[0],
              location: character.location.name,
            };
            return (
              <CharacterTile
                key={character.id}
                character={character}
                onClick={() =>
                  dispatch(
                    openModal({ type: MODAL.CHARACTER, data: mappedCharacter })
                  )
                }
              />
            );
          })}
          {characters.length % 3 === 2 && <div className="character-tile" />}
          {characters.length % 3 === 1 && (
            <>
              <div className="character-tile" />
              <div className="character-tile" />
            </>
          )}
        </div>

        {status === "succeeded" && characters.length === 0 && (
          <div className="not-found-message">
            <span>No results</span>
          </div>
        )}

        <div className="characters-container__fetch-more">
          {nextPage && (
            <button onClick={handleFetchMoreCharacters}>more...</button>
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
