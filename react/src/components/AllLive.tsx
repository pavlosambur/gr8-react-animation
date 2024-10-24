import { Helmet, HelmetProvider } from "react-helmet-async";

import AllLiveFootball from "./all-live/AllLiveFootball";

const AllLive: React.FC = () => {
  return (
    <HelmetProvider>
      <div className="flex w-full max-w-5xl select-none flex-col justify-start bg-[var(--background-secondary)] px-1">
        <Helmet>
          <title>All live</title>
        </Helmet>
        <AllLiveFootball />
      </div>
    </HelmetProvider>
  );
};

export default AllLive;
