import { PrimeReactProvider } from 'primereact/api';
import AppRouter from 'src/routes';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import ToastContainer from './assets/components/Toast';
import 'src/assets/styles/global.css';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <ToastContainer />
        <AppRouter />
      </PrimeReactProvider>
    </Provider>
  );
}

export default App;
