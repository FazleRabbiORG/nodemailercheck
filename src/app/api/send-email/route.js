import nodemailer from 'nodemailer';
import {  NextResponse } from 'next/server';

export async function POST(request) {
    const { to, subject, text } = await request.json();
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or another email service
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS, 
        },
    });

    const mailOptions = {
        from: `"Fazle Rabbi" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
        return new NextResponse(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new  NextResponse(JSON.stringify({ error: 'Failed to send email' }), {
            status: 500,
        });
    }
}