/* eslint-disable no-unused-vars */
const AuthHeader = ({ Icon, title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-4">
        <Icon size={32} />
      </div>

      <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
      <p className="text-slate-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;