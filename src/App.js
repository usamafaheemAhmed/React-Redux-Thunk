
import './App.css';
import Counter from './store/slices/Counter';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BodyComponent from './Components/BodyComponent';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReduxLearning from './Components/ReduxLearning/ReduxLearning';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Counter />    
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<BodyComponent />} />
        <Route path="/form" element={<ReduxLearning />} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
