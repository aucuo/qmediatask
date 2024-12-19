import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Загрузка переменных окружения из .env файла

const app = express();
app.use(express.json());

// Создание отдельного обработчика для отправки email
const sendEmail = async (email: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Успешная отправка формы",
        text: "Спасибо за отправку формы! Ваши данные успешно приняты.",
    };

    await transporter.sendMail(mailOptions);
};

// Маршрут для отправки email
app.post("/api/send-email", async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Поле 'email' обязательно." });
    }

    try {
        await sendEmail(email);
        return res.status(200).json({ success: true, message: "Email успешно отправлен." });
    } catch (error) {
        console.error("Ошибка при отправке email:", error);
        return res.status(500).json({ success: false, message: "Ошибка отправки email." });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
