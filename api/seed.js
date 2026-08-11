import "dotenv/config";
import { prisma } from "./lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
    const adminEmail = process.env.SEED_ADMIN_EMAIL;
    const adminPassword = process.env.SEED_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error(
            "Missing seed credentials. Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in your environment."
        );
    }

    /*
     * Reset database
     *
     * This is useful while setting up the production demo.
     * DO NOT run this script later if you have posts you want to keep.
     */
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.user.deleteMany();

    /*
     * Admin account
     */
    const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.create({
        data: {
            email: adminEmail,
            passwordHash: adminPasswordHash,
            username: "Jacob",
            role: "ADMIN",
        },
    });

    /*
     * Tags
     */
    const tagNames = [
        "web development",
        "react",
        "javascript",
        "backend",
        "prisma",
        "css",
        "ux design",
        "godot",
        "game development",
        "creative coding",
    ];

    const tags = {};

    for (const name of tagNames) {
        tags[name] = await prisma.tag.create({
            data: { name },
        });
    }

    /*
     * Posts
     */

    const posts = [];

    // 1. Tiny Victories
    posts.push(
        await prisma.post.create({
            data: {
                title: "Building Tiny Victories",
                content: `# Building Tiny Victories

Tiny Victories started as a simple idea: I wanted a place to document the things I'm building while learning web development.

I've spent a lot of time learning through courses and tutorials, but I wanted a project where I had to make the decisions myself. This blog became that project.

## Why I Built It

I wanted Tiny Victories to be more than a collection of finished projects.

A lot of the things I work on are small experiments, half-finished ideas, or lessons that only make sense after I've struggled with them for a while. I wanted somewhere to keep track of that process.

The name comes from the idea that progress doesn't always look impressive from the outside.

Sometimes a victory is getting an API endpoint working.

Sometimes it's finally understanding a CSS layout problem.

Sometimes it's just finishing something you started.

## What's Under the Hood

The application is built with a few technologies I've been learning:

- **React** for the frontend
- **Node.js** for the backend
- **Prisma** for database access
- **PostgreSQL** for persistent data
- **CSS** for the UI
- **REST APIs** for communication between the frontend and backend

One of my goals was to avoid making the project completely dependent on a tutorial. I wanted to understand why things were structured the way they were.

## What I've Learned

Building this has taught me that knowing how to write code and knowing how to build something are two different skills.

A tutorial can show you how to create a component, but it doesn't tell you whether that component should exist in the first place.

It doesn't tell you how wide a content column should be, what belongs in a navigation bar, or how much information a user actually needs.

Those decisions are where the interesting part begins.

## What's Next?

Tiny Victories will continue to change as I learn.

I'll be using it to document projects, experiments, design decisions, and whatever else I end up building.

For now, the goal is simple:

> Keep building. Keep learning. Keep the victories small enough to notice.`,
                published: true,
                authorId: admin.id,
                tags: {
                    connect: [
                        { id: tags["web development"].id },
                        { id: tags["react"].id },
                        { id: tags["backend"].id },
                    ],
                },
            },
        })
    );

    // 2. React
    posts.push(
        await prisma.post.create({
            data: {
                title: "Learning React by Building Something Real",
                content: `# Learning React by Building Something Real

React made a lot more sense to me once I stopped thinking about it as something I needed to memorize.

Instead, I started thinking about it as a way to break an interface into pieces.

## Components Changed How I Think About UI

One of the first things I noticed when working with React was how easy it is to keep adding components without really thinking about what they represent.

A button can be a component.

A post can be a component.

A list of posts can be a component.

But just because something *can* be a component doesn't necessarily mean it *should* be one.

I've been trying to get better at recognizing the boundaries that actually make an application easier to understand.

For example, the blog uses components such as:

- \`Header\`
- \`Footer\`
- \`PostList\`
- \`Post\`
- \`Comment\`
- \`Tag\`

Each one has a relatively specific responsibility.

## State Was the Bigger Lesson

React state initially felt more complicated than components.

Once I started using state for things like the currently selected tag, loading status, and fetched posts, it became easier to understand why it exists.

The important question became:

> What information does the interface need to remember?

That question is much more useful to me than simply asking where I should put a \`useState\`.

## Working With an API

The blog also forced me to understand that the frontend doesn't magically have the information it displays.

The flow is roughly:

\`\`\`
React
  ↓
API request
  ↓
Node.js server
  ↓
Prisma
  ↓
PostgreSQL
\`\`\`

The response then travels back through the same system before React updates the interface.

That sounds straightforward, but seeing the entire process working together made the architecture much easier to understand.

## The Biggest Takeaway

I'm starting to think of React less as a library I need to "learn" and more as a tool I can use to solve interface problems.

There's still a lot I don't know.

But that's part of the point of building this blog.

I don't need to know everything before I start building.`,
                published: true,
                authorId: admin.id,
                tags: {
                    connect: [
                        { id: tags["react"].id },
                        { id: tags["javascript"].id },
                        { id: tags["web development"].id },
                    ],
                },
            },
        })
    );

    // 3. Backend
    posts.push(
        await prisma.post.create({
            data: {
                title: "What I Learned Building My First Full-Stack App",
                content: `# What I Learned Building My First Full-Stack App

Building the frontend was only part of the problem.

Once I wanted Tiny Victories to actually save posts, users, comments, and tags, I needed to understand what happened after a request left the browser.

## Separating the Frontend and Backend

The application is split into two main parts.

The React application handles the interface, while an Express server handles the API.

That separation initially felt like extra complexity.

After working with it, I started to appreciate the distinction.

The frontend is responsible for asking for information and presenting it. The backend is responsible for deciding what can happen and interacting with the database.

## Authentication

The admin area was another useful lesson.

I needed a way to distinguish between someone browsing the blog and someone who is actually allowed to create or edit posts.

That led me to learning more about:

- Password hashing
- JWT authentication
- Protected routes
- Authorization
- Middleware

These were concepts that made more sense once I had an actual reason to use them.

## The Database

Prisma has been especially useful because it gives me a clear representation of how the data relates to one another.

A post belongs to an author.

A post can have multiple tags.

A post can have multiple comments.

Thinking about those relationships before writing the API made the rest of the application much easier to reason about.

## The Part I Didn't Expect

The hardest part wasn't writing individual pieces of code.

It was keeping track of how all of the pieces communicate.

A small change in the database can affect an API route. That route affects the frontend service. That service affects a component.

Building the whole thing has made me much more comfortable tracing problems through an application instead of assuming the problem must be where I first noticed it.`,
                published: true,
                authorId: admin.id,
                tags: {
                    connect: [
                        { id: tags["backend"].id },
                        { id: tags["prisma"].id },
                        { id: tags["javascript"].id },
                    ],
                },
            },
        })
    );

    // 4. CSS
    posts.push(
        await prisma.post.create({
            data: {
                title: "The Surprisingly Difficult Part of Making a Website Look Good",
                content: `# The Surprisingly Difficult Part of Making a Website Look Good

Writing the CSS for Tiny Victories has been a different kind of challenge than writing the application itself.

Getting something to work is usually straightforward.

Getting it to feel intentional is another story.

## Functionality Isn't the Same as Design

My first versions of the interface technically worked.

The navigation worked.

Posts displayed.

Buttons were clickable.

The API was returning data.

But the site still looked like a collection of elements that happened to be sitting next to each other.

That was a useful realization.

A working interface isn't automatically a good interface.

## Small Changes Add Up

I've been paying more attention to things like:

- Consistent spacing
- Maximum content widths
- Typography hierarchy
- Button shapes
- Contrast
- Hover states
- Image proportions
- Visual grouping

None of these changes are particularly complicated individually.

Together, they make the application feel much more finished.

## Learning Through Iteration

I've also learned that I don't need to get the CSS perfect on the first attempt.

I'll change a margin.

Look at it.

Change the width.

Look at it again.

Sometimes I'll undo the entire thing.

That process has actually been useful because I'm developing a better instinct for what feels balanced.

The goal isn't to make every page flashy.

It's to make the design feel deliberate.`,
                published: true,
                authorId: admin.id,
                tags: {
                    connect: [
                        { id: tags["css"].id },
                        { id: tags["ux design"].id },
                        { id: tags["web development"].id },
                    ],
                },
            },
        })
    );

    // 5. UX
    posts.push(
        await prisma.post.create({
            data: {
                title: "What Building My Own UI Taught Me About UX",
                content: `# What Building My Own UI Taught Me About UX

I've spent a lot of time studying UX design, but building my own application has made some of those ideas feel much more concrete.

When you're working through a course, it's easy to understand a principle without having to make a difficult decision with it.

A real project forces those decisions.

## Who Is This Page For?

One of the simplest questions I've started asking myself is:

> What does someone need from this page?

The answer shouldn't always be "everything."

A homepage should introduce the project.

A posts page should help someone find something interesting.

A post page should make reading comfortable.

An admin page should make managing content straightforward.

Once I started thinking about the purpose of each page, design decisions became easier.

## Designing for Myself Isn't Enough

Since I'm the person building the application, I already know how everything works.

That makes it easy to overlook confusing interactions.

Someone visiting the portfolio doesn't know where things are.

They shouldn't need to.

That has encouraged me to pay more attention to labels, hierarchy, navigation, and feedback.

## The Useful Part of Building

This is probably one of the biggest reasons I wanted a project like Tiny Victories.

UX isn't just something I want to study.

I want to practice making decisions and seeing the consequences of those decisions in an actual application.

That's much harder to fake in a tutorial project.`,
                published: true,
                authorId: admin.id,
                tags: {
                    connect: [
                        { id: tags["ux design"].id },
                        { id: tags["web development"].id },
                    ],
                },
            },
        })
    );

    // 6. Godot / creative project
    posts.push(
        await prisma.post.create({
            data: {
                title: "Why I'm Still Making Small Games",
                content: `# Why I'm Still Making Small Games

Web development has been my main technical focus lately, but I keep coming back to game development.

Part of the reason is simple: games are fun to make.

The other reason is that small games give me a different kind of programming problem.

## Keeping the Scope Small

One of the biggest lessons I've learned from experimenting with Godot is that a game idea can become enormous very quickly.

A simple idea like "make a small platformer" can turn into:

- Multiple levels
- Enemy systems
- Menus
- Save data
- Dialogue
- Art
- Sound
- Animation
- Inventory systems

Suddenly a weekend project has become a six-month project.

I'm trying to get better at recognizing when an idea is enough on its own.

## Programming Meets Art

Game development is also one of the places where my different interests overlap.

I can work on code, draw characters, experiment with music, and think about how the player experiences the game.

That makes the process feel very different from working on a traditional web application.

## Small Projects Are Still Valuable

I don't think every project needs to become a finished commercial game.

Sometimes the valuable part is figuring out how a mechanic works.

Sometimes it's learning how a tool behaves.

Sometimes it's making something silly just because it sounds fun.

That's another reason small projects fit the idea behind Tiny Victories.`,
                published: true,
                authorId: admin.id,
                tags: {
                    connect: [
                        { id: tags["godot"].id },
                        { id: tags["game development"].id },
                        { id: tags["creative coding"].id },
                    ],
                },
            },
        })
    );

    // 7. Draft
    posts.push(
        await prisma.post.create({
            data: {
                title: "Designing the Next Version of Tiny Victories",
                content: `# Designing the Next Version of Tiny Victories

This post is still being written.

There are a few things I'd like to improve before publishing it, including the admin experience, responsive layouts, and the way longer posts are displayed.

## Ideas I'm Exploring

- Better mobile navigation
- Improved post editing
- More flexible content formatting
- Better image handling
- A more polished admin dashboard

This is currently a draft while I work out what direction I want to take the project next.`,
                published: false,
                authorId: admin.id,
                tags: {
                    connect: [
                        { id: tags["web development"].id },
                        { id: tags["ux design"].id },
                        { id: tags["react"].id },
                    ],
                },
            },
        })
    );

    /*
     * Comments
     *
     * These are intentionally minimal demo comments.
     */
    await prisma.comment.createMany({
        data: [
            {
                content:
                    "I like the idea of documenting the process instead of only showing finished projects.",
                username: "Alex",
                postId: posts[0].id,
            },
            {
                content:
                    "The separation between the frontend and backend was one of the hardest parts for me to understand too.",
                username: "Sam",
                postId: posts[2].id,
            },
            {
                content:
                    "The point about functionality versus design really resonates. A working UI can still feel unfinished.",
                username: "Morgan",
                postId: posts[3].id,
            },
        ],
    });

    console.log("\nSeed complete!");
    console.log(`Admin: ${admin.username} (${admin.email})`);
    console.log(`Posts created: ${posts.length}`);
    console.log("Published posts: 6");
    console.log("Draft posts: 1");
    console.log("Comments created: 3");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });