export const getPersonalData = async (taskHash: string) => {
    const data = await fetch(`https://api.chatbullet.com/api/v1/bot/readTask/public/${taskHash}`, {
        method: "GET",
    });

    return await data.json();
};
