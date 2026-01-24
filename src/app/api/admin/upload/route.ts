import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary using a stream
        const result = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto", // Automatically detect image or video
                    folder: "timgift_products", // Optional: organize in a folder
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            // Write buffer to stream
            uploadStream.end(buffer);
        });

        return NextResponse.json({ url: result.secure_url });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
