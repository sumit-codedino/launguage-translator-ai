import './App.css'
import Home from './page/Home'
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App
