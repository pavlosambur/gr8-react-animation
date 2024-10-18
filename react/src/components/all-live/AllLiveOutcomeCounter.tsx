const AllLiveOutcomeCounter: React.FC<{ numberOfOutcomes: number }> = ({ numberOfOutcomes }) => {
    return numberOfOutcomes > 0 ? (
        <div className="flex items-center">
            <span className="font-sf-pro-display font-medium text-[10px] leading-[14px] tracking-[0.3px] normal-case text-[var(--text-body)]">+{numberOfOutcomes}</span>
            <span className="inline-flex w-3 h-3">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.8 17.2C9.4 16.8 9.4 16.2 9.8 15.8C10.7 14.9 13.6 12 13.6 12C13.6 12 10.7 9.2 9.8 8.2C9.4 7.8 9.4 7.2 9.8 6.8C10.2 6.4 10.8 6.4 11.2 6.8C12.3 7.9 14.6 10.2 15.7 11.3C16.1 11.7 16.1 12.3 15.7 12.7C14.9 13.5 12.4 16.1 11.2 17.2C10.8 17.6 10.2 17.6 9.8 17.2Z"
                        fill="var(--icon-main)"
                    ></path>
                </svg>
            </span>
        </div>
    ) : null;
};

export default AllLiveOutcomeCounter;
