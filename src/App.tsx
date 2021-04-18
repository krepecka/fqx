import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import './App.css';

import ENoteDetailsForm from './components/ENoteDetailsForm';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <ENoteDetailsForm />
      </div>
    </LocalizationProvider>
  );
}

export default App;
