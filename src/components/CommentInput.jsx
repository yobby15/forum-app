import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';

const CommentInput = ({ authUser, addComment }) => {
  const [content, onContentChange, setContent] = useInput('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addComment(content);
      setContent('');
    }
  };

  return (
    <div className="mb-10">
      <h3 className="font-bold text-slate-900 mb-4">Beri komentar</h3>
      {authUser ? (
        <form onSubmit={onSubmit} className="space-y-3">
          <textarea
            value={content}
            onChange={onContentChange}
            placeholder="Tulis komentar Anda..."
            className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50/30"
            rows="4"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition-colors shadow-md active:scale-[0.98]"
          >
            Kirim
          </button>
        </form>
      ) : (
        <p className="text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <Link to="/login" className="text-indigo-600 underline font-semibold hover:text-indigo-700">Login</Link> untuk memberi komentar
        </p>
      )}
    </div>
  );
};

export default CommentInput;