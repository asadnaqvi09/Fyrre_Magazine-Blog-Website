import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "nasad8569@gmail.com",
    pass: "rfhjqayxpvrxcxkq"
  }
})

transporter.verify().then(() => {
  console.log('SMTP is ready to send emails')
}).catch(err => {
  console.error('SMTP Connection Error:', err)
})

export default transporter