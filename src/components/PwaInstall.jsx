import { useId, useState, useSyncExternalStore } from 'react';
import { FiCheck, FiDownload } from 'react-icons/fi';
import { getInstallInstructions, installStore } from '../pwa/installStore';
import './PwaInstall.css';

const PwaInstall = () => {
  const { installed, canPrompt } = useSyncExternalStore(
    installStore.subscribe, installStore.getSnapshot, installStore.getServerSnapshot,
  );
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const instructionsId = useId();

  const install = async () => {
    if (!canPrompt) {
      setMessage((previous) => previous ? '' : getInstallInstructions(window));
      return;
    }
    setMessage('');
    setBusy(true);
    const outcome = await installStore.prompt();
    setBusy(false);
    if (outcome === 'accepted') setMessage('Installation requested. Follow the browser prompt to finish.');
    else if (outcome === 'dismissed') setMessage('You can install the app later from this footer.');
    else setMessage(getInstallInstructions(window));
  };

  return (
    <div className="pwa-install">
      {installed ? (
        <p className="pwa-install__installed" role="status"><FiCheck aria-hidden="true" /> App installed</p>
      ) : (
        <>
          <button
            type="button"
            className="pwa-install__button"
            disabled={busy}
            onClick={install}
            aria-expanded={Boolean(message)}
            aria-controls={instructionsId}
          >
            <FiDownload aria-hidden="true" /> {busy ? 'Opening installer...' : 'Install app'}
          </button>
          <p id={instructionsId} className="pwa-install__instructions" role="status" hidden={!message}>
            {message}
          </p>
        </>
      )}
    </div>
  );
};

export default PwaInstall;
