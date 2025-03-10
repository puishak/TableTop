chrome.commands.onCommand.addListener((command) => {
  // Determine which bookmark index corresponds to the command.
  let index = -1;
  switch (command) {
    case "open-bookmark-1": index = 0; break;
    case "open-bookmark-2": index = 1; break;
    case "open-bookmark-3": index = 2; break;
    case "open-bookmark-4": index = 3; break;
    case "open-bookmark-5": index = 4; break;
    case "open-bookmark-6": index = 5; break;
    case "open-bookmark-7": index = 6; break;
    case "open-bookmark-8": index = 7; break;
    case "open-bookmark-9": index = 8; break;
    default:
      console.log("Unknown command:", command);
      return;
  }

  // Retrieve bookmarks from the Bookmarks Bar (folder id "1").
  chrome.bookmarks.getChildren("1", (bookmarks) => {
    if (bookmarks && bookmarks[index] && bookmarks[index].url) {
      // Open the bookmark URL in a new tab.
      chrome.tabs.create({ url: bookmarks[index].url });
    } else {
      console.log("Bookmark not found for index", index);
    }
  });
});
