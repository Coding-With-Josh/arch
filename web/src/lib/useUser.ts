import { useUser } from "@clerk/nextjs";

export const UserLib = () => {
    const user = useUser()
    return user
}
