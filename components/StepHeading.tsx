import React from 'react';

type Props = React.PropsWithChildren<{
  step: number;
}>;

const StepHeading: React.FC<Props> = props => (
  <div className="flex items-center">
    <div className="flex-shrink-0 flex items-center justify-center mr-3 rounded-full text-base bg-indigo-600 w-8 h-8 font-bold text-white leading-none">
      {props.step}
    </div>
    <div>{props.children}</div>
  </div>
);

export default StepHeading;
