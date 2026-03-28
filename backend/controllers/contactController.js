const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

const createTransporter = () => {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_PORT) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const contact = await Contact.create({ name, email, subject, message });

    const transporter = createTransporter();

    if (transporter) {
      const mailOptions = {
        from: `${name} <${email}>`,
        to: process.env.CONTACT_RECEIVER || process.env.EMAIL_USER,
        subject: `New SkillMart contact: ${subject}`,
        html: `
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({ message: "Unable to send message. Please try again later." });
  }
};
