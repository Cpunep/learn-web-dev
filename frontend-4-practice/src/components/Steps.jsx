function Steps() {
  const steps = [1, 2, 3, 4, 5];
  const activeStep = 3;

  return (
    <nav className="steps" aria-label="Шаги бронирования">
      <ol className="steps__list">
        {steps.map((num) => {
          const isActive = num === activeStep;
          return (
            <li
              key={num}
              className={`steps__item${isActive ? " steps__item--active" : ""}`}
            >
              <span className="steps__num">{num}</span>
              <span
                className={`steps__line${isActive ? " steps__line--active" : ""}`}
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Steps;
