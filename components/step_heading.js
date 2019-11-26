export default props => (
  <div className="flex items-center">
    <div className="flex items-center justify-center mr-3 text-lg bg-green-200 w-8 h-8 font-bold text-green-800">
      {props.step}
    </div>
    <div>{props.children}</div>
  </div>
);
