import React from 'react';

type Props = React.PropsWithChildren<{
  step: number;
  id: string;
}>;

const StepHeading: React.FC<Props> = props => (
  <h2 id={props.id}>
    <a href={`#${props.id}`}>
      <span className="mr-3 font-bold text-gray-500">{props.step}</span>
      <span>{props.children}</span>
    </a>
  </h2>
);

export default StepHeading;
