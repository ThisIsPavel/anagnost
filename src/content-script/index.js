import {
  getTextContent,
  processChildren,
  shouldSkip,
} from "./speech-engine/handlers";
import SPEECH_RULES from "./speech-engine/rules.config";
import { speak } from "./speech-engine/tts";

chrome.runtime.onMessage.addListener((request) => {
  console.log("asd");
  if (request.action === "read") {
    processElement(document.body);
  } else if (request.action === "stop") {
    window.speechSynthesis.cancel();
  }
});

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
