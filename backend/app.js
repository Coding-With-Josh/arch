import express from "express"
import { PORT } from "./config/env.js";
import { createClerkClient } from '@clerk/express'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

const userList = await clerkClient.users.getUserList()

console.log(userList)

const app = express();

app.get('/', (req, res) => {
    res.send(`All users on the app ${userList.data[0].fullName}`);
});

app.listen(PORT, () => {
    console.log(`Arch Backend API is running on http://localhost:${PORT}`)
})

export default app;