import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Live Football | Chibazen Media",
    description: "Watch live football matches.",
};

export default function LivePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold text-[#D4AF37]">Live Football</h1>
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-[#333] bg-black shadow-lg">
                <iframe
                    src="https://yallalive.sx/page/87/"
                    className="h-full w-full border-0"
                    allowFullScreen
                    title="Live Football Stream"
                ></iframe>
            </div>
            <p className="mt-4 text-sm text-[#BDBDBD] text-center">
                Stream provided by third-party. Chibazen Media is not responsible for the content.
            </p>
        </div>
    );
}
