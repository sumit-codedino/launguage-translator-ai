import { useAppSelector } from "../app/hooks";

import Header from "../components/Header";
import LanguageSelectionSection from "../components/LanguageSelectionSection";
import TextInputSection from "../components/TextInputSection";
import TranslateButtonSection from "../components/TranslateButtonSection";
import StartOverSection from "../components/StartOverSection";
import TranslatedTextSection from "../components/TranslatedTextSection"

;
function Home() {

    const isTranslated = useAppSelector((state) => state.translation.isTranslated);

    if(isTranslated) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center">
              <Header />
              <main className="w-full max-w-md mt-8">
                <TextInputSection />
                <TranslatedTextSection />
                <StartOverSection />
              </main>
            </div>
          );
    }


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
          <Header />
          <main className="w-full max-w-md mt-8">
            <TextInputSection />
            <LanguageSelectionSection />
            <TranslateButtonSection />
          </main>
        </div>
      );
}

export default Home