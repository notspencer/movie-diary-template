import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Details from './pages/Details';

const App = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details />} />
    </Routes>
);

export default App;
