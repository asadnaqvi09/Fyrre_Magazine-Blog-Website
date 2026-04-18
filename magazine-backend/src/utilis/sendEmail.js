import transporter from '../config/mail.js'

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Magazine" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    })
  } catch (err) {
    console.error('Email send failed:', err)
    throw new Error('Failed to send email. Check SMTP settings.')
  }
}

export default sendEmail