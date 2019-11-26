export default props => (
  <div className="flex items-center">
    <div className="flex items-center justify-center mr-3 bg-green-200 w-10 h-10 font-semibold text-green-800">
      {props.step}
    </div>
    <div>{props.children}</div>
  </div>
);
