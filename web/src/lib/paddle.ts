import { initializePaddle } from "@paddle/paddle-js";

export const paddle = initializePaddle({
    environment: "sandbox",
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!
});