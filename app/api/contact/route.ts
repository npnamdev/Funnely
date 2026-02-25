import { NextRequest, NextResponse } from 'next/server';

const API_DOMAIN = 'https://www.maxedunetwork.vn';
//const API_DOMAIN = 'https://coding.hoola.vn';
const URL_REDIRECT = 'https://www.maxedunetwork.vn/course/khoa-hoc-vip-ai-pro-nhan-ban-1jf0eqn75';

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

    if (response.ok) {
      const responseData = typeof data === 'object' && data !== null ? data : { data };
      return NextResponse.json({
        ...responseData,
        redirectUrl: URL_REDIRECT,
      }, { status: response.status });
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
