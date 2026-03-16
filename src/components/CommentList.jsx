import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { postedAt } from '../utils';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className="text-slate-500 text-center py-4">Belum ada komentar.</p>;
  }

  return (
    <div>
      <h3 className="font-bold text-slate-900 mb-6">Komentar ({comments.length})</h3>
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-2 pb-6 border-b border-slate-50 last:border-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={comment.owner.avatar}
                  alt={comment.owner.name}
                  className="h-8 w-8 rounded-full object-cover border border-slate-200"
                />
                <span className="font-bold text-slate-800">{comment.owner.name}</span>
              </div>
              <span className="text-xs text-slate-400">{postedAt(comment.createdAt)}</span>
            </div>

            <div
              className="text-slate-700 ml-10 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />

            <div className="flex items-center gap-4 ml-10 mt-2 text-xs text-slate-500">
              <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                <ThumbsUp size={14}/> {comment.upVotesBy.length}
              </button>
              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                <ThumbsDown size={14}/> {comment.downVotesBy.length}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;