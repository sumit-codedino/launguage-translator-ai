import { useAppDispatch,useAppSelector } from '../app/hooks';
import {setText} from '../features/translationSlice';
import { Form, Container } from 'react-bootstrap';
import './TextInputSection.css'; // Import the new CSS file

function TextInputSection() {
    const dispatch = useAppDispatch();

    const textToTranslate = useAppSelector((state) => state.translation.text);

    return (
        <section className="text-input-container">
            <Container>
                <h2 className="text-input-title">Text to translate 👇</h2>
                <Form>
                    <Form.Group controlId="textToTranslate">
                        <Form.Control
                            as="textarea"
                            placeholder="How are you?"
                            rows={4}
                            className="text-input-field"
                            value={textToTranslate}
                            onChange={(e) => dispatch(setText(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Container>
        </section>
    );
}

export default TextInputSection;
