const AllLiveMatchDataTeamInfo: React.FC<{
  teamIMG: string;
  teamName: string;
  teamScore: string;
}> = ({ teamIMG, teamName, teamScore }) => {
  return (
    <div className="flex flex-row w-full gap-2 items-center">
      <img
        className="w-6 h-6"
        src={`https://v3.traincdn.com/resized/size24/sfiles/logo_teams/${
          teamIMG[0].split(".")[0]
        }.webp`}
        alt={teamName}
      />
      <span className="flex-1 font-sf-pro text-[var(--text-title)] font-normal text-[14px] leading-[18px] tracking-[-0.15px] normal-case">
        {teamName}
      </span>
      <span className="font-sf-pro-display text-[var(--text-live)] font-semibold text-[14px] leading-[17px] tracking-[0.6px] normal-case">
        {teamScore ?? 0}
      </span>
    </div>
  );
};

export default AllLiveMatchDataTeamInfo;
