import { useEffect, useRef } from 'react';

type Handler = (e: Event) => void;

export function useEventListener(
  eventName: string,
  handler: Handler,
  useCapture = false,
  container: EventTarget,
) {
  const savedHandler = useRef<Handler | null>(null);

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
