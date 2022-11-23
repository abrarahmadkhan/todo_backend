import * as nodemailer from 'nodemailer';

export async function NodeMail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey', // generated ethereal user
      pass: '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', // generated ethereal password
    },
  });
  const info = await transporter.sendMail({
    from: 'abrar@optimageeks.pk', // sender address
    to: 'abrarahmadkhan57@gmail.com', // list of receivers
    subject: 'New User Created', // Subject line
    text: 'Plz verify the new user and Update the Active State', // plain text body
    html: '<h4>Plz verify the new user and Update the Active State</h4>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// NodeMail().catch(console.error);
