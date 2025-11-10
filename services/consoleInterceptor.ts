import eventBus from './eventBus';

export const initializeConsoleInterceptor = () => {
  const levels: (keyof Console)[] = ['log', 'warn', 'error', 'debug'];

  levels.forEach(level => {
    const original = console[level];
    console[level] = (...args: any[]) => {
      // Call original console method
      original.apply(console, args);

      // Format message for display
      const message = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return '[Unserializable Object]';
          }
        }
        return String(arg);
      }).join(' ');

      // Dispatch event for the UI
      eventBus.dispatch('consoleLog', {
        level,
        message,
        timestamp: new Date(),
      });
    };
  });

  console.log("Console interceptor initialized.");
};
