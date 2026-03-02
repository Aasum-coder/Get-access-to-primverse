export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, name } = req.query;

    if (!email || !name) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    // Send email via Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Your PrimeVerse Access is Approved 🚀",
        html: `
          <div style="font-family: Arial; padding: 20px;">
            <h2>Welcome to PrimeVerse</h2>
            <p>Hi ${name},</p>
            <p>Your access has now been approved.</p>
            <strong>1Move × PrimeVerse</strong>
          </div>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("RESEND RESPONSE:", emailData);

    if (!emailResponse.ok) {
      return res.status(500).json({
        error: "Resend failed",
        details: emailData,
      });
    }

    // Telegram notify
    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text:
            `✅ Access Approved\n\n` +
            `👤 Name: ${name}\n` +
            `📧 Email: ${email}`,
        }),
      }
    );

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(`
      <html>
        <body style="font-family: Arial; text-align:center; padding:50px;">
          <h2>Access Approved ✅</h2>
          <p>Email has been sent to ${email}</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Approve Fatal Error:", error);
    return res.status(500).json({
      error: "Fatal server error",
      message: error.message,
    });
  }
}
