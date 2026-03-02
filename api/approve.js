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
        <br/>
        <strong>1Move × PrimeVerse</strong>
      </div>
    `,
  }),
});

const emailData = await emailResponse.json();
console.log("Resend response:", emailData);

if (!emailResponse.ok) {
  throw new Error(JSON.stringify(emailData));
}
