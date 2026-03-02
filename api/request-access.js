export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, brokerId } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Dynamically resolve base URL (works in preview, production and custom domains)
    const protocol =
      req.headers["x-forwarded-proto"] || "https";

    const host = req.headers.host;

    const baseUrl = `${protocol}://${host}`;

    const approveUrl =
      `${baseUrl}/api/approve?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;

    // Send Telegram notification
    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text:
            `🚀 New PrimeVerse Access Request\n\n` +
            `👤 Name: ${name}\n` +
            `📧 Email: ${email}\n` +
            `🆔 Broker ID: ${brokerId || "Not provided"}\n\n` +
            `✅ Approve:\n${approveUrl}`,
        }),
      }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Request Access Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
