import { useEffect, useRef } from 'react';

type Options = {
  eventName: string;
  handler: (e: Event) => void;
  useCapture?: false;
  container: EventTarget;
};

export function useEventListener({
  eventName,
  handler,
  useCapture = false,
  container,
}: Options) {
  const savedHandler = useRef<Options['handler'] | null>(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!container) {
      return;
    }

    const eventListener = (event: Event) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };

    container.addEventListener(eventName, eventListener, useCapture);

    return () => {
      container.removeEventListener(eventName, eventListener, useCapture);
    };
  }, [eventName, container]);
}
