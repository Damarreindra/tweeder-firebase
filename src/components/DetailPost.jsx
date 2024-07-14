import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getListUser, getComments, addComment } from "../actions/userAction";
function DetailPosts() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const uname = localStorage.getItem('uname')
  const [comments, setComments] = useState([]);
  const profileImg = localStorage.getItem('img')
  const [comment, setComment] = useState("");
  const CommentsCreatedAt = Date.now()
  const { getListUserResult } = useSelector((state) => state.UserReducer);
  const { getCommentsResult, addCommentResult } = useSelector((state) => state.CommentReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  useEffect(() => {
    if (getListUserResult) {
      setData(getListUserResult.items);
    }
  }, [getListUserResult]);

  useEffect(() => {
    if (getCommentsResult) {
      setComments(getCommentsResult);
    }
  }, [getCommentsResult]);

  useEffect(() => {
    if (addCommentResult) {
      dispatch(getComments());
      setComment("");
    }
  }, [addCommentResult, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addComment(
        {
          comment: comment,
          threadsId: +id,
          username: uname,
          CommentCreatedAt: CommentsCreatedAt,
          profile_img: profileImg
        }
      )
    );
  };
  
  return (
    <div id="detail-container">
      {data.map((person) => {
        return (
          <>
            {person.articles
              .filter((e) => e.id === id)
              .map((x) => {
                let createdAt = moment(x.createdAt).fromNow(true);
                let detailCreatedAt = moment(x.createdAt).format('MMMM Do YYYY, h:mm:ss a');
                return (
                  <div>
                    <div
                      class="card border-0 mb-3 mt-5 shadow p-3 mb-5 bg-body rounded"
                      id="detail"
                    >
                      <div class="card-header bg-transparent border-success">
                        <div className="user">
                          <img
                            src={person.profile_img}
                            alt=""
                          />
                          <div className="user-meta">
                            <div className="name">{person.username}</div>
                            <div className="time">{createdAt} ago</div>
                          </div>
                        </div>
                      </div>
                      <div class="card-body text-brand text-start">
                    
                        <h3 class="card-title">{x.title}</h3>
                        <p class="card-text">
                         {x.content}
                        </p>
                        <p className="text-muted mt-5" style={{fontSize:'12px'}}>{detailCreatedAt}</p>
                      </div>
                      <div class="card-footer bg-transparent border-success">
                        <form className="row g-3"
                        onSubmit={(e) => handleSubmit(e)}
                        >

                          <div class="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a comment here"
                            id="floatingTextarea"
                            required
                            maxLength={30}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                            <label for="floatingTextarea">Comments</label>
                          </div>
                          <div className="col-auto">
                            <button
                              type="submit"
                              className="btn btn-success mb-3 btn-sm"
                            >
                              Post
                            </button>
                          </div>
                        </form>
                  
                        {comments.filter((x)=>x.threadsId === +id)
                         .slice(0).reverse().map((comment)=>{
                          let CommentCreatedAt = moment(comment.CommentCreatedAt).fromNow(true);
                          
                          return(
                            <div class="card border-light mb-3 text-start">
                          <div className="card-header fs-6">
                            <div className="user">
                              <img
                                src={comment.profile_img}
                                alt=""
                              />
                              <div className="user-meta">
                                <div className="name">{comment.username}</div>
                                <div className="time">{CommentCreatedAt} ago</div>
                              </div>
                            </div>
                          </div>

                          <div class="card-body">
                            <p class="card-text">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                          )
                        })
                        }

                        
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        );
      })}
    </div>
  );
}

export default DetailPosts;
