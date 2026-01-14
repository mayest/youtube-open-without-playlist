# youtube-open-without-playlist

A minimal Chrome extension that lets you open a single YouTube video from a playlist in a new tab without being forced into playlist playback (including Watch Later).

## Why this exists

When you click a video inside a YouTube playlist (such as **Watch Later**), YouTube automatically appends playlist parameters to the URL (e.g. `list=WL`, `index=4`).  
This causes videos to play sequentially, even when autoplay is turned off.

This extension adds a simple right-click menu option that opens the selected video **without** those playlist parameters, so only the chosen video plays.

## How it works

The extension adds a custom context-menu item:

> **Open video in new tab (no playlist)**

When selected, it:

- Removes playlist-related URL parameters
- Opens the cleaned video URL in a new browser tab
- Avoids playlist autoplay entirely

No ads are blocked and no playback behavior is modified beyond removing playlist context.

## Installation (Developer Mode)

This extension is intentionally lightweight and is loaded as an unpacked extension.

1. Clone or download this repository
2. Open Chrome and navigate to: chrome://extensions
3. Enable **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the folder containing the extension files

The extension is now active.

## Usage

1. Open a YouTube playlist (e.g., Watch Later)
2. Right-click the video you want to watch
3. Select **Open video in new tab (no playlist)**

The video will open in a new tab without playlist parameters.

## Notes

- The extension reads directly from the folder it was loaded from
- If you modify the code, click **Reload** on the Extensions page
- If the folder is moved, the extension must be reloaded via **Load unpacked**

## License

MIT License
