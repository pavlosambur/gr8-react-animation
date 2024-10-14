import { Helmet, HelmetProvider } from "react-helmet-async";

import AllLiveFootball from "./all-live/AllLiveFootball";

const AllLive: React.FC = () => {
    return (
        <HelmetProvider>
            <div className="flex flex-col w-full bg-[var(--background-secondary)] justify-start px-1 select-none">
                <Helmet>
                    <title>All live</title>
                </Helmet>
                <AllLiveFootball />
            </div>
        </HelmetProvider>
    );
};

export default AllLive;
