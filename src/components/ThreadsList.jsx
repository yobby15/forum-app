import ThreadItem from './ThreadItem';

const ThreadsList = ({ threads }) => {
  return (
    <div className="grid gap-6">
      {threads.map((item) => (
        <ThreadItem key={item.id} thread={item} />
      ))}
    </div>
  );
};

export default ThreadsList;