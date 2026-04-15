document.addEventListener('DOMContentLoaded', () => {
    
    // --- Бургер-меню ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Открытие/закрытие меню
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Липкий Хедер ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Обработка формы заявки ---
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Сбор данных из формы
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                level: document.getElementById('level').value,
            };

            console.log('Данные формы для отправки:', formData);

            /* 
            =====================================================================
            ВСТАВИТЬ СВОЙ СЕРВИС ОБРАБОТКИ ЗАЯВОК ЗДЕСЬ
            Пример отправки данных через fetch (на Webhook или ваш API):
            
            fetch('https://your-api-or-webhook-url.com/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if(response.ok) { ... }
            })
            .catch(error => console.error('Ошибка:', error));
            =====================================================================
            */

            // Для демонстрации показываем сообщение об успешной отправке
            // и скрываем саму форму
            bookingForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');

            // Очистка формы
            bookingForm.reset();
            
            // Если нужно вернуть форму через какое-то время (опционально)
            setTimeout(() => {
                bookingForm.classList.remove('hidden');
                formSuccess.classList.add('hidden');
            }, 10000); // 10 секунд
        });
    }

    // --- Плавный скролл для якорей (дополнительно) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
