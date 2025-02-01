import { useAppDispatch } from '../app/hooks';
import { setIsTranslated } from '../features/translationSlice';
import { Button, Container } from 'react-bootstrap';
import './TranslateButtonSection.css'; // Import the new CSS file

function StartOverSection() {
    const dispatch = useAppDispatch();
    return (
        <section className="translate-button-container">
            <Container className="d-flex justify-content-center">
                <Button className="translate-button"
                    onClick={() => dispatch(setIsTranslated(false))}>
                    Start Over
                </Button>
            </Container>
        </section>
    );
}

export default StartOverSection;
