import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { summary } = await req.json();
    if (!summary) {
      return NextResponse.json({ error: 'No summary provided' }, { status: 400 });
    }
    // Usar dominio de prueba de Resend para evitar problemas de verificación
    const data = await resend.emails.send({
      from: 'Folkode Chatbot <onboarding@resend.dev>',
      to: 'contactofolkode@gmail.com',
      subject: 'Resumen de conversación del chatbot',
      text: summary,
    });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    let message = 'Unknown error';
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
