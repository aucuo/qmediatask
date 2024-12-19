import { Col, Form, Row } from "react-bootstrap";

const workshopList = ["Just", "One", "More", "Bug", "To", "Fix"];

function WorkshopFields() {
    return(
        <Row>
            <Col md={6}>
                <Form.Group className="workshop-form__group">
                    <Form.Control type="text" placeholder="Ваше имя" minLength={2} maxLength={20} required />
                    <Form.Control.Feedback tooltip type="invalid">
                        Введи свое имя
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="workshop-form__group">
                    <Form.Control type="email" placeholder="Контактный email" minLength={6} maxLength={254} required />
                    <Form.Control.Feedback tooltip type="invalid">
                        Введи настоящий email
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col md={12}>
                <Form.Group className="workshop-form__group">
                    <Form.Select aria-label="Default select example" defaultValue="" required>
                        <option value="" disabled hidden>Выберите семинар</option>
                        {workshopList.map((el, index) => (
                            <option key={index} value={el}>{el}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback tooltip type="invalid">
                        Выбери семинар
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
    )
}

export default WorkshopFields;
