import { PrimeReactProvider } from 'primereact/api';
import AppRouter from 'src/routes';

function App() {
  return (
    <PrimeReactProvider>
      <AppRouter />
    </PrimeReactProvider>
  );
}

export default App;
