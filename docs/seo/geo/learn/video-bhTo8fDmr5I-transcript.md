# Full transcript: Matt Canyon / Surfer - AI search & GEO

**Source:** https://www.youtube.com/watch?v=bhTo8fDmr5I  
**Video ID:** `bhTo8fDmr5I`  
**Speaker (on-video):** Matt Canyon (with Surfer)  
**Extracted:** 2026-07-31 via yt-dlp EN captions → plain text  
**Quality:** Auto/caption-derived. Expect typos (`AIdriven`, `ChatGpt`, brand names). Not a legal transcript.

**Actionable summary for Dali (robots, HTML keywords, schema):**  
→ [video-geo-html-robots-takeaways.md](./video-geo-html-robots-takeaways.md)

**What we already shipped from this video:**

| Video point | Repo action |
| --- | --- |
| robots.txt allow GPTBot / Bingbot / Google | `v2/src/app/robots.ts` |
| Important claims in raw HTML | `HomeSeoSummary` + home `metadata.keywords` |
| Schema / FAQ / structure | Blog JSON-LD (BlogPosting, FAQPage, Breadcrumb, Person) |
| Mentions / directories | `mention-sites-exact.md`, `mention-sites-ge-am.md` |
| YouTube as GEO surface | `youtube-scripts-batch1.md` (our own videos) |

---

## Cleaned continuous transcript

By this point, you know AIdriven search is transforming how users find information. And by the end of this video, you'll know how AI search works and why it's so important, practical ways to structure your site to get picked up in AI search results, and why traditional SEO is not dead, but in fact is more important than ever. My name is Matt Canyon, and I work as a growth partner helping businesses get more traffic, leads, and sales from organic search.

and I've partnered up with Surfer to help demystify AI search once and for all. See, the TLDDR version of this video is that ranking in AI search pretty much just boils down to doing good SEO with a few important nuances that can make it easier for tools like chat GPT to index and present your website. You've probably seen people claim that GEO, generative engine optimization, or AEO, answer engine optimization, is the new SEO. We just love our acronyms here in digital marketing and sales, apparently.

In fact, drop your favorite corporate acronym in the comments. I think mine's probably KPI. Just kind of rolls off the tongue. Anyway, some even say that GEO is effectively making Google obsolete. But is that true? Let's look at the data. According to Exploding Topics, Google sees roughly 16.4 billion searches per day. That's compared to ChatGpt's 1 billion queries per day. And a lot of those chat GBT messages are probably not traditional search queries like we would think of.

This figure presumably includes all the stuff like, you know, please respond to this email in a polite way or please give me a step-by-step guide on how to like this video on YouTube, which I'm just saying be super cool if you did. According to a 2025 study by the digital marketing agency Higher Visibility, 79.8% of Americans still prefer traditional search engines for their queries. Most folks just tend to stick with what they know, and that happens to be good old Google.

But make no mistake, AI search is definitely on the rise, but we have some time before it's fully adopted into the mainstream. And if you're targeting millennials or Gen Z for your products or services, you still have time, but maybe a little bit less because according to this study, those generations are much more likely to fold AI tools into their search behaviors. The good news is that GEO is less of a new discipline you have to master and more of an additional layer that you add onto your existing SEO foundation.

So, as a smart, beautiful, futurethinking marketing leader or business owner that you are, you see the writing on the wall and you know that getting into AI search tools now before they become mainstream is probably a good idea, which is why you're watching this video. Thanks. By the way, it's important to note when we say AI search, we're referring to appearing in results from generative AI tools like ChatGpt as well as Google's own AI overviews. And although both are technically powered by different large language models under the hood, the tactics we discuss in this video are very much applicable to both.

Speaking of AI overviews, Surfer released a comprehensive study looking at AI overview insights from over 400,000 searches, and the data is pretty eye opening. So definitely check that out after this video. The link will be in the description. Here's the bottom line. Generative AI platforms often pull from the top ranking search results and trusted sources to compose their answers. So strong traditional SEO is the foundation. You likely won't show up in AI responses if you don't first rank well organically.

That said, there are some specific things you can do to make your website a prime candidate for LLM consumption. We'll tackle these in a few categories. The first is writing content that AI loves. The second is technical considerations for getting picked up by AI. The third is the role of schema markup and AI search. And lastly, we'll look at authority and trust signals. But before we get into this stuff, one of the biggest things that's driven marketers absolutely bonkers about GEO is that there hasn't really been a reliable way to track it.

And if we can't generate reports and fancy graphs that go up and to the right, well, what is all this for? Tracking clicks from large language models isn't always helpful also because most folks will get the answer in a more conversational way and not end up clicking any links. So tracking brand mentions by AI, at least right now, is the best way to measure success. Surfer recently launched an AI tracker that monitors mentions of your brand or product across popular language models.

So, if you're a Surfer user, you can take a minute before implementing the tactics in this video to add your company or product name and a short description of your category. Surfer will create relevant prompts for you, and within a few minutes, you'll get a full report that updates daily. Soon, you'll be able to edit those prompts manually, and Surfer plans to add support for all popular large language models in the coming months. Okay, so now that we have a way to know where we currently stand in AI search, let's talk about writing content that AI loves.

