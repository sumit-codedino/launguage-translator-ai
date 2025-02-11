import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useState } from 'react';
import { setIsTranslated , setTranslatedText} from '../features/translationSlice';
import { Button, Container, Spinner } from 'react-bootstrap';
import './TranslateButtonSection.css'; // Import the new CSS file
import translateLanguage from '../api/translateLanguage';

function TranslateButtonSection() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const text = useAppSelector((state) => state.translation.text);
    const targetLanguage = useAppSelector((state) => state.translation.translationLanguage);

    async function callTranslateAPI() {
        setLoading(true);
        try {
            const translatedText = await translateLanguage(text, targetLanguage);
            console.log('Translated text:', translatedText);
            dispatch(setTranslatedText(translatedText));
            dispatch(setIsTranslated(true));
        } catch (error) {
            console.error('Error translating text:', error);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="translate-button-container">
            <Container className="d-flex justify-content-center">
                <Button className="translate-button" onClick={callTranslateAPI} disabled={loading}>
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : isError ? 'Error' : 'Translate'}
                </Button>
            </Container>
        </section>
    );
}

export default TranslateButtonSection;
