// hook usePreviuos to get the previous value of a prop or state

import { useRef, useEffect } from 'react';

const usePrevious =(value) =>{
    const ref = useRef();
    
    useEffect(() => {
        ref.current = value;
    });
    
    return ref.current;
}

export default usePrevious;



