
import './App.css';
import Counter from './store/slices/Counter';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BodyComponent from './Components/BodyComponent';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReduxLearning from './Components/ReduxLearning/ReduxLearning';
import LoginForm from './Components/LoginForm/LoginForm';
import HoldData from './Components/HoldData/HoldData';
import CSVTask from './Components/CSVTask/CSVTask';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Counter />    
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/counter" element={<BodyComponent />} />
        <Route path="/form" element={<ReduxLearning />} />
        <Route path="/HoldData" element={<HoldData />} />
        <Route path="/Task" element={<CSVTask />} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
