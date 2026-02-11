import Link from "next/link";
import { ArrowRight, Trophy, TrendingUp, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function Home() {
  const latestPosts = await prisma.post.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-[#050505] px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.gray.900),theme(colors.black))] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-[#0B0B0B] shadow-xl ring-1 ring-[#333] sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#F5F5F5] sm:text-6xl">
            Winning Tips & <span className="text-[#D4AF37]">Premium</span> Analysis
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#BDBDBD]">
            Join the elite community of winners. Get access to daily expert football predictions, in-depth match analysis, and exclusive insights.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/predictions"
              className="rounded-md bg-[#D4AF37] px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#B5952F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
            >
              Get Today's Tips
            </Link>
            <Link
              href="/news"
              className="text-sm font-semibold leading-6 text-[#F5F5F5] hover:text-[#D4AF37]"
            >
              Read News <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Why Subscribe */}
      <section className="bg-[#0B0B0B] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-[#D4AF37]">Why Chibazen?</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[#F5F5F5] sm:text-4xl">
              Everything you need to stay ahead
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-[#121212] p-2 ring-1 ring-[#333]">
                  <TrendingUp className="h-6 w-6 text-[#D4AF37]" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-[#F5F5F5]">High Accuracy Tips</dt>
                <dd className="mt-2 leading-7 text-[#BDBDBD]">
                  Our expert analysts achieve over 85% success rate on premium predictions.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-[#121212] p-2 ring-1 ring-[#333]">
                  <Trophy className="h-6 w-6 text-[#D4AF37]" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-[#F5F5F5]">Major Leagues</dt>
                <dd className="mt-2 leading-7 text-[#BDBDBD]">
                  Coverage of EPL, La Liga, Champions League, and all major tournaments.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-[#121212] p-2 ring-1 ring-[#333]">
                  <ShieldCheck className="h-6 w-6 text-[#D4AF37]" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-[#F5F5F5]">Secure & Private</dt>
                <dd className="mt-2 leading-7 text-[#BDBDBD]">
                  Your data and payments are secured with industry-standard encryption.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="bg-[#121212] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#F5F5F5] sm:text-4xl">Latest News</h2>
            <p className="mt-2 text-lg leading-8 text-[#BDBDBD]">
              Stay updated with the latest transfer news and match previews.
            </p>
          </div>

          {latestPosts.length > 0 ? (
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {latestPosts.map((post) => (
                <article key={post.id} className="flex flex-col items-start justify-between">
                  <div className="relative w-full">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="aspect-[16/9] w-full rounded-2xl bg-[#0B0B0B] object-cover ring-1 ring-[#333]"
                      />
                    ) : (
                      <div className="aspect-[16/9] w-full rounded-2xl bg-[#0B0B0B] ring-1 ring-[#333] flex items-center justify-center text-[#333]">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <time dateTime={post.publishedAt?.toISOString()} className="text-[#666]">
                        {post.publishedAt?.toLocaleDateString()}
                      </time>
                      <span className="relative z-10 rounded-full bg-[#1a1a1a] px-3 py-1.5 font-medium text-[#D4AF37] hover:bg-[#333]">
                        {post.category}
                      </span>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-[#F5F5F5] group-hover:text-[#D4AF37]">
                        <Link href={`/news/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#BDBDBD]">
                        {post.excerpt || "No excerpt available."}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#BDBDBD]">No news available at the moment.</p>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link
              href="/news"
              className="text-sm font-semibold leading-6 text-[#D4AF37] hover:text-[#B5952F]"
            >
              View all posts <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
