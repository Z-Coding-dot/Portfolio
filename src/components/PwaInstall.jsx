import { useId, useState, useSyncExternalStore } from 'react';
import { FiCheck, FiDownload, FiShare } from 'react-icons/fi';
import { installStore } from '../pwa/installStore';
import './PwaInstall.css';

const PwaInstall = () => {
  const { installed, canPrompt, isAppleMobile } = useSyncExternalStore(
    installStore.subscribe, installStore.getSnapshot, installStore.getServerSnapshot,
  );
  const [busy, setBusy] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const instructionsId = useId();

  const install = async () => {
    if (busy) return;
    if (!canPrompt) {
      setShowInstructions((visible) => !visible);
      return;
    }
    setShowInstructions(false);
    setBusy(true);
    try {
      const outcome = await installStore.prompt();
      if (outcome === 'unavailable') setShowInstructions(true);
    } finally {
      setBusy(false);
    }
  };

  if (!installed && !canPrompt && !isAppleMobile && !busy && !showInstructions) return null;

  return (
    <div className="pwa-install">
      {installed ? (
        <p className="pwa-install__installed" role="status"><FiCheck aria-hidden="true" /> App installed</p>
      ) : (
        <button
          type="button"
          className="pwa-install__button"
          disabled={busy}
          aria-busy={busy}
          aria-expanded={!canPrompt ? showInstructions : undefined}
          aria-controls={showInstructions ? instructionsId : undefined}
          onClick={install}
        >
          <FiDownload aria-hidden="true" /> {busy ? 'Opening installer...' : 'Install app'}
        </button>
      )}
      {!installed && showInstructions && (
        <div id={instructionsId} className="pwa-install__instructions" role="status">
          <p>Add to your Home Screen</p>
          {isAppleMobile ? (
            <ol>
              <li>In <strong>Safari</strong>, tap <strong>Share</strong> <FiShare aria-hidden="true" /> (in the page menu if needed).</li>
              <li>Choose <strong>Add to Home Screen</strong> (tap View More if needed).</li>
              <li>Turn on <strong>Open as Web App</strong> if shown, then tap <strong>Add</strong>.</li>
            </ol>
          ) : (
            <p>Open your browser menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>, if available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PwaInstall;
