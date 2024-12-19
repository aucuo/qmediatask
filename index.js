import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Настройка CORS
app.use(cors({
    origin: "https://aucuo.github.io",
    methods: ["GET", "POST", "PUT", "DELETE"], // Укажите разрешенные методы
    credentials: true, // Если нужны куки и авторизация
}));

app.use(express.json());

const sendEmail = async (email, name, workshop) => {
    const transporter = nodemailer.createTransport({
        host: "pro.turbo-smtp.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Успешная отправка формы",
        text: `${name}, Спасибо за отправку формы! Мы подтверждаем бронь на курс ${workshop}`,
    };

    await transporter.sendMail(mailOptions);
};

app.post("/api/send-email", async (req, res) => {
    const { email, name, workshop } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Поле 'email' обязательно." });
    }

    try {
        await sendEmail(email, name, workshop);
        return res.status(200).json({ success: true, message: "Email успешно отправлен." });
    } catch (error) {
        console.error("Ошибка при отправке email:", error);
        return res.status(500).json({ success: false, message: "Ошибка отправки email." });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
