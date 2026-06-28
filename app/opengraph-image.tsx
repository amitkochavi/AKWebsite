import { ImageResponse } from 'next/og';

export const alt = 'Amit Kochavi — Business, Philanthropy & Public Service';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #13297a 0%, #0b0f1a 60%)',
          color: 'white',
          padding: '70px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'white',
              color: '#0b0f1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            AK
          </div>
          <div style={{ fontSize: 26, letterSpacing: 4, color: '#c9a24b' }}>AMIT L. KOCHAVI</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>Amit Kochavi</div>
          <div style={{ fontSize: 34, color: 'rgba(255,255,255,0.82)', marginTop: 16 }}>
            Business · Philanthropy · Public Service
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
