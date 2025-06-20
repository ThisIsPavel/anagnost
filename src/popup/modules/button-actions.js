import { updateButtonState } from "./dom.js";
import { sendCommandToCurrentContent } from "./extension-messaging.js";
import { setValueInStorage } from "@/core/storage/index.js";

export async function handleButtonClick({
  isReadingState,
  action,
  extraDataAction = {},
}) {
  try {
    await setValueInStorage("isReading", isReadingState);
    await updateButtonState();
    await sendCommandToCurrentContent(action, extraDataAction);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}
