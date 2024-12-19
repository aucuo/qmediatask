import './workshop-form.scss';
import {FormEvent, useState} from 'react';
import {Button, Collapse, Form} from "react-bootstrap";
import { WorkshopInfo } from './WorkshopInfo.tsx';
import WorkshopFields from "./WorkshopFields.tsx";
import {WorkshopSuccess} from "./WorkshopSuccess.tsx";
import {sendEmail} from "../../services/sendEmail.ts";

function WorkshopForm() {
    const [validated, setValidated] = useState(false);
    const [shake, setShake] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        setIsSubmitting(true); // Блокируем кнопку отправки

        const isValid = form.checkValidity();
        setValidated(true); // Отображаем состояние валидации

        if (!isValid) {
            // Если форма не валидна
            setShake(true);
            setTimeout(() => setShake(false), 300);
            setIsSubmitting(false);
            return;
        }

        try {
            // Отправка данных формы на сервер
            const formData = new FormData(form);
            const email = formData.get("email")?.toString() || "";
            const name = formData.get("name")?.toString() || "";
            const workshop = formData.get("workshop")?.toString() || "";
            const response = await sendEmail(email, name, workshop);

            if (response.success) {
                // Показываем успех
                setSuccess(true);
            } else {
                // Обрабатываем ошибку сервера
                setSuccess(false);

                console.error(response.message || "Ошибка отправки");
            }
        } catch (error) {
            // Обрабатываем сетевые ошибки
            console.error("Произошла ошибка:", error);
        } finally {
            setIsSubmitting(false); // Разблокируем кнопку отправки
        }
    };

    return (
        <>
            <Collapse in={!success}>
                <div className="workshop-form">
                    <span className="workshop-form__author">Made by <a href="https://github.com/aucuo" target="_blank">Jahor Šykaviec</a></span>
                    <WorkshopInfo/>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <WorkshopFields/>
                        <div className="workshop-form__bottom">
                            <p className="workshop-form__bottom-text">
                                Все поля обязательны для заполнения. Отправляя заявку, вы соглашаетесь с договором
                                публичной оферты и политикой обработки данных.
                            </p>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting} // Делаем кнопку неактивной во время проверки
                                className={shake ? "anims--shake" : ""}
                            >
                                Отправить
                            </Button>
                        </div>
                    </Form>
                </div>
            </Collapse>
            <Collapse in={success}>
            <div>
                    <WorkshopSuccess/>
                </div>
            </Collapse>
        </>
    );
}

export default WorkshopForm;
