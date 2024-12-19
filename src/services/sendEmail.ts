export const sendEmail = async (email: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch("/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
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
