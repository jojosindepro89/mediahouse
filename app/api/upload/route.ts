import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.name);
    const filename = file.name.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + ext;

    // Save to public/uploads
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    // Ensure directory exists
    try {
        await import('fs/promises').then(fs => fs.mkdir(uploadDir, { recursive: true }));
    } catch (e) {
        console.error("Error creating upload dir:", e);
    }

    const filepath = path.join(uploadDir, filename);

    try {
        await writeFile(filepath, buffer);
        const url = `/uploads/${filename}`;
        return NextResponse.json({ success: true, url, filename });
    } catch (error) {
        console.error('Error saving file:', error);
        return NextResponse.json({ success: false, message: 'Error saving file' }, { status: 500 });
    }
}
