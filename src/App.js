// App.js (главный компонент)
import React, { useEffect, useRef } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Импортируем утилиту для Telegram (создашь позже)
import { sendTelegramNotification } from './utils/telegram';

function App() {
  // Добавляем эффект для аналитики
  useEffect(() => {
    // Функция для получения информации о браузере
    // Функция для получения информации о браузере
    const getBrowserInfo = () => {
      const ua = navigator.userAgent;
      let browser = "Unknown";

      if (ua.includes("Chrome")) browser = "Chrome";
      else if (ua.includes("Firefox")) browser = "Firefox";
      else if (ua.includes("Safari")) browser = "Safari";
      else if (ua.includes("Edge")) browser = "Edge";

      return {
        browser,
        language: navigator.language,
        platform: navigator.platform,
        screen: `${window.screen.width}x${window.screen.height}` // ИСПРАВЛЕНО: добавлен window.
      };
    };

    // Отправляем уведомление о новом посещении
    const browserInfo = getBrowserInfo();

    const message = `
🚀 <b>Новый посетитель на портфолио!</b>

🌐 <b>Страница:</b> ${window.location.href}
⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
📱 <b>Браузер:</b> ${browserInfo.browser}
🖥️ <b>Экран:</b> ${browserInfo.screen}
🌍 <b>Язык:</b> ${browserInfo.language}
💻 <b>Платформа:</b> ${browserInfo.platform}
    `.trim();

    sendTelegramNotification(message);

    // Также логируем в консоль для отладки
    console.log('📊 Аналитика: Посетитель зашел на сайт');

  }, []); // Пустой массив зависимостей = выполнится один раз при загрузке

  return (
    <div className="App">
      <Header />
      <About />
      <Projects />
      <Footer />
    </div>
  );
}

// Header Component
const Header = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="header">
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="container header-content">
        <h1>Максим Трошкин</h1>
        <p>Full-stack разработчик, создающий современные и функциональные веб-приложения</p>
        <button onClick={scrollToProjects} className="btn">
          Мои проекты <i className="fas fa-arrow-down"></i>
        </button>
      </div>
    </header>
  );
};

