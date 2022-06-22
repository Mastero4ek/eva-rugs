//scroll-to-element

/*
   Функция плавного скролла до элемента,  работает как вверх, так и вниз
   @param element - ссылка на элемент
   @param duration - продолжительность скролла в мс
*/
const scrollToElement = (element, duration) => {
        let Id; //id анимации
        let start = performance.now(); //время старта
        let topPosition = element.getBoundingClientRect().top; //текущая позиция элемента
        let currentDocumentPosition = document.documentElement.scrollTop; //текущая прокрутка документа
        let progress = 0; //прогресс анимации
        let animateScroll = () => {
            let now = performance.now(); //текущее время
            progress = (now - start) / duration; //вычисляем прогресс
            if (progress <= 1) {
                document.documentElement.scrollTop = currentDocumentPosition + topPosition * progress;
                Id = requestAnimationFrame(animateScroll);
            } else {
                document.documentElement.scrollTop = currentDocumentPosition + topPosition;
                cancelAnimationFrame(Id);
            }
        };
        animateScroll();
    };

const menuScroll = () => {
        const menu = document.querySelector('.header__nav');

        menu.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.closest('.header__link');
            if (target) {
                const targetBlockId = target.querySelector('a').getAttribute('href').slice(1);
                const targetBlock = document.getElementById(targetBlockId);
                scrollToElement(targetBlock, 300);
            }
        });
    };
    menuScroll();

//slider-reviews

const swiper = new Swiper('.reviews__slider', {
  slidesPerView: 3,
  speed: 300,
  loop: true,
  spaceBetween: 70,
  centeredSlides: true,
  slideToClickedSlide: true,
  toggle: true,

    breakpoints: {
    320: {
      slidesPerView: 1
    },
    375: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1100: {
      slidesPerView: 3
    }
  },
});

const innerWidth = window.innerWidth;
if (innerWidth <= 768) {
  swiper.destroy();
}

//modal

const orderBtn = document.querySelector('.main__button'),
      modalBtn = document.querySelector('.modal__button'),
      modalWindow = document.querySelector('.modal'),
      body = document.querySelector('body'),
      clientWidth = document.documentElement.clientWidth;

        orderBtn.addEventListener('click', () => {

          modalWindow.classList.add('active');
          body.classList.add('noscroll');

          if (innerWidth > 768) {
            body.style.paddingRight = innerWidth - clientWidth + 'px';//добавляем padding = ширине вертикального скролла
          }else {
            body.style.paddingRight = null;
          }

          if (innerWidth <= 768) {
            body.style.paddingRight = null;
          };
        });

        modalWindow.addEventListener('click', (e) => {
          const isModal = e.target.closest('.modal__wrapper');

            if (!isModal) {
              modalWindow.classList.remove('active');
              body.classList.remove('noscroll');
              body.style.paddingRight = null;//обнуляем padding
            }
          });
      
//post

const validation = new JustValidate('#form');

  validation
    .addField('#name', [{
      rule: 'minLength',
      value: 2,
      errorMessage: 'Колличество символов меньше 2!'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Колличество символов больше 30!'
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Введите имя!'
    }
    ])

    .addField('#text', [{
      rule: 'minLength',
      value: 12,
      errorMessage: 'Оставьте Ваш номер телефона для связи!'
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Оставьте Ваш номер телефона для связи!'
    }
    ])

    .addField('#email', [{
      rule: 'minLength',
      value: 2,
      errorMessage: 'Колличество символов меньше 2!'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Колличество символов больше 30!'
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Введите адресс электронной почты!'
    }
    ]).onSuccess((e) => {
      
        const sendForm = (data) => {
          return fetch('mail.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }).then(res => res.json());
        };

        const dataForm = new FormData(e.target);
        const user = {};

        dataForm.forEach((val, key) => {
          user[key] = val;
        });

        sendForm(user).then(data => {
            modalWindow.classList.remove('active');
            body.classList.remove('noscroll');
            body.style.paddingRight = null;
            alert("Спасибо. Ваше письмо успешно отправлено!");
        });

        e.target.reset();

  });