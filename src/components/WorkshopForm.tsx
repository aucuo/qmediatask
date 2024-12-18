import './workshop-form.scss';
import {Button, Col, Form, Row} from "react-bootstrap";

const workshopList = [
    "Just", "One", "More", "Bug", "To", "Fix"
];

function WorkshopForm() {
    return (
        <>
            <div className="workshop-form">
                <div className="workshop-form__info">
                    <h1>Отправить заявку на участие в семинаре</h1>
                    <p>
                        Организаторы свяжутся с вами для подтверждения записи. Участие в семинаре <a href="#">бесплатное</a>
                    </p>
                </div>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Control type="text" placeholder="Ваше имя" required/>
                        </Col>
                        <Col md={6}>
                            <Form.Control type="email" placeholder="Контактный email" required/>
                        </Col>
                        <Col md={12}>
                            <Form.Select aria-label="Default select example" defaultValue="" required>
                                <option value="" disabled hidden>Выберите семинар</option>
                                {
                                    workshopList.map((el, index) => (
                                        <option key={index} value={el}>{el}</option>
                                    ))
                                }
                            </Form.Select>
                        </Col>
                        <Col md={12}>
                            <div className="workshop-form__bottom">
                                <p className="workshop-form__bottom-text">
                                    Все поля обязательны для заполнения
                                    Отправляя заявку, вы соглашаетесь с договором публичной оферты и политикой обработки данных.
                                </p>
                                <Button variant="primary" type="submit">Отправить</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}

export default WorkshopForm;
