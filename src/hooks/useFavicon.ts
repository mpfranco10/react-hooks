import { useEffect } from "react";

export const UI_DEV_ICON = "https://ui.dev/favicon/favicon-32x32.png";
export const BYTES_ICON = "https://bytes.dev/favicon/favicon-32x32.png";
export const NEWSLETTER_ICON =
  "https://reactnewsletter.com/favicon/favicon-32x32.png";

export const useFavicon = (url: string) => {
  useEffect(() => {
    let link: HTMLLinkElement | null =
      document.querySelector(`link[rel~="icon"]`);

    if (!link) {
      link = document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "icon";
      link.href = url;
      document.head.appendChild(link);
    } else {
      link.href = url;
    }
  }, [url]);
};
