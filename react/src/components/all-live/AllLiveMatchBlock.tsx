import AllLiveMatchData from "./AllLiveMatchData";

const AllLiveMatchBlock: React.FC<{ match: any }> = ({ match }) => {
    return (
        <div className="flex flex-row w-full first:border-t-0 border-t-[var(--divider-main)] px-4 gap-2">
            <AllLiveMatchData
                outcomeCounter={match.EC}
                team1IMG={match.O1IMG}
                team2IMG={match.O2IMG}
                team1Name={match.O1E}
                team2Name={match.O2E}
                team1Score={match.SC.FS.S1 ?? 0}
                team2Score={match.SC.FS.S2 ?? 0}
            />
        </div>
    );
};

export default AllLiveMatchBlock;
