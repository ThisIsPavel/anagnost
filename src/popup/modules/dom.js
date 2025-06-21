import {
  DEFAULT_LANG,
  DEFAULT_VOLUME,
  DEFAULT_READING_MODE,
} from "@/constant/defaultValue.js";
import {
  getValueFromStorage,
  setValueInStorage,
} from "@/core/storage/index.js";

export function getDOMElements() {
  return {
    playButton: document.querySelector(".reader__playBtn"),
    stopButton: document.querySelector(".reader__stopBtn"),
    volume: document.querySelector(`#${DEFAULT_VOLUME.id}`),
    lang: document.querySelector(`#${DEFAULT_LANG.id}`),
    readingModeToggle: document.querySelector(`.${DEFAULT_READING_MODE.id}`),
  };
}

export async function updateButtonState() {
  const { isReading } = await getValueFromStorage("isReading");
  if (isReading === undefined) {
    await setValueInStorage("isReading", false);
  }
  const { playButton, stopButton } = getDOMElements();
  playButton.style.display = isReading ? "none" : "block";
  stopButton.style.display = isReading ? "block" : "none";
}
