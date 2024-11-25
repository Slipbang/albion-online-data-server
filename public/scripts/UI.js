'use strict';

function detectmob() {
    return !!(navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i));
}

const imgs = document.querySelectorAll('img');

imgs.forEach(img => {
    img.onclick = () => {
        let modalWin = document.createElement('div');
        let cloneImg = img.cloneNode(true);
        let container = document.createElement('div');
        container.classList.add('testDivClass')
        modalWin.appendChild(container);
        const closeButton = document.createElement('button');
        closeButton.textContent = 'x';
        container.appendChild(cloneImg);
        container.appendChild(closeButton);
        closeButton.onclick = () => {
            closeButton.onclick = null;
            document.querySelector('body').removeChild(modalWin);
            modalWin = null;
            container = null;
            cloneImg = null;
        }
        modalWin.classList.add('imgModalWin');
        document.querySelector('body').appendChild(modalWin);
    }
})

//navigation
const navs = document.querySelectorAll('.navButtonsStyles nav');

function clearFunc() {
    navs.forEach(item => item.classList.replace('displayFlexClass', 'displayNoneClass'));
}

const toggleClassesHandler = (selectedClass) => {
    const element = document.querySelector(selectedClass);

    if (!element) return;

    element.classList.toggle('displayNoneClass');
    element.classList.toggle('displayFlexClass');
};

const classCondition = (selectedClass) => document.querySelector(selectedClass).classList.contains('displayFlexClass');


const asides = document.querySelector('.navButtonsStyles');

let navigArr = [...asides.querySelectorAll('nav')].filter(el => {
    switch (el.classList[0]) {
        case 'JSbasicsNav':
            return false;
        case 'JSbasicsForEmploymentNav':
            return false
        case 'JSpracticeNav':
            return false;
        case 'ReactNav':
            return false;
        case 'reactReduxNav':
            return false;
        case 'reactRouterBNav':
            return false;
        default:
            return true;
    }
});

const buttsArr = [...asides.querySelectorAll('button')];

buttsArr.forEach((butt, index) => {
    butt.onclick = () => {
        if (!classCondition(`.${navigArr[index].classList[0]}`)) {
            clearFunc();
            toggleClassesHandler(`.${navigArr[index].classList[0]}`)
        }
    }
});

const jsBasicsNav = document.querySelector('.JSnav');
const jsBasicsAnc = jsBasicsNav.querySelectorAll('a');

jsBasicsAnc.forEach(a => {
    a.onclick = () => {
        if (classCondition(`.${a.id.replace('Butt', '')}`)) {
            return;
        }
        clearFunc();
        toggleClassesHandler(`.${a.id.replace('Butt', '')}`)
    }
});

const reactFullCoursesNav = document.querySelector('.ReactFullCoursesNav');
const reactFullCoursesAnc = reactFullCoursesNav.querySelectorAll('a');

reactFullCoursesAnc.forEach(a => {
    a.onclick = () => {
        if (classCondition(`.${a.id.replace('Butt', '')}`)) {
            return;
        }
        clearFunc();
        toggleClassesHandler(`.${a.id.replace('Butt', '')}`)
    }
});

const buttonsArray = [...document.querySelectorAll('.navButtonsStyles button')];

document.querySelector('#navButtons').onclick = () => {
    clearFunc();
    if (document.querySelector('#HTMLnavButt').classList.contains('displayNoneClass')) {
        buttonsArray.forEach(button => button.classList.replace('displayNoneClass', 'displayFlexClass'));
    } else {
        clearFunc();
        buttonsArray.forEach(button => button.classList.replace('displayFlexClass', 'displayNoneClass'));
    }
};

document.querySelector("main").onclick = () => {
    if (document.querySelector('#HTMLnavButt').classList.contains('displayFlexClass')) {
        clearFunc();
        buttonsArray.forEach(button => button.classList.replace('displayFlexClass', 'displayNoneClass'));
    }
};

let prevClass = null;
const h3 = document.createElement('h3');
h3.classList.add('sideBarTitle');
document.querySelector('aside').prepend(h3);
const sideBar = document.querySelector('.sideBarContainer');
const sideBarBuilder = (selectedClass) => {
    if (selectedClass !== prevClass) {
        const navlist = document.querySelector(`.${selectedClass}`)?.cloneNode(true);
        let buttons = document.querySelector(`#${selectedClass}Butt`);
        h3.textContent = buttons.textContent;
        sideBar.innerHTML = '';
        const aList = navlist.querySelectorAll('a');

        aList.forEach(el => {
            sideBar.append(el);
        })
    }
    prevClass = selectedClass;
};

const anchorsH3 = document.querySelectorAll('h3');

// const throttle = (func, limit) => {
//     let inThrottle;
//     return (...args) => {
//         if (!inThrottle) {
//             func.apply(this, args);
//             inThrottle = true;
//             setTimeout(() => (inThrottle = false), limit);
//         }
//     };
// };

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}


const anchorHandler = debounce((anchor, observer) => {
    anchor.forEach(elem => {
        const id = elem.target.id;
        if (id && !detectmob()) {
            let ancs = document?.querySelector(`a[href*=${id}]`);

            if (!!ancs?.parentElement) sideBarBuilder(ancs.parentElement.classList[0]);
        }
    })
});

const anchorObserver = new IntersectionObserver(anchorHandler, {
    root: null,
    rootMargin: '0px 0px -700px 0px',
    threshold: 0.5,
});

anchorsH3.forEach(elem => {
    anchorObserver.observe(elem)
});

//----------------------------------------------------------------------------------------------------------
