import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';

const AddThreadForm = () => {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (title.trim() && body.trim()) {
      dispatch(asyncAddThread({ title, body, category }));

      navigate('/');
    } else {
      alert('Judul dan Isi Diskusi wajib diisi!');
    }
  };

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <input
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="Judul"
        required
        className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400 transition-all shadow-sm"
      />

      <input
        type="text"
        value={category}
        onChange={onCategoryChange}
        placeholder="Kategori (Opsional)"
        className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400 transition-all shadow-sm"
      />

      <textarea
        value={body}
        onChange={onBodyChange}
        placeholder="Isi Diskusi"
        required
        rows="8"
        className="w-full p-4 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-400 transition-all resize-none shadow-sm"
      ></textarea>

      <button
        type="submit"
        className="w-full bg-slate-800 text-white py-3 rounded-lg font-bold hover:bg-slate-900 transition-colors shadow-lg active:scale-[0.98]"
      >
        Buat Diskusi
      </button>
    </form>
  );
};

export default AddThreadForm;