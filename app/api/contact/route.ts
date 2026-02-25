import { NextRequest, NextResponse } from 'next/server';

const API_DOMAIN = 'https://www.maxedunetwork.vn';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_DOMAIN}/manage/api/contact/send-contact-from-landingpage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        source: 'demoapp',
      }),
    });

    const contentType = response.headers.get('content-type');
    let data;

    const responseText = await response.text();
    
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error sending contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
