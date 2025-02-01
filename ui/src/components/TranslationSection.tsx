import { Form, Container } from 'react-bootstrap';
import './TextInputSection.css'; // Import the new CSS file

function TranslationSection() {
    return (
        <section className="text-input-container">
            <Container>
                <h2 className="text-input-title">Translated Text 👇</h2>
                <Form>
                    <Form.Group controlId="textToTranslate">
                        <Form.Control
                            as="textarea"
                            placeholder="How are you?"
                            rows={4}
                            className="text-input-field"
                        />
                    </Form.Group>
                </Form>
            </Container>
        </section>
    );
}

export default TranslationSection;
