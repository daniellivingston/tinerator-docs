export default props => {
  return (
    <pre className="bg-gray-800 rounded-lg px-4 py-3 overflow-auto">
      <code {...props}></code>
    </pre>
  );
};
