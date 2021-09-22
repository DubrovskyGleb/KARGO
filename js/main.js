const body = document.querySelector('body');

let menuButton = document.querySelectorAll('.menu__button'),
    chevron = document.querySelectorAll('.menu__chevron'),
    submenu = document.querySelectorAll('.submenu'),
    menuItem = document.querySelectorAll('._full'),
    hamburger = document.querySelector('.ham'),
    menu = document.querySelector('.menu');


for (let index = 0; index < menuButton.length; index++) {

    menuButton[index].addEventListener('click', function submenuActive() {
        let parent = this.parentNode;
        body.addEventListener('click', function (e) {
            if (!e.target.closest('.menu')) {
                for (let index = 0; index < menuItem.length; index++) {
                    if (menuItem[index].classList.contains('item-active')) {
                        menuItem[index].classList.remove('item-active');
                        chevron[index].classList.remove('chevron-active');
                        submenu[index].classList.remove('submenu-active');
                    }
                }
            }
        })
        //при переходе в другую вкладку меню
        for (let index = 0; index < menuItem.length; index++) {
            if (menuItem[index].classList.contains('item-active') && menuItem[index] != parent) {
                menuItem[index].classList.remove('item-active');
                chevron[index].classList.remove('chevron-active');
                submenu[index].classList.remove('submenu-active');
            }
        };

        parent.classList.toggle('item-active');
        this.childNodes[3].classList.toggle('chevron-active');
        this.nextElementSibling.classList.toggle('submenu-active');
    });
}

/*Слайдер*/

let feedbackChevrons = document.querySelector('.slider-feedback__chevrons'),
    feedbackBlocks = document.querySelectorAll('.slider-feedback__block'),
    feedbackBlockActive = 1,
    feedback = document.querySelector('.feedback');

let heroChevrons = document.querySelector('.slider-hero__chevrons'),
    heroBlocks = document.querySelectorAll('.slider-hero__block'),
    heroBlockActive = 1,
    hero = document.querySelector('.slider-hero__wrapper');

feedbackBlocks[feedbackBlockActive].classList.add('block-active');
currIndex(feedbackBlocks);

heroBlocks[heroBlockActive].classList.add('block-active');
currIndex(heroBlocks);

heroChevrons.addEventListener('click', function (e) {
    if (e.target.closest('.hero-chevron-left')) {
        slider("left", heroBlocks);
    }
    if (e.target.closest('.hero-chevron-right')) {
        slider("right", heroBlocks);
    }
    currIndex(heroBlocks);
});

feedbackChevrons.addEventListener('click', function (e) {
    if (e.target.closest('.feedback-chevron-left')) {
        slider("left", feedbackBlocks);
    }
    if (e.target.closest('.feedback-chevron-right')) {
        slider("right", feedbackBlocks);
    }
    currIndex(feedbackBlocks);
});

function slider(side, name) {
    for (let index = 0; index < name.length; index++) {

        if (name[index].classList.contains('block-active')) {
            name[index].classList.remove('block-active');

            let previousBlock = name[index].previousElementSibling;
            let nextBlock = name[index].nextElementSibling;

            if (side === "left" && (previousBlock !== null)) { //null происходит, когда следуюего или передыдущего элемента нет(конец или начало списка)
                previousBlock.classList.add('block-active');
            } else if (side === "right" && (nextBlock !== null)) {
                nextBlock.classList.add('block-active');
                return; //нужен чтобы цикл не наскакивал на элемент с только что добавленным классом
            } else if (side === "left" && (previousBlock === null)) {
                let arrLength = name.length - 1;
                name[arrLength].classList.add('block-active');
                return;
            } else if (side === "right" && (nextBlock === null)) {
                name[0].classList.add('block-active');
            }
        }
    }
}

function currIndex(name) {
    for (let index = 0; index < name.length; index++) {
        if (name[index].classList.contains('block-active')) {
            prevNext(index, name);  //получает корректный индекс активного элемента
        }
    }
}

function prevNext(index, name) {
    let prev = [];
    let nexten = [];
    let lastItemSlider = name.length - 1;

    name[index].classList.remove('anim-left');
    name[index].classList.remove('anim-right');

    for (let subIndex = 0, a = 0, b = 0; subIndex < name.length; subIndex++) {

        if (index > subIndex) {
            prev[a] = name[subIndex];
            a++;
        } else if (index < subIndex) {
            nexten[b] = name[subIndex];
            b++;
        }
    }

    for (let i = 0; i < prev.length; i++) {
        prev[i].classList.remove('anim-right');
        prev[i].classList.add('anim-left');
    }

    for (let a = 0; a < nexten.length; a++) {
        nexten[a].classList.remove('anim-left');
        nexten[a].classList.add('anim-right');
    }
    //нужно, чтобы в конце или начале корректно отобаржалась анимация
    if (index === lastItemSlider) {
        prev[0].classList.remove('anim-left');
        prev[0].classList.add('anim-right');
    }

    let lastItemNexten = nexten.length - 1;

    if (index === 0) {
        nexten[lastItemNexten].classList.remove('anim-right');
        nexten[lastItemNexten].classList.add('anim-left');
    }
}

