import React from 'react';

interface Props {
  prefix: string;
  field: string;
  errors: {
    field: string;
    message: string;
    code: string;
    properties: object;
  }[];
  [x: string]: any;
}

const ValidationError: React.FC<Props> = props => {
  const { prefix, field, errors, ...attrs } = props;

  const error = (errors || []).find(error => {
    return error.field == field;
  });

  if (!error) {
    return null;
  }

  return (
    <div {...attrs}>
      {prefix} {error.message}
    </div>
  );
};

export default ValidationError;
