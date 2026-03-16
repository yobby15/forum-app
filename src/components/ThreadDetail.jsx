import { useNavigate } from 'react-router-dom'; // Tambahkan ini
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { postedAt } from '../utils';

const ThreadDetail = ({ thread, authUser }) => {
  const navigate = useNavigate();

  const onVoteClick = (voteType) => {
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote!');
      navigate('/login');
      return;
    }

    console.log(`Voted ${voteType} on thread detail ${thread.id}`);
  };

  return (
    <div className="mb-8">
      <span className="inline-block border border-slate-300 px-3 py-1 rounded text-xs text-slate-500 mb-4 bg-slate-50">
        #{thread.category}
      </span>

      <h2 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
        {thread.title}
      </h2>

      <div
        className="text-slate-700 text-lg mb-6 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: thread.body }}
      />

      <div className="flex items-center gap-4 text-sm text-slate-500 border-b border-slate-100 pb-6">
        <button onClick={() => onVoteClick('up')} className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <ThumbsUp size={18}/> {thread.upVotesBy.length}
        </button>
        <button onClick={() => onVoteClick('down')} className="flex items-center gap-1 hover:text-red-500 transition-colors">
          <ThumbsDown size={18}/> {thread.downVotesBy.length}
        </button>

        <div className="flex items-center gap-2 ml-4">
          <img
            src={thread.owner.avatar}
            alt={thread.owner.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span>Dibuat oleh <strong className="text-slate-900">{thread.owner.name}</strong></span>
        </div>
        <span className="ml-auto">{postedAt(thread.createdAt)}</span>
      </div>
    </div>
  );
};

export default ThreadDetail;