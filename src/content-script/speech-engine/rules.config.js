import { generateHeadingRules, getTextContent, processChildren, speakList } from "./handlers";
import { speak } from "./tts";

// Специальные правила для тегов
export default {
  TAGS: {
    nav: (el) => {
      speak("Навигация");
      processChildren(el);
    },
    ol: (el) => speakList(el, "нумерованный список"),
    ul: (el) => speakList(el, "маркированный список"),
    li: (el) => speak("Пункт " + getTextContent(el)),
    a: (el) => speak("Ссылка: " + getTextContent(el)),
    h1: (el) => speak("Главный заголовок: " + getTextContent(el)),
    ...generateHeadingRules(),
    p: (el) => speak(getTextContent(el)),
    img: (el) => {
      if (el.alt) speak("Изображение: " + el.alt);
      else if (el.title) speak("Изображение: " + el.title);
    },
    table: (el) => {
      speak("Таблица с " + el.rows.length + " строками");
      if (el.caption) speak("Название таблицы: " + getTextContent(el.caption));
    },
    article: (el) => {
      speak("Статья");
      processChildren(el);
    },
    section: (el) => {
      speak("Раздел");
      processChildren(el);
    },
    main: (el) => {
      speak("Основное содержание");
      processChildren(el);
    },
    header: (el) => {
      speak("Шапка");
      processChildren(el);
    },
    footer: (el) => {
      speak("Подвал");
      processChildren(el);
    },
    button: (el) => {
      const label = el.getAttribute("aria-label") || getTextContent(el);
      if (label) speak("Кнопка: " + label);
    },
    input: (el) => {
      const label =
        el.labels?.[0]?.textContent ||
        el.getAttribute("aria-label") ||
        el.placeholder;
      if (label) speak(`Поле ${el.type}: ${label}`);
    },
    textarea: (el) => {
      const label =
        el.labels?.[0]?.textContent || el.getAttribute("aria-label");
      if (label) speak("Текстовое поле: " + label);
    },
    select: (el) => {
      const label =
        el.labels?.[0]?.textContent || el.getAttribute("aria-label");
      if (label) speak("Выпадающий список: " + label);
    },
  },
};