Unsurprisingly, AI gravitates toward natural language and question focused content. AI models like chat GBT and Claude and Grock and all the rest are built on conversational text. So they naturally prefer content that sounds like a human expert explaining something. AI prioritizes comprehensive coverage following EEAT principles. That's experience, expertise, authoritiveness, and trustworthiness. One 2024 study found that well organized authoritative content like with clear sections and FAQ entries increased inclusion in AI generated answers by up to 37% on platforms like Perplexity.

Now, we don't exactly know how Google or these AI models evaluate EAT. that's a little bit mysterious, but we do have some concrete ways to demonstrate EAT in our content. And those are sharing firthand experiences or case studies wherever possible, including statistics and citing reputable sources, showcasing your credentials or industry expertise, or if you interview an industry expert, showing their industry expertise, presenting multiple perspectives on complex topics, and addressing potential objections or limitations.

Third, AI loves semantic richness and context. Rather than repeating the same keyword, use a natural variety of related terms, concepts, and entities that create a semantic web around your content. This is where I really love using Surfer's content editor. Instead of guessing which related terms to include, Surfer analyzes the top performing content and gives you a comprehensive list of semantically related keywords, NLP terms, and questions to cover.

Here are a few other content formatting considerations. First, both humans and AI appreciate well ststructured content. So, make sure you're using a clear hierarchy of headings to break content into logical sections. See, if someone asks AI a specific question that you answer in a particular section of your page, a proper heading can direct the AI to that part. Also, utilize bullet points or numbered lists for steps, tips, or lists of items. These are not only really good and and scannable for user experience, but they're easy for the AI to quote verbatim and ensure no key points are lost in a paragraph.

In fact, structured content formats like lists and tables have been shown to improve the chances of being featured in AI answers. Next, use frequently asked questions where appropriate to capture succinct information that can be easily parsed and repeated by AI search tools. For example, does your software integrate with Salesforce? Answer, yes. Our software offers a native Salesforce integration. It seems obvious, but anytime we can really hold the hand of these tools and direct them to clear answers, we're going to increase our likelihood of being featured in these AI results.

Lastly, use tables for structured information. If you have data that compares features, specs, pricing, etc., a table is an excellent way to present it. Again, not only for user experience, but also for AI as well. Structured tables can be parsed by AI, and an AI might even quote a specific cell. Okay. Next, let's talk about some technical considerations for making sure Chad GPT and other AI search tools can actually access your site because it'd be a shame if you did everything I just mentioned and they can't even get to your content.

So, that leads us to talking about crawability. Start by double-checking your robots.txt file, usually found just by typing robots.txt at the end of your domain. AI search tools typically pull information from web indexes or use their own crawlers. So, make sure you're not disallowing OpenAI's GPT bot, Google's crawlers, and Microsoft's Bingbot. By the way, did you know that Chat GPT search actually uses Bing's index? That's right, humble old Bing is making a comeback.

That means it's all the more important that you're indexed in Bing and that you submit a site map to Bing's web master tools, which by the way is a super underrated SEO tool. Bing web master tools. Check it out. To adjust a robots.txt txt file, you'll typically access it through your website's control panel, a plug-in, or a server level text editor. If you have a developer, they'll know what to do. Second, ensure your most important content is in HTML text rather than hidden behind JavaScript or buried in images or videos.

While traditional search engines have gotten better at rendering JavaScript, AI systems primarily read your raw HTML. If your key information only appears after, say, a JavaScript interaction or it's embedded within images, AI might miss it entirely. For the same reason, always include descriptive alt text for images and transcripts for videos. This makes your multimedia content accessible to AI systems. Third, optimize your site structure and speed. A clear, logical site hierarchy helps AI understand what's important on your site.

Keep your most valuable content within a few clicks of your homepage and use descriptive internal linking. You see what I mean? We're just we're talking about good SEO best practices here. Now, let's talk about the role of schema markup. If you're unfamiliar with the term schema markup is a vocabulary that tells AI and search engines in general precisely what type of information you're presenting. It's code that humans can't see, but that robots can use to quickly determine what a page is about.

Now, it's been used by SEOs for years, but according to Google, it's especially important in the age of AI. Schema markup also powers many of what Google calls rich results, which are things like knowledge panels, carousels, and any other fancy non-extual things that appear in Google search results. There are several types of schema that are particularly valuable for AI search ranking. First, you've got your organization schema that tells AI about your brand, including your name, logo, and social profiles.

You know those little knowledge graphs that will sometime appear in Google search results, those rectangles with all that really handy information about a company. Most of the time, Google is pulling that from organization schema. Now, article schema is probably the next most popular for search optimized content like blog posts. It explicitly signals the publication date, the author, the headline, all factors that help AI determine relevance and credibility.

