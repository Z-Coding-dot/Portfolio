const EMPTY_SNAPSHOT = { installed: false, canPrompt: false, isAppleMobile: false };

export function createInstallStore() {
  let snapshot = EMPTY_SNAPSHOT;
  let deferredPrompt = null;
  let activeWindow = null;
  const listeners = new Set();

  const update = (next) => {
    const merged = { ...snapshot, ...next };
    if (merged.installed === snapshot.installed && merged.canPrompt === snapshot.canPrompt
      && merged.isAppleMobile === snapshot.isAppleMobile) return;
    snapshot = merged;
    listeners.forEach((listener) => listener());
  };

  return {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => EMPTY_SNAPSHOT,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    initialize(browserWindow) {
      if (activeWindow) return () => {};
      activeWindow = browserWindow;
      const { userAgent = '', platform = '', maxTouchPoints = 0 } = browserWindow.navigator;
      update({
        isAppleMobile: /iPhone|iPad|iPod/i.test(userAgent)
          || (platform === 'MacIntel' && maxTouchPoints > 1),
      });
      const displayMode = browserWindow.matchMedia('(display-mode: standalone)');
      const checkDisplayMode = () => update({
        installed: displayMode.matches || browserWindow.navigator.standalone === true,
      });
      const onPrompt = (event) => {
        event.preventDefault();
        deferredPrompt = event;
        update({ canPrompt: true });
      };
      const onInstalled = () => {
        deferredPrompt = null;
        update({ installed: true, canPrompt: false });
      };

      checkDisplayMode();
      browserWindow.addEventListener('beforeinstallprompt', onPrompt);
      browserWindow.addEventListener('appinstalled', onInstalled);
      displayMode.addEventListener('change', checkDisplayMode);
      return () => {
        browserWindow.removeEventListener('beforeinstallprompt', onPrompt);
        browserWindow.removeEventListener('appinstalled', onInstalled);
        displayMode.removeEventListener('change', checkDisplayMode);
        activeWindow = null;
        deferredPrompt = null;
        update({ canPrompt: false, isAppleMobile: false });
      };
    },
    async prompt() {
      if (!deferredPrompt) return 'unavailable';
      const event = deferredPrompt;
      deferredPrompt = null;
      update({ canPrompt: false });
      try {
        await event.prompt();
        const choice = await event.userChoice;
        return choice.outcome;
      } catch {
        return 'unavailable';
      }
    },
  };
}

export const installStore = createInstallStore();
