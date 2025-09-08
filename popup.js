
const VIRUSTOTAL_API_KEY = '4d4ef2eed1f7c9312c4ec1c182d931980e106af14b78b584a9f2d3579cd6b53f'; 
const ABUSEIPDB_API_KEY = 'e6c90696343786105b896998abfd40d148a7b6c5ea96fe415a85fda4bd158806fc4103f67a25d83e';   
document.addEventListener('DOMContentLoaded', function () {
  updateTimestamp();
  document.getElementById('analyze-btn').addEventListener('click', analyzeCurrentTabEmail);
  document.getElementById('more-info').addEventListener('click', showDetailedReport);
});

function updateTimestamp() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('time').textContent = timeString;
}

function showDetailedReport() {
  const threatLevel = document.getElementById('threat-level').textContent;
  const details = 
    "<strong>Detailed Threat Report:</strong><br><br>" +
    "<strong>Status:</strong> " + document.getElementById('threat-level').textContent + "<br>" +
    "<strong>Sender:</strong> " + document.getElementById('sender').textContent + "<br>" +
    "<strong>Links:</strong> " + document.getElementById('links').textContent + "<br>" +
    "<strong>Attachments:</strong> " + document.getElementById('attachments').textContent + "<br>" +
    "<strong>Content:</strong> " + document.getElementById('content').textContent + "<br><br>" +
    "<small>Scanned using VirusTotal & AbuseIPDB</small>";

    document.getElementById("report-details").innerHTML = details;
}

async function analyzeCurrentTabEmail() {
  setThreatLevel('warning', 'Analyzing...');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_EMAIL_BODY' }, async (response) => {
  if (chrome.runtime.lastError || !response) {
    setThreatLevel('warning', 'Email not detected');
    console.warn('No response from content script:', chrome.runtime.lastError?.message);
    return;
  }
      if (!response || !response.email) {
        setThreatLevel('warning', 'No Email Detected');
        return;
      }

      const emailText = response.email;
      let isDangerous = false;

      const keywords = [
        'urgent', 'account suspended', 'verify', 'bank', 'password', 'click here',
        'login now', 'donate', 'money prize', 'update your payment', 'unauthorized login'
      ];
      const suspiciousFound = keywords.some(word => emailText.toLowerCase().includes(word));
      document.getElementById('content').innerHTML = suspiciousFound
        ? 'Suspicious Words <i class="fas fa-exclamation-triangle"></i>'
        : 'Clean <i class="fas fa-check-circle"></i>';
      if (suspiciousFound) isDangerous = true;

      const urls = emailText.match(/https?:\/\/[^\s]+/gi) || [];
      let maliciousLink = false;
      for (let url of urls) {
        const result = await scanUrlWithVirusTotal(url);
        if (result === 'malicious') {
          maliciousLink = true;
          break;
        }
      }
      document.getElementById('links').innerHTML = maliciousLink
        ? 'Malicious Link <i class="fas fa-ban"></i>'
        : 'Verified <i class="fas fa-link"></i>';
      if (maliciousLink) isDangerous = true;

      const emailMatch = emailText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      let senderDanger = false;
      if (emailMatch) {
        const domain = emailMatch[0].split('@')[1];
        senderDanger = await checkDomainReputation(domain);
      }
      document.getElementById('sender').innerHTML = senderDanger
        ? 'Suspicious <i class="fas fa-question-circle"></i>'
        : 'Trusted <i class="fas fa-badge-check"></i>';
      if (senderDanger) isDangerous = true;

      if (isDangerous) {
        setThreatLevel('danger', 'Threats Detected!');
        updateAnalysisDetails('Suspicious', 'Check URLs', 'Possibly Unsafe', 'Warning Detected');
      } else {
        setThreatLevel('safe', 'Secure');
        updateAnalysisDetails('Trusted', 'Verified', 'None', 'Clean');
      }

      updateTimestamp();
    });
  });
}

function setThreatLevel(level, message) {
  const threatLevel = document.getElementById('threat-level');
  threatLevel.className = level;
  threatLevel.innerHTML = `<i class="fas fa-${getStatusIcon(level)}"></i> ${message}`;
}

function getStatusIcon(level) {
  switch (level) {
    case 'safe': return 'check-circle';
    case 'warning': return 'exclamation-triangle';
    case 'danger': return 'times-circle';
    default: return 'shield-alt';
  }
}

function updateAnalysisDetails(sender, links, attachments, content) {
  document.getElementById('sender').innerHTML = sender;
  document.getElementById('links').innerHTML = links;
  document.getElementById('attachments').innerHTML = attachments;
  document.getElementById('content').innerHTML = content;
}

async function scanUrlWithVirusTotal(url) {
  try {
    const res = await fetch('https://www.virustotal.com/api/v3/urls', {
      method: 'POST',
      headers: {
        'x-apikey': VIRUSTOTAL_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `url=${encodeURIComponent(url)}`
    });
    const { data } = await res.json();
    const reportRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${data.id}`, {
      headers: { 'x-apikey': VIRUSTOTAL_API_KEY }
    });
    const report = await reportRes.json();
    return report.data.attributes.stats.malicious > 0 ? 'malicious' : 'safe';
  } catch (e) {
    console.error('VirusTotal error:', e);
    return 'safe';
  }
}

async function checkDomainReputation(domain) {
  try {
    const res = await fetch(`https://api.abuseipdb.com/api/v2/check?domain=${domain}`, {
      headers: {
        'Key': ABUSEIPDB_API_KEY,
        'Accept': 'application/json'
      }
    });
    const data = await res.json();
    return data.data.abuseConfidenceScore && data.data.abuseConfidenceScore > 20;
  } catch (e) {
    console.error('AbuseIPDB error:', e);
    return false;
  }
}
    //  alert(details);
