import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import thoughts, { getThoughts } from 'reducers/thoughts';
import { API_URL } from 'utils/utils';
import { useNavigate, Link } from 'react-router-dom';
import user from 'reducers/user';
const Main = () => {
  const thoughtItems = useSelector((store) => store.thoughts.items);
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken]);

  useEffect(() => {
    dispatch(getThoughts());
  }, []);

  return (
    <>
      <h2>This is the main component</h2>
      {thoughtItems.map((item) => {
        return <p key={item._id}>{item.message}</p>;
      })}
      <button
        type="button"
        onClick={() => {
          dispatch(user.actions.setAccessToken(null));
          //   navigate("/login");
        }}
      >
        Log Out
      </button>
    </>
  );
};

export default Main;
