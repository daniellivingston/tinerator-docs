import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';

export default initialValue => {
  const ref = useRef(initialValue);

  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current, false);
    }
  }, [ref]);

  return ref;
};
