import { useAppSelector } from "../app/hooks";
import { Form, Container } from 'react-bootstrap';
import './TextInputSection.css'; // Import the new CSS file

function TranslatedTextSection() {

    const translatedText = useAppSelector((state) => state.translation.translatedText);


    return (
        <section className="text-input-container">
            <Container>
                <h2 className="text-input-title">Translated Text 👇</h2>
                <Form>
                    <Form.Group controlId="textToTranslate">
                        <Form.Control
                            as="textarea"
                            placeholder=""
                            rows={4}
                            className="text-input-field"
                            value={translatedText}
                            disabled
                        />
                    </Form.Group>
                </Form>
            </Container>
        </section>
    );
}

export default TranslatedTextSection;
