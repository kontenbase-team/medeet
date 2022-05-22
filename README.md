# Medeet

Medium + Twitter = Medeet

## Links

- [Kontenabase](https://kontenbase.com)
- [Remix Docs](https://remix.run/docs)
- [Install Tailwind CSS with Remix](https://tailwindcss.com/docs/guides/remix)
- [Rewinds](https://rewinds.mhaidarhanif.com)

## Features

### What's implemented

For simplicity of this demo, these are the only features.

- Home with collection of Posts
- Link to go to the Post
- View single Post in page
- Authentication/Authorization
  - Register
  - Log in
  - Log out
  - Permission of ownership aka authorization
- Create a new Post
- Delete owned Post

### What's not implemented

- Profile page
- Complete slug of `userHandle/postSlug`

## Tech Stack

- React + Remix + React Router
  - HTML
  - CSS
  - JavaScript
  - TypeScript
- Styling:
  - Tailwind CSS
  - Vechai UI - React components for Tailwind
- Deployment:
  - Vercel
- Extras:
  - Prettier
  - ESLint
  - Cloudflare DNS

## Guide

Here are the step by step guide to develop this app.

There is a very similar tutorial (Writter, a simple Twitter clone) that you can [watch on YouTube](https://youtu.be/_aYuP92rOAk)

### Backend with Kontenbase

- Sign in and setup a new Kontenbase Project
- Know to get API URL
- Know to get API Key from the Settings
- Create a new private `posts` service and customize it to have:
  - `title`
  - `content`
  - `createdAt`
  - `createdBy`
- Customize `users` service to have:
  - `handle`
  - `createdAt`
  - `createdBy`
- Test to register new User
- Test to log in to User
- Test to create a new Post
- Test to get all Posts
- Test to get one Post by ID
- Test to delete one Post by ID
- Check Kontenbase Docs
  - Welcome
  - Getting Started
  - SDK
    - Installation
    - Import

### Development with Remix

- Generate React+Remix app with `create-remix`
  - `npx create-remix@latest`
- Initialize local Git repo
- Create a GitHub repo and push the repo
- Setup `.env` `.env.example` and Git ignore `.env` `.DS_Store`
  - `SESSION_SECRET`
  - `KONTENBASE_API_KEY`
  - `KONTENBASE_API_URL`
- Setup `package.json`
  - name
  - description
  - license
  - scripts
- Make sure to install dependencies with `npm install`
- Start development server with `npm run dev`
- Open up [http://localhost:3000](http://localhost:3000)
- Install some more app dependencies
  - `npm install dayjs invariant remix-auth remix-auth-form @kontenbase/sdk`
- Install some more development dependencies
  - `npm install -D @types/invariant prettier`
- Setup ESLint should already done by Remix
- Setup Prettier config
- TODO: Copy favicons assets and manifest
- Know that `api` folder only for `@remix-run/vercel`
- Setup `themes` config file
- Setup `types`
- Setup `components`
- Setup `utils`
- Setup `features`
- Setup `lib`
  - `kontenbase`
  - `dayjs`
- Setup `services`
  - `session.server`: Cookie session storage with Remix Server
  - `auth.server`: Authenticator from `remix-auth` and `FormStrategy` from `remix-auth-form`
  - Implement `login` and `register` with combination of Kontenbase SDK and manual HTTP request (due to the SDK cannot handle server-side call and custom request body).
- Setup Remix `root` file.
- Make sure of Remix `entry` client and server.
- Setup `routes` and assemble the `features` and `components`
  - `/index`: Collection of all Posts
  - `/register`
  - `/login`
  - `/logout`
  - `/new`: New post composer
  - `/$postId`
    - Single Post page
    - Delete an owned Post

### Deployment with Vercel

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```
