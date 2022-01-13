/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CharacterDetails.scss";
import Close from "../../Close/Close";
import { closeModal, openModal } from "../../../redux/slices/modalSlice";
import RenderSmoothImage from "render-smooth-image-react";
import "render-smooth-image-react/build/style.css";
import SvgIcon from "../../SvgIcon/SvgIcon";
import add from "../../../assets/add.svg";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentSchema } from "../../../validators/yupSchemas";
import bin from "../../../assets/bin.svg";
import MODAL from "../../../utils/modalTypesEnum";

const CharacterDetails = () => {
  const dispatch = useDispatch();
  const {
    data: { id, name, status, species, image, episode, location },
  } = useSelector((state) => state.modal);
  const { isLogged } = useSelector((state) => state.user);
  const [lastEpisode, setLastEpisode] = useState("");
  const [comments, setComments] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
  });

  useEffect(() => {
    const fetchEpisodeName = async () => {
      const res = await fetch(episode[0]);
      const data = await res.json();
      setLastEpisode(data.name);
    };

    const fetchComments = async () => {
      const res = await fetch(
        `http://localhost:1337/comments/?characterId=${id}`
      );
      const data = await res.json();
      setComments(data.sort((a, b) => (a.created_at > b.created_at ? -1 : 1)));
    };

    fetchEpisodeName();
    fetchComments();
  }, [episode, id]);

  const onSubmit = async (data) => {
    let confirmRemoval = confirm("Are you sure to add comment?");
    if (confirmRemoval) {
      reset();

      const jwt = jwt_decode(localStorage.getItem("jwt"));

      const comment = JSON.stringify({
        text: data.text,
        date: new Date().toISOString(),
        characterId: id,
        users_permissions_user: jwt.id,
      });

      const res = await fetch("http://localhost:1337/comments", {
        method: "POST",
        body: comment,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
          Accept: "*/*",
        },
      });

      const resData = await res.json();
      setComments((prev) => [resData, ...prev]);
      return;
    }
    reset();
  };

  const handleCommentRemoval = async (id) => {
    let confirmRemoval = confirm("Are you sure to delete comment?");
    if (confirmRemoval) {
      const res = await fetch(`http://localhost:1337/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
          Accept: "*/*",
        },
      });

      const data = await res.json();
      setComments((prev) => prev.filter((c) => c.id !== data.id));
      return;
    }
  };

  return (
    <div className="character-modal-wrapper">
      <Close onClick={() => dispatch(closeModal())} />

      <div className="character-info">
        <div className="character-info__image">
          <RenderSmoothImage src={image} alt={name} objectFit="cover" />
        </div>

        <div className="character-details">
          <div className="character-details__personal">
            <span>{name}</span>
            <span data-status={status.toLowerCase()}>
              {status} - {species}
            </span>
          </div>
          <div className="character-details__other">
            <span>Last known location:</span>
            <span>{location.name}</span>
          </div>

          <div className="character-details__other">
            <span>First seen in episode:</span>
            <span>{lastEpisode}</span>
          </div>

          <div className="character-details__other">
            <span>Rating:</span>
            <span>* * * * *</span>
          </div>
        </div>
      </div>

      <div className="character-comments">
        <span className="character-comments__header">Comments</span>
        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <div className="character-comments__comment" key={comment.id}>
                <span>
                  {comment.users_permissions_user.username} | {comment.date}
                </span>
                <p>{comment.text}</p>
                {isLogged &&
                  comment.users_permissions_user.id ===
                    jwt_decode(localStorage.getItem("jwt"))?.id && (
                    <SvgIcon
                      onClick={() => handleCommentRemoval(comment.id)}
                      icon={bin}
                      size={[16, 17]}
                    />
                  )}
              </div>
            );
          })}
      </div>

      {isLogged ? (
        <form
          className="character-modal-comment"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            className="character-modal-comment__textarea"
            {...register("text")}
          />
          <span>{errors.text?.message}</span>
          <button type="submit">
            <SvgIcon icon={add} size={[40, 40]} />
          </button>
        </form>
      ) : (
        <div
          className="character-modal-register-message"
          onClick={() => dispatch(openModal({ type: MODAL.LOGIN }))}
        >
          <span>Login to leave a comment.</span>
        </div>
      )}
    </div>
  );
};

export default CharacterDetails;