import { useState } from "react";

function oldSchoolCopy(text: string) {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
}

export const useCopyToClipboard = (): [
  string,
  (textToCopy: string) => void
] => {
  const [copiedText, setCopiedText] = useState<string>("");

  const copyToClipboard = (textToCopy: string) => {
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(textToCopy);
      } catch (error) {
        oldSchoolCopy(textToCopy);
      } finally {
        setCopiedText(textToCopy);
      }
    };
    handleCopy();
  };

  return [copiedText, copyToClipboard];
};
