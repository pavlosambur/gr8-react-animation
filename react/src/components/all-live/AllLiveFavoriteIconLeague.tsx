import React, { useState } from "react";
import Cookies from "js-cookie";

const AllLiveFavoriteIconLeague: React.FC<{
  size: number;
  leagueId: string;
  onClick: () => void;
}> = ({ size, leagueId, onClick }) => {
  const [isClicked, setIsClicked] = useState(() => {
    const savedState = Cookies.get(`favoriteIconState-${leagueId}`);
    return savedState ? JSON.parse(savedState) : false; // Загружаем состояние из куки или начальное false
  });

  const handleClick = () => {
    const newState = !isClicked;
    setIsClicked(newState); // Меняем состояние при клике
    Cookies.set(`favoriteIconState-${leagueId}`, JSON.stringify(newState), {
      expires: 365,
    }); // Сохраняем состояние в куки

    onClick(); // Вызываем функцию изменения приоритета
  };

  return (
    <div
      className={`flex w-${size} h-${size} group cursor-pointer`}
      onClick={handleClick}
    >
      <span>
        <svg
          className={`w-${size} h-${size} transition-colors duration-300 ${
            isClicked
              ? `fill-[var(--icon-hover-v1)] sm:group-hover:fill-[var(--icon-main-v1)]`
              : `fill-[var(--icon-main-v1)] sm:group-hover:fill-[var(--icon-hover-v1)]`
          }`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isClicked ? (
            <path d="M11.9499 2C11.0484 2 10.7479 4 8.94491 8.3H3.43573C1.83306 8.3 1.53256 9.2 2.73456 10.2L7.04174 14C6.14024 17.6 4.23707 21 5.9399 21C6.74124 21 7.24207 20.4 11.9499 17.5C16.6578 20.4 17.1586 21 17.9599 21C19.6628 21 17.7596 17.6 16.8581 14L21.2654 10.2C22.4674 9.2 22.1669 8.3 20.5643 8.3H14.9549C13.1519 4.1 12.9516 2 11.9499 2Z" />
          ) : (
            <path d="M11.9499 6.1L13.5526 10.3H18.0601L14.5543 13.3L15.8564 17.6L11.9499 15.1L8.04341 17.6L9.34558 13.3L5.83974 10.3H10.3472L11.9499 6.1ZM11.9499 2C11.0484 2 10.7479 4 8.94491 8.3H3.43573C1.83306 8.3 1.53256 9.2 2.73456 10.2L7.04174 14C6.14024 17.6 4.23707 21 5.9399 21C6.74124 21 7.24207 20.4 11.9499 17.5C16.6578 20.4 17.1586 21 17.9599 21C19.6628 21 17.7596 17.6 16.8581 14L21.2654 10.2C22.4674 9.2 22.1669 8.3 20.5643 8.3H14.9549C13.1519 4.1 12.9516 2 11.9499 2Z" />
          )}
        </svg>
      </span>
    </div>
  );
};

export default AllLiveFavoriteIconLeague;