// About Component
const About = () => {
  const aboutCards = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    aboutCards.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      aboutCards.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">Обо мне</h2>
        <div className="about-content">
          <div className="about-card glass-card" ref={el => aboutCards.current[0] = el}>
            <h3><i className="fas fa-code"></i> Разработка</h3>
            <p>Занимаюсь созданием веб-приложений, десктопных приложений и программ для автоматизации. В работе использую современные технологии и методологии для создания качественных и производительных решений.</p>
          </div>
          <div className="about-card glass-card" ref={el => aboutCards.current[1] = el}>
            <h3><i className="fas fa-graduation-cap"></i> Образование</h3>
            <p>Постоянно совершенствую свои навыки, изучаю новые технологии и фреймворки. Уделяю внимание как фронтенд, так и бэкенд разработке, что позволяет создавать полноценные приложения.</p>
          </div>
          <div className="about-card glass-card" ref={el => aboutCards.current[2] = el}>
            <h3><i className="fas fa-heart"></i> Увлечения</h3>
            <p>Помимо программирования, увлекаюсь спортом и активным образом жизни. Раньше занимался профессионально, сейчас поддерживаю форму в тренажерном зале. Также интересуюсь новыми технологиями и их применением в реальной жизни.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Component
const Projects = () => {
  const projectCards = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    projectCards.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      projectCards.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const projectsData = [
    {
      title: "Crypto Tracker",
      description: "Отслеживание криптовалют в реальном времени с графиками, детальной информацией и возможностью добавления в избранное. Адаптивный дизайн для всех устройств.",
      tech: ["React", "API", "Chart.js", "CSS", "Vercel"],
      link: "https://crypto-tracker-38b8.vercel.app/",
      github: "https://github.com/frostmag155/crypto-tracker"
    },
    {
      title: "Телеграм-бот для учета финансов",
      description: "Телеграм-бот для учета доходов и расходов по категориям с визуализацией статистики и экспортом данных.",
      tech: ["Python", "Telegram API", "SQLite"],
      github: "https://github.com/frostmag155/moneycheck-bot" // Только GitHub
    },
    {
      title: "RSA Шифрование/Дешифрование",
      description: "Программа для шифрования и дешифрования данных с использованием алгоритма RSA. Включает генерацию ключей и работу с большими числами.",
      tech: ["C#", "Алгоритмы", "Криптография"],
      github: "https://github.com/frostmag155/l333333" // Только GitHub
    },
    {
      title: "Анализ хеш-функций",
      description: "Инструмент для анализа устойчивости хеш-функций к коллизиям. Поддерживает различные алгоритмы хеширования и предоставляет детальную статистику.",
      tech: ["C#", "Криптография", "Анализ данных"],
      github: "https://github.com/frostmag155/hash-analysis" // Только GitHub
    },
    {
      title: "Лендинг для телеграм-бота",
      description: "Современный адаптивный лендинг с описанием функционала бота, статистикой использования и формой обратной связи.",
      tech: ["HTML", "CSS", "JavaScript", "API"],
      link: "https://frostmag155.github.io/moneycheck-landing/",
      github: "https://github.com/frostmag155/moneycheck-landing"
    },
    {
      title: "Анализ курса рубля",
      description: "React-приложение для анализа курсов валют ЦБ РФ. Расчет максимального/минимального курса, средней стоимости рубля за 90 дней с продвинутыми анимациями и стеклянным дизайном. (Тестовое задание)",
      tech: ["React", "Framer Motion", "API", "Аналитика данных", "Vercel"],
      link: "https://currency-tracker-v2.vercel.app/",
      github: "https://github.com/frostmag155/currency-tracker-v2",
    },
    {
      title: "Apple Store - Fullstack",
      description: "Полнофункциональный интернет-магазин техники Apple. Frontend на React с современными анимациями, backend на Node.js с MySQL базой данных. Полный цикл от просмотра каталога до оформления заказа.",
      tech: ["React", "Node.js", "Express", "MySQL", "PHPMyAdmin", "REST API", "Framer Motion"],
      //link: "https://frostmag155.github.io/shop-frontend/",
      github: "https://github.com/frostmag155/shop-frontend",
      backend: "https://github.com/frostmag155/shop-backend"
    },
    {
      title: "Tube Solver - Решение гидравлических систем",
      description: "Веб-приложение для расчета и анализа гидравлических систем трубопроводов. Решение систем уравнений для определения расходов жидкости в сложных сетях.",
      tech: ["Python", "Алгоритмы", "Инженерия"],
      github: "https://github.com/frostmag155/tube-solver"
    },
    {
      title: "File Exchange Service",
      description: "Сервис обмена файлами с веб-интерфейсом. Загрузка, хранение и скачивание файлов через удобный UI. Полнофункциональное backend-решение для управления файлами.",
      tech: ["TS", "JS", "REST API", "Файловые операции"],
      github: "https://github.com/frostmag155/file-exchange-service"
    },
    {
      title: "Weather Service",
      description: "Микросервис для получения и предоставления погодных данных. RESTful API для интеграции с другими приложениями и сервисами.",
      tech: ["TS", "REST API", "Микросервисы"],
      link: "https://weather-service-two.vercel.app/",
      github: "https://github.com/frostmag155/weather-service"
    }
  ];

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Мои проекты</h2>
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div className="project-card glass-card" key={index} ref={el => projectCards.current[index] = el}>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span className="tech-tag" key={techIndex}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {/* Показываем кнопку "Посмотреть проект" только если есть ссылка на демо */}
                  {project.link && (
                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                      Посмотреть проект <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                  {/* Всегда показываем кнопку GitHub */}
                  <a href={project.github} className="project-link github-link" target="_blank" rel="noopener noreferrer">
                    GitHub <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3>Контакты</h3>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>maximtroshkin12@yandex.ru</span>
            </div>
            <div className="social-links">
              <a href="https://github.com/frostmag155" target="_blank" rel="noopener noreferrer" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://t.me/m_troshkin" target="_blank" rel="noopener noreferrer" title="Telegram">
                <i className="fab fa-telegram"></i>
              </a>
              <a href="https://vk.com/mtroshkin3" target="_blank" rel="noopener noreferrer" title="ВКонтакте">
                {/* SVG иконка VK */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.513-.743.675-1.021.675-.139 0-.341-.162-.341-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.536.256-.536.499 0 .522.791.642.871 2.138v3.228c0 .707-.127.836-.407.836-.743 0-2.551-2.729-3.624-5.853-.209-.607-.42-.852-.98-.852H2.752c-.627 0-.752.295-.752.619 0 .582.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.853v-1.966c0-.626.133-.752.574-.752.324 0 .882.164 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.192c.626 0 .939-.313.759-.932-.197-.615-.907-1.51-1.849-2.569-.512-.604-1.277-1.254-1.51-1.579-.325-.419-.231-.604 0-.976.001.001 2.672-3.761 2.95-5.04z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;