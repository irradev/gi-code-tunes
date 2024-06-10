import { EventEmitter } from 'eventemitter3';
import { useEffect } from 'react';

const emitter = new EventEmitter();

// eslint-disable-next-line
export const useSub = (event: any, callback: any) => {
  const unsubscribe = () => {
    emitter.off(event, callback);
  };

  useEffect(() => {
    emitter.on(event, callback);
    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  return unsubscribe;
};

export const usePub = () => {
  // eslint-disable-next-line
  return (event: any, data: any) => {
    emitter.emit(event, data);
  };
};
