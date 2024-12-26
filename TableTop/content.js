chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "edit") {
      // Example: Change background color
      document.body.style.backgroundColor = 'lightblue';
      
      // Example: Modify HTML
      const header = document.createElement('h1');
      header.textContent = 'Modified by My Extension';
      document.body.prepend(header);
      
      // Example: Add custom CSS
      const style = document.createElement('style');
      style.textContent = `
        body { font-family: Arial, sans-serif; }
        h1 { color: red; }
      `;
      document.head.appendChild(style);
      
      // Example: Inject custom JavaScript
      const script = document.createElement('script');
      script.textContent = `
        console.log('Custom JavaScript injected by My Extension');
      `;
      document.body.appendChild(script);
    }
  });
  