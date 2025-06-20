export async function getValueFromStorage(key) {
  return await chrome.storage.local.get(key);
}

export async function setValueInStorage(key, value) {
  await chrome.storage.local.set({ [key]: value });
}

export async function initializeOption(option) {
  let result = await getValueFromStorage(option.id);
  console.log(result, "res");
  if (result[option.id] === undefined) {
    await setValueInStorage(option.id, option.value);
    return option.value;
  }
  return result[option.id];
}
