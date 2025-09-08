
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_EMAIL_BODY") {
    let emailText = "";
    if (window.location.href.includes("mail.google.com")) {
      const emailBody = document.querySelector("div.a3s"); // Gmail
      emailText = emailBody ? emailBody.innerText : "";
    } else if (window.location.href.includes("outlook.live.com")) {
      const outlookBody = document.querySelector("div.ReadMsgBody") || document.querySelector("div.rpHighlightAllClass");
      emailText = outlookBody ? outlookBody.innerText : "";
    }
    sendResponse({ email: emailText });
    console.log("✅ Content script loaded on:", window.location.href);
  }
});
