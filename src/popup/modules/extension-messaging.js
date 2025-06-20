export async function sendCommandToCurrentContent(actionType, option = {}) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  await chrome.tabs.sendMessage(tab.id, {
    action: actionType,
    ...option,
  });
}
