import { Routes, Route, HashRouter } from "react-router-dom";
import Main from "./components/Main";
import AllLive from "./components/AllLive";

const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                {/* Главная страница */}
                <Route path="/" element={<Main />} />
                <Route path="/en/alllive" element={<AllLive />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