/*----------*/

/*Для тачскринов*/

var isMobile = false;

// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
}

if (isMobile) {
    feedback.addEventListener('swiped', function (e) {
        if (e.detail.dir == "left") {
            slider("right", feedbackBlocks);
        };
        if (e.detail.dir == "right") {
            slider("left", feedbackBlocks);
        }
        currIndex(feedbackBlocks);
    });

    hero.addEventListener('swiped', function (e) {
        if (e.detail.dir == "left") {
            slider("right", heroBlocks);
        };
        if (e.detail.dir == "right") {
            slider("left", heroBlocks);
        }
        currIndex(heroBlocks);
    });
};
/*---------------*/

/*Модальные окна*/

let popupLinks = document.querySelectorAll('.popup-link'),
    stels = document.querySelector('.stels'),
    popupCloseIcon = document.querySelectorAll('.close-popup');

let unlock = true,
    timeout = 600;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.form')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (popupActive.id == 'error' || popupActive.id == 'success') {
            popupMessageClose(popupActive);
        }
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.stels').offsetWidth + 'px';
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
/*--------------*/
/*Валидация данных форм*/

//Для модальных окон
function popupMessageClose(popupActive) {
    let popupMessage = popupActive.querySelectorAll('.active-error');
    setTimeout(function () {
        for (let index = 0; index < popupMessage.length; index++) {
            popupMessage[index].classList.remove('active-error');
        }
    }, timeout);
}

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');
    const popupValidate = {
        "Введите имя": {
            errorValidate: "error-name",
            errorNull: "error-name-null",
            errorFunction: wordTest
        },
        "Введите телефон": {
            errorValidate: "error-phone",
            errorNull: "error-phone-null",
            errorFunction: telTest
        },
        "Введите email": {
            errorValidate: "error-email",
            errorNull: "error-email-null",
            errorFunction: emailTest
        },
        "Высота(см)": {
            errorNull: "error-height-null",
            errorFunction: numberTest
        },
        "Ширина(см)": {
            errorNull: "error-width-null",
            errorFunction: numberTest
        },
        "Длина(см)": {
            errorNull: "error-length-null",
            errorFunction: numberTest
        },
        "Вес(кг)": {
            errorNull: "error-mass-null",
            errorFunction: numberTest
        },
        "Cообщение...": {
            errorNull: "error-question-null",
            errorFunction: numberTest
        },
        "Код клиента": {
            errorNull: "error-code-null",
            errorFunction: numberTest
        },
        "Номер заказа": {
            errorNull: "error-number-null",
            errorFunction: numberTest
        }

    }

    for (let index = 0; index < forms.length; index++) {
        const form = forms[index];

        form.addEventListener('submit', formSend);
    }

    function formSend(e) {
        e.preventDefault();
        let result = formValidate(this);
        if (result == '' && !this.classList.contains('calculate') && !this.classList.contains('monitoring')) {
            popupOpen(document.querySelector('#success'));
            this.reset();
        } else if (result == '' && this.classList.contains('calculate')) {
            popupOpen(document.querySelector('#result'));
            this.reset();
        } else if (result == '' && this.classList.contains('monitoring')) {
            popupOpen(document.querySelector('#exactly'));
            this.reset();
        } else if (result !== '') {
            for (let index = 0; index < result.length; index++) {
                document.getElementById(result[index]).classList.add('active-error');
            }
            popupOpen(document.querySelector('#error'));
        }
    }

    function formValidate(form) {
        let error = [];
        let formReq = form.querySelectorAll('.req');

        for (let index = 0; index < formReq.length; index++) {
            let currInput = formReq[index];
            let inputPlaceholder = currInput.getAttribute('placeholder');

            if (currInput.value !== '') {
                let resultValidate = popupValidate[inputPlaceholder].errorFunction(currInput);
                if (!resultValidate) {
                    error.push(popupValidate[inputPlaceholder].errorValidate);
                }
            } else {
                error.push(popupValidate[inputPlaceholder].errorNull);
            }
        }
        return error;
    }

    function wordTest(input) {
        return /^([a-zA-ZА-Яа-я]+[\s'.]?)+\S$/.test(input.value);
    }

    function numberTest(input) {
        return /^[0-9]+$/.test(input.value);
    }

    function telTest(input) {
        return /^\d[\d\(\)\ -]{4,14}\d$/.test(input.value);
    }

    function emailTest(input) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});
/*---------------------*/

/*Для анимации и смены изображения подложки*/
window.addEventListener('scroll', animOnScroll);

function animOnScroll() {

}


/*-----------------------------------------*/
/*Полифилы*/
(function () {

    // проверяем поддержку
    if (!Element.prototype.closest) {

        // реализуем
        Element.prototype.closest = function (css) {
            var node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }

})();

(function () {

    // проверяем поддержку
    if (!Element.prototype.matches) {

        // определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;

    }

})();


