import { DEFAULT_READING_MODE } from "../constant/defaultValue";
import { getValueFromStorage } from "../core/storage";
import {
  getTextContent,
  processChildren,
  shouldSkip,
} from "./speech-engine/handlers";
import SPEECH_RULES from "./speech-engine/rules.config";
import { speak } from "./speech-engine/tts";

let isAltPressed = false;

chrome.runtime.onMessage.addListener(async (request) => {
  console.log("asd");
  if (request.action === "read") {
    processElement(document.body);
  } else if (request.action === "stop") {
    window.speechSynthesis.cancel();
  } else if (request.action === "switchReadingMode") {
    const { checkbox: isBlockReadingMode } = await getValueFromStorage(
      DEFAULT_READING_MODE.id
    );
    document.removeEventListener("keydown", handleAltKey, true);
    document.removeEventListener("keyup", handleAltKey, true);
    document.removeEventListener("click", handleClickWithAlt, true);
    document.body.removeEventListener("mouseover", handleMouseOver, true);
    document.body.removeEventListener("mouseout", handleMouseOut, true);

    if (isBlockReadingMode) {
      document.body.addEventListener("mouseover", handleMouseOver, true);
      document.body.addEventListener("mouseout", handleMouseOut, true);
    }
  }
});
// TODO: refactor handlers
function handleAltKey(e) {
  isAltPressed = e.type === "keydown" && e.key === "Alt";
}

function handleClickWithAlt(e) {
  if (isAltPressed && e.button === 0) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    processElement(e.target);
  }
}

function handleMouseOver(e) {
  const element = e.target;
  element.style.outline = "2px solid #000";
  document.addEventListener("keydown", handleAltKey, true);
  document.addEventListener("keyup", handleAltKey, true);
  document.addEventListener("click", handleClickWithAlt, true);
}

function handleMouseOut(e) {
  const element = e.target;
  element.style.outline = "";
}

window.addEventListener("beforeunload", stopReading);

function stopReading() {
  window.speechSynthesis.cancel();
  window.removeEventListener("beforeunload", stopReading);
}

export function processElement(element) {
  if (shouldSkip(element)) return;

  const tagName = element.tagName.toLowerCase();
  const handler = SPEECH_RULES.TAGS[tagName];

  if (handler) {
    handler(element);
  } else {
    if (element.children.length === 0 && getTextContent(element)) {
      speak(getTextContent(element));
    } else {
      processChildren(element);
    }
  }
}
