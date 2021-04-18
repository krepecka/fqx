import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import './App.scss';

import MainLayout from './components/MainLayout';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <MainLayout />
      </div>
    </LocalizationProvider>
  );
}

export default App;
