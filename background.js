// background.js (Manifest V3 service worker)

const MENU_ID = "yt-open-without-playlist";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: "Open video in new tab (no playlist)",
    contexts: ["link", "page"], // "page" lets you use it even if link URLs are weird
  });
});

// Remove playlist/session-ish parameters. Add/remove as you like.
function stripYouTubePlaylistParams(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    // If it's not a valid URL, just return it unchanged.
    return rawUrl;
  }

  // Only touch YouTube URLs
  const host = url.hostname.replace(/^www\./, "");
  const isYouTube = host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be";
  if (!isYouTube) return rawUrl;

  // If it's youtu.be short link, it can still carry params like ?list=...
  // We'll strip them the same way.

  const paramsToDelete = [
    "list",
    "index",
    "start_radio",
    "pp", // sometimes used in feed contexts
    "si", // tracking param often present in share links
    "feature", // often not needed; optional to delete
  ];

  for (const p of paramsToDelete) {
    url.searchParams.delete(p);
  }

  // Also normalize "watch" URLs that might be embedded in weird forms.
  // If it's a youtube.com URL and has a v=, keep it. If it doesn't, just return.
  if (host.endsWith("youtube.com")) {
    if (url.pathname === "/watch") {
      const v = url.searchParams.get("v");
      if (!v) return rawUrl;
      // Keep only v and t (optional), strip everything else
      const t = url.searchParams.get("t");
      url.search = "";
      url.searchParams.set("v", v);
      if (t) url.searchParams.set("t", t);
    }
  }

  return url.toString();
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID) return;

  // Prefer the link URL if the user clicked a link.
  // Fall back to the page URL (useful when YouTube's link is "special" but page has the real URL).
  const candidate = info.linkUrl || info.pageUrl;
  if (!candidate) return;

  const cleaned = stripYouTubePlaylistParams(candidate);

  chrome.tabs.create({
    url: cleaned,
    active: true, // switch to the new tab
  });
});
