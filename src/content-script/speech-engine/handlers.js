import { processElement } from "..";
import { SKIP_TAGS, SKIP_CLASSES, SKIP_ROLES } from "@/constant/skipTags";
import { speak } from "./tts";

// Замена символов на обычный пробел;
export function getTextContent(el) {
  return el.textContent
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\u00A0/g, " ");
}

export function processChildren(el) {
  Array.from(el.children).forEach(processElement);
}

export function speakList(el, listType) {
  const count = el.children.length;
  speak(`${listType} из ${count} пунктов`);
  processChildren(el);
}

export function generateHeadingRules() {
  const rules = {};
  for (let i = 2; i <= 6; i++) {
    rules[`h${i}`] = (el) => speak(`Подзаголовок: ${getTextContent(el)}`);
  }
  return rules;
}

export function shouldSkip(element) {
  const tag = element.tagName.toLowerCase();

  return (
    SKIP_TAGS.has(tag) ||
    element.hidden ||
    element.getAttribute("aria-hidden") === "true" ||
    SKIP_CLASSES.has(element.className) ||
    SKIP_ROLES.has(element.getAttribute("role")) ||
    element.hasAttribute("hidden") ||
    element.style.display === "none" ||
    element.style.visibility === "hidden"
  );
}
