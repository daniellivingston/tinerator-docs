import React, { PropsWithChildren } from 'react';

const icon = `
  <svg width="21px" height="21px" viewBox="0 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
          <g transform="translate(0.500000, 0.500000)" stroke="#5A67D8">
              <circle cx="10" cy="10" r="10"></circle>
              <polyline points="10 14 14 10 10 6"></polyline>
              <path d="M6,10 L14,10"></path>
          </g>
      </g>
  </svg>
`;

const ArrowItem: React.FC<PropsWithChildren<{}>> = props => {
  return (
    <div className="pb-1 flex items-center">
      <div className="mr-2" dangerouslySetInnerHTML={{ __html: icon }} />
      <div>{props.children}</div>
    </div>
  );
};

export default ArrowItem;
