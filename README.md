# Airbnb Clone with Next.js 13, TypeScript, and MongoDB

This project is a clone of Airbnb, built with [Next.js](https://nextjs.org/) using TypeScript and MongoDB bootstrapped [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It features essential technologies and packages like [`MongoDB`](https://www.mongodb.com/docs/) for database management, [`Leaflet`](https://leafletjs.com/) for map functionality, [`Axios`](https://axios-http.com/docs/intro) for handling HTTP requests, [`bcrypt`](https://www.npmjs.com/package/bcrypt) for password hashing, [`Prisma`](https://www.prisma.io/docs) as the ORM, [`Tailwind`](https://tailwindcss.com/docs/installation) CSS for styling, [`Next-Auth`](https://next-auth.js.org/getting-started/example) for authentication, [`React Hook Form`](https://react-hook-form.com/get-started) for form handling, [`Zustand`](https://docs.pmnd.rs/zustand/getting-started/introduction) for state management, and [`Next Cloudinary`](https://cloudinary.com/guides/front-end-development/integrating-cloudinary-with-next-js#:~:text=Next%20Cloudinary%20is%20a%20community,and%20maintained%20by%20the%20community.) for cloud-based image storage.


## Getting Started

To run the Airbnb Clone project locally, follow the steps below:

#### 1. Clone the repository:

```bash
git clone <repository_url>
cd airbnb-clone-project
```
#### 2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

#### 3. Environment Variables:
Create a `.env` file in the root of the project and add the following environment variables with their respective values:

```bash
...
NEXTAUTH_SECRET=<"NEXTAUTH_SECRET">

GITHUB_ID=<YOUR_GITHUB_ID>
GITHUB_SECRET=<YOUR_GITHUB_SECRET_ID>

GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET_ID>

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<"YOUR_CLOUDINARY_CLOUD_NAME">
```
#### 4. Database Configuration:
Set up a MongoDB database and configure the connection string in your `.env` file:
```bash
DATABASE_URL=<YOUR_MONGODB_DATABASE_CONNECTION_URL>
...
```
#### 5. Prisma migrations:
```bash
npx prisma migrate dev
```
#### 6. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
#### 7. Open your browser:
The application should be running at http://localhost:3000.

