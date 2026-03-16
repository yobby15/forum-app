import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { postedAt } from '../utils';

const ThreadItem = ({ thread }) => {
  const navigate = useNavigate();

  const onVoteClick = (e, voteType) => {
    e.stopPropagation();

    if (!thread.authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote!');
      navigate('/login');
      return;
    }

    console.log(`Voted ${voteType} on thread ${thread.id}`);
  };

  return (
    <div onClick={() => navigate(`/thread/${thread.id}`)} className="group p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
      <div className="flex flex-col gap-3">
        <div>
          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
            #{thread.category}
          </span>
        </div>

        <h4 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {thread.title}
        </h4>

        <div
          className="text-slate-600 text-sm leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: thread.body }}
        />

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-4 text-slate-500">
            <button onClick={(e) => onVoteClick(e, 'up')} className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
              <ThumbsUp size={18} /> <span className="text-xs font-semibold">{thread.upVotesBy.length}</span>
            </button>
            <button onClick={(e) => onVoteClick(e, 'down')} className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <ThumbsDown size={18} /> <span className="text-xs font-semibold">{thread.downVotesBy.length}</span>
            </button>
            <div className="flex items-center gap-1">
              <MessageSquare size={18} /> <span className="text-xs font-semibold">{thread.totalComments}</span>
            </div>
          </div>

          <div className="text-right text-xs text-slate-400">
            <p>{postedAt(thread.createdAt)}</p>
            <p>Oleh <span className="font-bold text-slate-700">{thread.user?.name}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadItem;