import {
  DEFAULT_VOLUME,
  DEFAULT_LANG,
  DEFAULT_READING_MODE,
} from "@/constant/defaultValue.js";
import { handleButtonClick } from "./modules/button-actions.js";
import { getDOMElements, updateButtonState } from "./modules/dom.js";
import { initializeOption, setValueInStorage } from "@/core/storage/index.js";
import { sendCommandToCurrentContent } from "./modules/extension-messaging.js";

async function initApp() {
  const { playButton, stopButton, volume, lang, readingModeToggle } =
    getDOMElements();
  volume.value = await initializeOption(DEFAULT_VOLUME);
  lang.value = await initializeOption(DEFAULT_LANG);
  readingModeToggle.checked = await initializeOption(DEFAULT_READING_MODE);
  await updateButtonState();
  playButton.addEventListener("click", async () => {
    await handleButtonClick({
      action: "read",
      isReadingState: true,
      extraDataAction: { volume: volume.value, lang: lang.value },
    });
  });

  stopButton.addEventListener(
    "click",
    async () =>
      await handleButtonClick({
        action: "stop",
        isReadingState: false,
      })
  );

  volume.addEventListener("change", async (e) => {
    await setValueInStorage(DEFAULT_VOLUME.id, e.target.value);
  });

  lang.addEventListener("change", async (e) => {
    await setValueInStorage(DEFAULT_LANG.id, e.target.value);
  });

  readingModeToggle.addEventListener("change", async (e) => {
    await setValueInStorage(DEFAULT_READING_MODE.id, e.target.checked);
    await sendCommandToCurrentContent("switchReadingMode");
  });
}

document.addEventListener("DOMContentLoaded", () => initApp());
