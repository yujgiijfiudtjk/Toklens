export default async function handler(req, res) {
  // প্রোফাইলের জন্য GET রিকোয়েস্ট অ্যালাও করবে
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const response = await fetch(`${process.env.PROFILE_API_BASE}/tiktok/${username}`, {
      method: 'GET',
      headers: {
        'X-Internal-Key': process.env.INTERNAL_SECRET
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
