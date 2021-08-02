import { useState } from 'react';

const useToggle = (initialVal = false) => {
    const [val, setVal] = useState(initialVal);
    const toggle = () => {
        setVal(prev => !prev);
    };
    
  return [val, toggle];
};

export default useToggle;

