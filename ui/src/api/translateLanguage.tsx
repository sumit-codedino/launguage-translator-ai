import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const translateLanguage = async (text: string, target_language: string): Promise<string> => {
  try {
    console.log("API URL:", apiUrl);
    const response = await axios.post(`${apiUrl}/translate`, {
      text,
      target_language
    });
    return response.data.translated_text;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
};

export default translateLanguage;
