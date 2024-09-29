import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import AllLive from "./components/All-live";

const App: React.FC = () => {
    return (
        <div className="flex justify-center">
            <Routes>
                {/* Главная страница */}
                <Route path="/" element={<Main />} />
                <Route path="/en/all-live" element={<AllLive />} />
            </Routes>
        </div>
    );
};

export default App;
