function Header() {
  return (
    <>
      <header className="header">
        <a href="#" className="header__logo" aria-label="Стрижем быстро и красиво">
          <img src="/images/logob.png" alt="Логотип: ножницы и гребёнка" className="logo-icon" />
        </a>
        <a href="#" className="header__link">На главную</a>
      </header>
      <div className="header-divider" />
    </>
  );
}

export default Header;
