import { useDispatch } from 'react-redux';
import { setTranslationLanguage } from '../features/translationSlice';
import { Form, Container } from 'react-bootstrap';
import './LanguageSelectionSection.css'; // Import the new CSS file

function LanguageSelectionSection() {
    const dispatch = useDispatch();
    return (
        <section className="language-selection-container">
            <Container>
                <h2 className="language-selection-title">Select language 👇</h2>
                <div className="language-options">
                    <Form.Check 
                        type="radio" 
                        id="french"
                        name="language" 
                        value="French" 
                        label={<><span>French</span> <span className="flag-icon">🇫🇷</span></>} 
                        className="language-option" 
                        onChange={(e) => dispatch(setTranslationLanguage(e.target.value))}
                    />
                    <Form.Check 
                        type="radio" 
                        id="spanish"
                        name="language" 
                        value="Spanish" 
                        label={<><span>Spanish</span> <span className="flag-icon">🇪🇸</span></>} 
                        className="language-option"
                        onChange={(e) => dispatch(setTranslationLanguage(e.target.value))} 
                    />
                    <Form.Check 
                        type="radio" 
                        id="japanese"
                        name="language" 
                        value="Japanese" 
                        label={<><span>Japanese</span> <span className="flag-icon">🇯🇵</span></>} 
                        className="language-option"
                        onChange={(e) => dispatch(setTranslationLanguage(e.target.value))} 
                    />
                </div>
            </Container>
        </section>
    );
}

export default LanguageSelectionSection;
