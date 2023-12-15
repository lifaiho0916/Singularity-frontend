import { PrimeReactProvider } from 'primereact/api';
import AppRouter from 'routes';
import { Provider } from 'react-redux';
import { store } from 'store';
import { ToastContainer } from 'components';
import 'assets/styles/global.scss';
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
