# Tiny Victories

A personal development blog built to document the projects, experiments, and lessons I encounter while learning web development.

Tiny Victories is also a full-stack portfolio project. I built the application from the ground up to practice working with React, REST APIs, authentication, databases, deployment, and responsive UI design.

## Live Demo

**[Visit Tiny Victories](https://blog-api-sable-eight.vercel.app/)**

The public site is available as a live demo.

The administration interface is kept separate from the public-facing application.

---

## About the Project

I wanted to build something that was more than a collection of tutorial exercises.

Tiny Victories gives me a place to document things I'm building while also giving me a project where I have to make the architectural and design decisions myself.

The blog currently supports:

- Creating and editing posts
- Publishing and saving posts as drafts
- Markdown-based post content
- Post tags
- Cover images
- Comments
- User authentication
- Admin-only post management
- PostgreSQL data persistence
- Responsive design
- Separate frontend and backend applications

The project is still evolving as I continue learning.

---

## Tech Stack

### Frontend

- React
- React Router
- React Markdown
- Vite
- CSS

### Backend

- Node.js
- Express
- REST API
- JWT authentication
- Multer
- Helmet
- CORS

### Database

- PostgreSQL
- Prisma ORM
- Neon

### Image Hosting

- Cloudinary

### Deployment

- Vercel — frontend
- Render — backend
- Neon — database

---

## Architecture

Tiny Victories is split into separate frontend, backend, and administration applications.

```text
                         ┌─────────────────┐
                         │     Vercel      │
                         │ React Frontend  │
                         └────────┬────────┘
                                  │
                                  │ REST API
                                  ▼
                         ┌─────────────────┐
                         │     Render      │
                         │ Express / Node  │
                         └────────┬────────┘
                                  │
                         ┌────────┴────────┐
                         │                 │
                         ▼                 ▼
                  ┌─────────────┐   ┌─────────────┐
                  │    Neon     │   │ Cloudinary  │
                  │ PostgreSQL  │   │    Images   │
                  └─────────────┘   └─────────────┘
```

The administration interface communicates with the same backend API, allowing posts to be created and managed without exposing the administration interface as part of the public-facing site.

---

## Features

### Posts

Posts contain:

- Title
- Markdown content
- Cover image
- Tags
- Author
- Created date
- Updated date
- Published/draft status

Markdown allows posts to contain formatted content such as:

~~~markdown
# Heading

## Subheading

This is **bold text**.

- List item
- Another item

> A blockquote

`inline code`
~~~

### Tags

Posts can be assigned multiple tags.

The public posts page can filter posts by tag without requiring a separate page for each category.

### Drafts

Posts can be saved without publishing them.

This allows the administration interface to be used as a basic writing workflow before content is made public.

### Authentication

The backend uses JWT-based authentication for protected administration functionality.

Passwords are stored as hashes rather than plain text.

### Comments

Visitors can leave comments on published posts.

Comments are stored in PostgreSQL and associated with their respective posts.

---

## Project Structure

The repository is organized into separate applications:

~~~text
tiny-victories/
│
├── public-client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── ...
│   └── package.json
│
├── api/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   ├── lib/
│   ├── seed.js
│   └── package.json
│
└── admin-client/
    ├── src/
    └── package.json
~~~

The public client is responsible for displaying the blog, while the backend handles data, authentication, and API requests.

The administration application provides tools for managing posts.

---

## Running Locally

### Requirements

You'll need:

- Node.js
- PostgreSQL
- A Cloudinary account if using image uploads

### 1. Clone the repository

~~~bash
git clone YOUR_REPOSITORY_URL
cd tiny-victories
~~~

### 2. Install dependencies

Install dependencies for each application:

~~~bash
cd public-client
npm install
~~~

~~~bash
cd ../backend
npm install
~~~

~~~bash
cd ../admin
npm install
~~~

### 3. Configure environment variables

Create a `.env` file in the backend:

~~~env
DATABASE_URL=your_database_url

PORT=3000

JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

SEED_ADMIN_EMAIL=your_admin_email
SEED_ADMIN_PASSWORD=your_admin_password
~~~

For the public client, configure:

~~~env
VITE_API_URL=http://localhost:3000
~~~

Never commit real credentials or `.env` files to the repository.

### 4. Set up Prisma

Run the database migrations:

~~~bash
npx prisma migrate dev
~~~

Generate the Prisma client if necessary:

~~~bash
npx prisma generate
~~~

### 5. Seed the database

The project includes a seed script for creating the initial administrator account:

~~~bash
node seed.js
~~~

### 6. Start the applications

Start the backend:

~~~bash
npm run dev
~~~

Then start the frontend:

~~~bash
npm run dev
~~~

The administration application can be started separately when needed.

---

## Database

The application uses Prisma to communicate with PostgreSQL.

The main database models are:

~~~text
User
 └── Post
      ├── Comment
      └── Tag
~~~

Posts belong to users and can contain multiple comments and tags.

The database is hosted using Neon in the production environment.

---

## Deployment

The production application is split across several services.

| Application | Service |
|---|---|
| React frontend | Vercel |
| Express backend | Render |
| PostgreSQL database | Neon |
| Image hosting | Cloudinary |

Environment variables are configured separately for each deployment.

The production frontend communicates with the deployed Express API rather than the local development server.

---

## What I Learned

This project has been especially useful because it required me to move beyond simply following tutorials.

Some of the things I've learned while building it include:

- Designing REST API endpoints
- Connecting a React frontend to an Express backend
- Managing asynchronous API requests
- Working with Prisma relationships
- Designing PostgreSQL schemas
- Implementing JWT authentication
- Handling protected routes
- Uploading and serving images
- Managing environment variables
- Deploying separate frontend and backend applications
- Configuring CORS between different domains
- Making interfaces responsive
- Using Markdown to render structured content
- Designing reusable React components

One of the biggest lessons has been that building an application involves more decisions than simply writing code.

Things like component boundaries, API structure, database relationships, content width, navigation, and responsive behavior all require decisions that aren't necessarily covered by a tutorial.

---

## Future Improvements

Tiny Victories is an ongoing project.

Some things I'd like to improve include:

- More polished responsive styling
- Better administration UI
- Improved loading and error states
- Comment moderation
- Pagination for larger numbers of posts
- Improved accessibility
- More advanced post editing functionality
- Additional filtering and search
- Automated testing

---

## Why "Tiny Victories"?

The name comes from the idea that progress doesn't always look impressive from the outside.

Sometimes a victory is getting an API endpoint working.

Sometimes it's finally understanding a CSS layout problem.

Sometimes it's just finishing something you started.

The point of the blog is to document those smaller victories along the way.

---

## Author

**Jacob**

Web development, UX design, art, games, and various experiments.

- GitHub: [PapaPlagues](https://github.com/PapaPlagues)
