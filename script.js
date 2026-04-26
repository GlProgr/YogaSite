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
                direction: document.getElementById('direction').value,
            };

            const directionMap = {
                'healthy-back': 'Йога для здоровой спины',
                'hatha': 'Хатха йога',
                'pregnant': 'Йога для беременных'
            };

            const payload = {
                Имя: formData.name,
                Телефон: formData.phone,
                Направление: directionMap[formData.direction] || formData.direction
            };

            // Отправляем данные через FormSubmit
            fetch('https://formsubmit.co/ajax/namasteyoy@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(data => {
                    // Показываем сообщение об успешной отправке
                    bookingForm.classList.add('hidden');
                    formSuccess.classList.remove('hidden');

                    // Очистка формы
                    bookingForm.reset();

                    // Возвращаем форму через 10 секунд
                    setTimeout(() => {
                        bookingForm.classList.remove('hidden');
                        formSuccess.classList.add('hidden');
                    }, 10000);
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
                });
        });
    }

    // --- Плавный скролл для якорей (дополнительно) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
