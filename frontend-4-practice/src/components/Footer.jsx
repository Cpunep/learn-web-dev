function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src="/images/logow.png" alt="Логотип: ножницы и гребёнка" className="logo-icon" />
          <p className="footer__slogan">Стрижем быстро и красиво</p>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Контакты</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <svg className="footer__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" stroke="#ffffff" strokeWidth="1.8" />
                <circle cx="12" cy="10" r="2.5" stroke="#ffffff" strokeWidth="1.8" />
              </svg>
              <span>ул. Садовая, 15, Москва</span>
            </li>
            <li className="footer__item">
              <svg className="footer__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1.1 1A16 16 0 014 5.1 1 1 0 015 4z" stroke="#ffffff" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
              <span>+7 (495) 123-45-67</span>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Режим работы</h3>
          <ul className="footer__list">
            <li className="footer__item">Пн–Пт: 9:00 – 21:00</li>
            <li className="footer__item">Сб–Вс: 10:00 – 19:00</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">© 2026. Все права защищены.</p>
        <a href="#" className="footer__policy">Политика конфиденциальности</a>
      </div>
    </footer>
  );
}

export default Footer;
