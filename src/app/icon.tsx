import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Main Green Box Background */}
                    <rect x="0" y="0" width="100" height="100" rx="20" fill="#16A34A" />

                    {/* The "T" shape - White */}
                    <path
                        d="M25 25 H75 V40 H58 V75 H42 V40 H25 V25 Z"
                        fill="white"
                    />

                    {/* The "G" accent */}
                    <path
                        d="M65 55 H75 V75 H45 V80 H80 V55 H65 Z"
                        fill="white"
                        opacity="0.9"
                    />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    );
}
