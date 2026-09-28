const nodemailer = require('nodemailer');
const env = require('dotenv');

env.config();


// ===============================
// TRANSPORTER
// ===============================

const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.PASSWORD_SENDER,
    },
});


// ===============================
// VERIFY EMAIL SERVER
// ===============================

transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});


// ===============================
// SEND EMAIL
// ===============================

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Backend Ledger" <${process.env.EMAIL_SENDER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log('Message sent: %s', info.messageId);

        return info;

    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};


// ===============================
// REGISTRATION EMAIL
// ===============================

async function sendRegistrationEmail(userEmail, name) {

    const subject = 'Welcome to Backend Ledger!';

    const text = `Hello ${name},

Thank you for registering at Backend Ledger.
We're excited to have you on board!

Best regards,
The Backend Ledger Team`;

    const html = `
        <p>Hello ${name},</p>

        <p>
            Thank you for registering at Backend Ledger.
            We're excited to have you on board!
        </p>

        <p>
            Best regards,<br>
            The Backend Ledger Team
        </p>
    `;

    await sendEmail(userEmail, subject, text, html);
}


// ===============================
// TRANSACTION SUCCESS EMAIL
// ===============================

async function sendTransactionEmail(userEmail, name, amount, toAccount) {

    const subject = 'Transaction Successful!';

    const text = `Hello ${name},

Your transaction of $${amount} to account ${toAccount} was successful.

Best regards,
The Backend Ledger Team`;

    const html = `
        <p>Hello ${name},</p>

        <p>
            Your transaction of $${amount}
            to account ${toAccount} was successful.
        </p>

        <p>
            Best regards,<br>
            The Backend Ledger Team
        </p>
    `;

    await sendEmail(userEmail, subject, text, html);
}


// ===============================
// TRANSACTION FAILURE EMAIL
// ===============================

async function sendTransactionFailureEmail(
    userEmail,
    name,
    amount,
    toAccount
) {

    const subject = 'Transaction Failed';

    const text = `Hello ${name},

We regret to inform you that your transaction of $${amount}
to account ${toAccount} has failed.

Please try again later.

Best regards,
The Backend Ledger Team`;

    const html = `
        <p>Hello ${name},</p>

        <p>
            We regret to inform you that your transaction
            of $${amount} to account ${toAccount} has failed.
            Please try again later.
        </p>

        <p>
            Best regards,<br>
            The Backend Ledger Team
        </p>
    `;

    await sendEmail(userEmail, subject, text, html);
}


// ===============================
// EXPORTS
// ===============================

module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
};