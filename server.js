const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3002;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Resend Configuration
// Configured via process.env.RESEND_API_KEY in Render.com Environment Variables
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'admin@precisionalleledx.in';
const RESEND_FROM_EMAIL = process.env.RESEND_FROM || 'Precision Allele.Dx <onboarding@resend.dev>';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function handleContactInquiry(request, response) {
  let body = '';
  request.on('data', chunk => {
    body += chunk;
    if (body.length > 1e6) {
      request.destroy();
    }
  });

  request.on('end', async () => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-Type', 'application/json');

    try {
      const data = JSON.parse(body || '{}');
      const { name, email, message } = data;

      if (!email || !email.includes('@')) {
        response.writeHead(400);
        return response.end(JSON.stringify({ success: false, error: 'A valid email address is required.' }));
      }

      if (!name || !name.trim()) {
        response.writeHead(400);
        return response.end(JSON.stringify({ success: false, error: 'Please enter your name.' }));
      }

      if (!RESEND_API_KEY) {
        console.error('[Configuration Error] RESEND_API_KEY environment variable is not set.');
        response.writeHead(500);
        return response.end(JSON.stringify({
          success: false,
          error: 'Email service is not yet configured. Please set RESEND_API_KEY in your hosting environment.'
        }));
      }

      const safeName = escapeHtml(name.trim());
      const safeEmail = escapeHtml(email.trim());
      const safeMessage = escapeHtml(message ? message.trim() : 'No inquiry message provided.');
      const receivedDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' }) + ' IST';

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #0088ff 0%, #7b2fbe 100%); padding: 28px 24px; color: #ffffff;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.85; margin-bottom: 4px;">Precision Allele.Dx</div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">New Customer Inquiry</h1>
          </div>
          <div style="padding: 28px 24px;">
            <div style="margin-bottom: 20px;">
              <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.8px; color: #64748b; margin-bottom: 4px;">From</div>
              <div style="font-size: 16px; font-weight: 600; color: #0f172a;">${safeName}</div>
            </div>
            <div style="margin-bottom: 20px;">
              <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.8px; color: #64748b; margin-bottom: 4px;">Email Address</div>
              <div style="font-size: 15px; color: #0066ff;"><a href="mailto:${safeEmail}" style="color: #0066ff; text-decoration: none;">${safeEmail}</a></div>
            </div>
            <div style="margin-bottom: 20px;">
              <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.8px; color: #64748b; margin-bottom: 4px;">Received At</div>
              <div style="font-size: 14px; color: #475569;">${receivedDate}</div>
            </div>
            <div style="margin-bottom: 12px;">
              <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.8px; color: #64748b; margin-bottom: 6px;">Customer Query / Message</div>
              <div style="background-color: #f8fafc; border-left: 4px solid #0088ff; padding: 14px 18px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${safeMessage}</div>
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 16px 24px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0;">
            Hit <strong>Reply</strong> in your email client to respond directly to ${safeEmail}.
          </div>
        </div>
      `;

      console.log(`[Contact Form] Dispatching inquiry from "${name}" <${email}> via Resend...`);

      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: RESEND_FROM_EMAIL,
          to: [NOTIFICATION_EMAIL],
          reply_to: email.trim(),
          subject: `[New Inquiry] ${name.trim()} via Precision Allele.Dx`,
          html: htmlContent
        })
      });

      const resendData = await resendResponse.json();

      if (!resendResponse.ok) {
        console.error('[Resend Error]', resendData);
        response.writeHead(resendResponse.status || 500);
        return response.end(JSON.stringify({
          success: false,
          error: resendData.message || 'Failed to dispatch email via Resend.'
        }));
      }

      console.log('[Resend Success] Email delivered with ID:', resendData.id);
      response.writeHead(200);
      return response.end(JSON.stringify({
        success: true,
        message: 'Your inquiry has been sent successfully! Our team will get back to you shortly.',
        id: resendData.id
      }));

    } catch (err) {
      console.error('[Server Error in Contact Handler]', err);
      response.writeHead(500);
      return response.end(JSON.stringify({
        success: false,
        error: 'An internal error occurred while processing your inquiry.'
      }));
    }
  });
}

const server = http.createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return response.end();
  }

  // API Endpoint: /api/contact or /api/inquiry
  const cleanUrl = request.url.split('?')[0];
  if (request.method === 'POST' && (cleanUrl === '/api/contact' || cleanUrl === '/api/inquiry')) {
    return handleContactInquiry(request, response);
  }

  // Static File Serving
  let filePath = path.join(PUBLIC_DIR, cleanUrl === '/' ? 'index.html' : cleanUrl);
  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        response.writeHead(500);
        response.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Precision Allele.Dx server running on port ${PORT}`);
});
