For local development, we run a copy of the supabase database locally in a docker container. To start the project, you will need to install docker from https://docs.docker.com/get-docker/ and start it on your machine.

Install yarn on your machine

You will also need git installed on your machine

From the root folder of the project
`yarn`

create .env file in the root directory of the app, refer to the .env.example for what environment variables you will need.

We are using supabase for the database in our app.

Update
`DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres this is the location for the local supabase database`

https://supabase.com/docs/guides/cli/local-development

cd into medi-apps and run the following to install supabase cli
`yarn add supabase`

If that does not work
`npm install supabase`
login to supabase NOTE: you will need the access token before you can log in npx supabase login

init supabase npx supabase init
`yarn supabase init`
or
`npx supabase init`

start supabase -- this will take a few minutes on your first start npx supabase start
`yarn supabase start`
or
`npx supabase start`

IMPORTANT when you finish developing be sure to stop supabase container with the following: npx supabase stop

once started, open your supabase desktop app and you should see the medi-records container running in docker select the drop down arrow to the left of the medi-records icon, scroll down towards the bottom of the list and you will see supabase_studio_medi_records, click on the port and it will open the local supabase instance in the browser.

Apply the prisma schema to our local database npx prisma db push NOTE: if prisma is not initialised
You may have to run something like yarn prisma init - the terminal will have the insturctions

`yarn prisma db push`
or
`npx prisma db push`

now we are creating the migration script, applying the seed data
`yarn prisma migrate dev`
or
`npx prisma migrate dev`

finally we can start the app

`yarn dev`
