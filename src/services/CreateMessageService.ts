import { io } from "../app";
import prismaClient from "../prisma"

class CreateMessageService {
    async execute(message: string, user_id: string) {
        const saveMessage = await prismaClient.message.create(
            {
                data: {
                    message,
                    user_id
                },
                include: {
                    user: true
                }
            }
        )
        const infoWS = {
            message: saveMessage.message,
            user_id: saveMessage.user,
            created_at: saveMessage.created_at,
            user: {
                name: saveMessage.user.name,
                avatar_url: saveMessage.user.avatar_url,
            }
        }
        io.emit("new_message", infoWS)
        return saveMessage;
    }
}

export { CreateMessageService }