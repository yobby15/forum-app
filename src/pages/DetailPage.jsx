import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveThreadDetail, asyncAddComment } from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { threadDetail, authUser } = useSelector((state) => state);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onReplySubmit = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <ThreadDetail thread={threadDetail} authUser={authUser} />
        <CommentInput
          authUser={authUser}
          addComment={onReplySubmit}
        />
        <CommentList comments={threadDetail.comments} />
      </div>
    </div>
  );
};

export default DetailPage;