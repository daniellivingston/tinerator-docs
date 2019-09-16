export default props => (
  <div className="flex items-center">
    <div className="flex items-center justify-center mr-3 text-lg bg-green-200 w-10 h-10 rounded-full font-bold text-green-700">
      {props.step}
    </div>
    <div>{props.children}</div>
  </div>
);
