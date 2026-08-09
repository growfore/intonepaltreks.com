type InquiryEmailData = {
  fullName: string;
  email: string;
  phone?: string;
  destination: string;
  groupSize: string;
  startDate: string;
  experienceLevel?: string;
  message: string;
};

const LABEL: Record<string, string> = {
  // group size
  "1": "Solo (1 person)",
  "2": "Couple (2 people)",
  "3-5": "Small group (3–5 people)",
  "6-10": "Medium group (6–10 people)",
  "10+": "Large group (10+ people)",
  // experience
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

function row(icon: string, label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;width:30px;font-size:18px;">${icon}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
        <span style="display:block;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#9ca3af;margin-bottom:2px;">${label}</span>
        <span style="font-size:15px;color:#111827;font-weight:500;">${value}</span>
      </td>
    </tr>`;
}

export function buildInquiryEmail(data: InquiryEmailData): string {
  const groupLabel = LABEL[data.groupSize] ?? data.groupSize;
  const expLabel = data.experienceLevel
    ? (LABEL[data.experienceLevel] ?? data.experienceLevel)
    : "Not specified";

  const formattedDate = data.startDate
    ? new Date(data.startDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not specified";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Booking Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Georgia,'Times New Roman',serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- ── Header banner ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#03528d 0%,#0f77be 60%,#1b77bc 100%);padding:40px 40px 32px;text-align:center;">
              <!-- Logo / brand mark -->
              <div style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.25);border-radius:50px;padding:6px 18px;margin-bottom:20px;">
                <span style="color:#fbe108;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-family:Georgia,serif;">Into Nepal Treks</span>
              </div>
              <h1 style="margin:0 0 8px;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.3px;font-family:Georgia,serif;">
                New Booking Inquiry
              </h1>
              <p style="margin:0;color:rgba(255,255,255,0.70);font-size:14px;font-family:Georgia,serif;">
                A traveller is ready to explore — review the details below.
              </p>

              <!-- Accent line -->
              <div style="width:48px;height:3px;background:#fbe108;border-radius:2px;margin:20px auto 0;"></div>
            </td>
          </tr>

          <!-- ── Traveller name highlight ── -->
          <tr>
            <td style="background:#e3f0f9;border-bottom:1px solid #c9e2f4;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;font-family:Georgia,serif;">Inquiry from</p>
              <p style="margin:6px 0 0;font-size:22px;font-weight:700;color:#0f77be;font-family:Georgia,serif;">${data.fullName}</p>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="padding:32px 40px;">

              <!-- Trip details section -->
              <p style="margin:0 0 16px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#0f77be;font-family:Georgia,serif;">
                🏔 Trip Details
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                ${row("📍", "Destination", data.destination)}
                ${row("📅", "Start Date", formattedDate)}
                ${row("👥", "Group Size", groupLabel)}
                ${row("🧗", "Experience Level", expLabel)}
              </table>

              <!-- Contact section -->
              <p style="margin:0 0 16px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#0f77be;font-family:Georgia,serif;">
                📬 Contact Details
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                ${row("✉️", "Email", `<a href="mailto:${data.email}" style="color:#0f77be;text-decoration:none;">${data.email}</a>`)}
                ${row("📞", "Phone", data.phone || "Not provided")}
              </table>

              <!-- Message section -->
              <p style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#0f77be;font-family:Georgia,serif;">
                💬 Message
              </p>
              <div style="background:#f9fafb;border-left:3px solid #0f77be;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
                <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;font-family:Georgia,serif;">${data.message.replace(/\n/g, "<br/>")}</p>
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a
                      href="mailto:${data.email}?subject=Re: Your Trek Inquiry — ${data.destination}"
                      style="display:inline-block;background:#0f77be;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:13px 32px;border-radius:8px;font-family:Georgia,serif;letter-spacing:0.02em;"
                    >
                      Reply to ${data.fullName.split(" ")[0]} →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#374151;font-family:Georgia,serif;">Into Nepal Treks</p>
              <p style="margin:0;font-size:12px;color:#9ca3af;font-family:Georgia,serif;">
                Lakeside, Pokhara, Kaski, Nepal
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:#d1d5db;font-family:Georgia,serif;">
                This email was auto-generated from the booking inquiry form.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}
