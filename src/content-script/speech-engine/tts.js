import { getValueFromStorage } from "@/core/storage/index.js";

export async function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = await window.speechSynthesis.getVoices();
  const { lang } = await getValueFromStorage("lang");
  const { volume } = await getValueFromStorage("volume");
  utterance.volume = volume;
  utterance.lang = lang;
  utterance.voice = voices.find((v) => v.lang.includes(utterance.lang));
  window.speechSynthesis.speak(utterance);
}
