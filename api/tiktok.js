export default async function handler(req, res) {
  // TikTok-এর বেশিরভাগ রিকোয়েস্ট GET বা POST হতে পারে, তাই আমরা তা বুঝে নেব
  const { route, url } = req.query;
  const targetUrl = `${process.env.TIKTOK_API_BASE}/${route || 'download'}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Key': process.env.INTERNAL_SECRET
      },
      // যদি রিকোয়েস্ট বডিতে ডাটা থাকে, তা পাস করবে
      body: (req.method === 'POST') ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Backend error' });
  }
  }
