export const sendEmail =
    async (email: string, name: string, workshop: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch("http://localhost:3000/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name, workshop }),
        });

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, ...data };
    } catch (error) {
        const typedError = error as Error;
        console.error("Ошибка при отправке email:", typedError.message);
        return { success: false, message: typedError.message };
    }
};
