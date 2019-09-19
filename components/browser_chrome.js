export default ({ label, children }) => {
  return (
    <div className="mb-6 w-full">
      <div className="flex items-center p-2 bg-gray-500 rounded-t-lg">
        <div className="hidden sm:flex flex-grow-0">
          <div className="mx-1 w-3 h-3 bg-gray-700 rounded-full"></div>
          <div className="mx-1 w-3 h-3 bg-gray-700 rounded-full"></div>
          <div className="mx-1 w-3 h-3 bg-gray-700 rounded-full"></div>
        </div>
        <div className="ml-8 mr-8 sm:ml-12 sm:mr-24 flex-grow min-w-0">
          <div className="text-center text-xs text-gray-700 px-4 py-1 rounded-full bg-gray-300 font-semibold truncate overflow-auto">
            {label}
          </div>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};