To make sure you have the appropriate schema on your pages, I'd recommend checking out the official documentation for the types of rich results that Google supports and making sure that any of the relevant tags are applied to your pages. More often than not, these are the same types of schema that AI tools are using to identify your content. Now, implementing schema markup, of course, does not automatically guarantee that you're going to show up in rich results or in AI search results, but it does increase your odds significantly by letting these AI search tools know exactly what your content is and how they ought to present it.

So, if we look at all these things from a high level, really our goal here is to make every important piece of information on your site unambiguous to machines. If an AI can easily parse that your company is a cyber security company founded in 2020 based in New York City from your schema, it's more likely to use those facts in an answer about say cyber security startups in New York City. And not only should that information be clearly accessible from your website, but also broadcasted across the internet in as many places as possible.

See, AI models love to sample data across large knowledge sources like Wikipedia, business directories, and industry databases. Even if you don't have a full Wikipedia page, consider adding your business to Wiki data, the structured database behind Wikipedia. These are prime candidates for Google's knowledge panels and often sampled by LLM training data. Beyond that, make sure you have a presence on any and all appropriate aggregation sites like Google My Business, Bing Places, Yelp, Apple Maps, LinkedIn Company Pages, IMDb, PubMed, Crunchbase, or any other industry database in your niche.

So, to wrap up this section, Google has explicitly confirmed that there is no secret AI tag or code or trick to help you rank in Google's SGE. That's the AI overviews at the top of the SER. These tools rely on the wellestablished structured data types that we should all be using anyway as part of our SEO strategy. Now, let's talk about how building authority and trust signals directly plays into boosting your AI rankings. So, we already talked about EAT signals a while back, and that's an excellent way to build trust signals and expertise from within your content.

But that's not enough. You also need to build off-site authority signals. AI doesn't just evaluate your content in isolation. It considers what the rest of the web says about you. That means quality backlinks from respected sites, mentions in industry publications, positive reviews, and inclusion in best of lists all send powerful trust signals to AI and increase your likelihood of showing up in results. For instance, let's say you run a travel blog. If you were to be listed in an article or several articles titled top 10 travel blogs of 2025, these are roundup articles that go out and curate resources for their users.

If you were to be featured in one of these on a well-known site, that is pure gold. AI answering what are some good travel blogs might very well include yours if it saw that list, especially if that list is on a high ranking authoritative site. So proactively reach out to bloggers, journalists or industry sites that do best of roundups and pitch your inclusion. Even if you can't get a proper do follow backlink from them, just getting your brand mentioned is still very valuable because large language models are going to be sampling that data most likely and serving it up to users.

Now, third, and perhaps most importantly, is to develop comprehensive topical authority. Because when you do this, the other pieces of the puzzle tend to just fall into place. This means creating content that thoroughly covers all aspects of your niche, answering the full spectrum of questions your audience might ask. Honestly, I have found that just going out to achieve topical authority is the best way to build brand mentions and backlinks because when you look like you're an authority on a particular niche and you've covered it from every angle, that motivates people to naturally link back to your site.

Anyway, this is where Surfer's topical map comes in absolutely clutch. Topical map visually maps out your current content coverage and identifies gaps that might be undermining your authority. Remember that study on AI overviews I mentioned earlier in the video? Well, Surfer found out that AI overviews mention an average of five sources per query, and 90% of the time, Google lists eight or fewer sources. But here's the cool part. These sources can come from multiple pieces of content on the same domain, meaning you can significantly increase your chances of showing up as a source in the answer when you cover the topic from all angles.

So to summarize this section and really as an overarching theme for this video, it's important to build your website and your content as if you're trying to impress an expert human reviewer because AI is essentially an aggregate of many such reviewers. Establishing your expertise and trustworthiness not only helps traditional SEO via quality raider guidelines, influences, and things like that, but directly affects whether an LLM likes your content enough to repeat it to users.

So, I'm curious now that you know that the big secret to GEO ranking is really that there's no secret at all, just the basics of good SEO. How does that make you feel? For me, it's encouraging because it's one less thing to learn. And with tools like Surfer in your tool belt, you can tackle whatever the future of search holds without getting overwhelmed. Surfer gives you everything you need to increase your rankings in both organic and AI search. From keyword planning with topical map to creating perfectly structured content with content editor, you can identify underperforming pages through content audit.

Strengthen your site structure with automated internal linking and now even track your AI search performance with our AI tracker. At the end of the day, as Ryan Law from HFS put it in his insightful article, whether you call it GEO, LLM O, or AEO, it all boils down to just doing good SEO. So, if you want to give Surfer a try, click the link in the description to start increasing your organic search ROI today. Feel free to check out my channel for more SEO tips.

And if you want to continue leveling up your SEO knowledge, subscribe to the Surfer Academy YouTube channel and check out this video next. Happy ranking.

---

## Related

- [video-geo-html-robots-takeaways.md](./video-geo-html-robots-takeaways.md)  
- [how-seo-geo-aeo-works.md](../playbook/how-seo-geo-aeo-works.md)  
- [opportunities-next.md](../ops/opportunities-next.md)  
