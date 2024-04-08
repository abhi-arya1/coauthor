# Coauthor 

### 🏆 [SFHacks 2024 Best First-Time Hack](https://devpost.com/software/coauthor)

## Learn about Coauthor

- [DevPost](https://devpost.com/software/coauthor)
- [GitHub](https://github.com/abhi-arya1/coauthor)
- [View Site](https://coauthor.vercel.app)
  - Note that the chat boxes only run when `ngrok` is listening on a predefined constant URL, which isn't often due to resources

## Development Team 
- [Abhigyan Arya](https://abhiarya.net)
- [Rishi Srihari](https://www.linkedin.com/in/hrishikesh-srihari-3525061a1/)
- [Ivan Vuong](https://www.linkedin.com/in/ivan-vuong/)


## Inspiration
As we progress through our first year of college, we've realized how much time is spent browsing through questionable sources, hitting sketchy ".pdf" URLs, and usually resorting to reddit for a "credible" answer. There lacks a solution where both your information and notes are accessible and centralized. Moreover, it's known that the hardest part of research of the moving parts—with endless tabs, docs, and resources up, it quickly becomes a hassle. This is why we created Coauthor, a fully-deployed centralized site for all your research needs, incorporating collaborative notes, AI-powered web scraping for relevant sources, and more.

## What it does
Coauthor is a web application that allows for collaborative work with others for research and academics. Users can access their Workspaces and create beautiful dashboards, talking to our multimodal input language model, which returns a variety of data on various webpages, based on chat inputs, as well as our database. As long as the work allows, users are encouraged to share their workspace with their collaborators, and use the features of the Multimodal AI (Summaries, Search, Citations, etc) to enhance their workflow.

## How we built it
Coauthor operates with NextJS on the Vercel Platform for deployment, and is built with Typescript and TailwindCSS for the frontend and Python for the backend, with Python executing the Google Gemini, Fireworks AI, and Selenium for our data pipeline. In order to ensure security for our users' data, we used Clerk to authenticate users through every step of development, and we used it's integration with ConvexDB, a backend TypeScript platform to store user data, workspace data, and page metadata in a WebRTC-based API, tying data to unique workspace and user IDs, which are used for routing. Additionally, we built a custom query and mutation API within Convex to access and edit attributes of a user as they work.

## Challenges we ran into
- Compatibility with Selenium and AWS servers, where packages were unable to be ported over to a headless API.
- Solved by port-forwarding a server through ngrok
- Utilizing Fireworks.ai to help facilitate filtering web scraped information
- Implementing a custom Google Gemini-based Model onto the web application while maintaining its prior training and proper outputs
- Resizable and Dynamic CSS through Tailwind

## Accomplishments that we're proud of
- Creating a polished and effective landing page.
- Workspace/User Sharing, as well as WebRTC-based Workspaces, for collaborators to be on the same page, always
- Bringing together Selenium and Fireworks.ai to web scrape and parse information with keywords, while training Gemini AI to generate different output formats for data analysis.
- Meticulous Attention to detail within our site (e.g. resizable dashboard, light/dark mode, cursor-hover indicators, gradients, icons, etc)

## What we learned
- Keeping files clean and manageable where the team is able to collaboratively work on the project without merge conflicts
- Teamwork and being supportive of each other is necessary no matter how hard the roadblocks and challenges may be.
- Planning a better stack of technologies with many alternatives in case there are incompatibilities between them.

## What's next for Coauthor
- Looking into a RAG model to better hold user queries
- Making the web application much more customizable in regards to the layouts and giving the user's the ability to customize how they want it
- Improving user experience on a vast range of platforms.
- Actively keeping track of our AI Model to make sure that it is efficient and accurate
