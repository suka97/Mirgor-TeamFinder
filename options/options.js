// Saves options to chrome.storage
const saveOptions = () => {
    const teams = document.getElementById('teams').value;
  
    chrome.storage.sync.set(
      { teams: teams },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { teams: '[]' },
      (items) => {
        document.getElementById('teams').value = items.teams;
      }
    );
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);