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

//navigation
const navs = document.querySelectorAll('.asideStyles nav');

function clearFunc() {
    navs.forEach(item => item.classList.replace('displayFlexClass', 'displayNoneClass'));
    navs.forEach(item => item.classList.replace('visibleElem', 'hiddenElem'));
}

const toggleClassesHandler = (selectedClass) => {
    document.querySelector(selectedClass).classList.toggle('displayNoneClass');
    document.querySelector(selectedClass).classList.toggle('displayFlexClass');

    setTimeout(() => {
        document.querySelector(selectedClass).classList.toggle('hiddenElem');
        document.querySelector(selectedClass).classList.toggle('visibleElem');
    }, 60)
};

const classCondition = (selectedClass) => {
    return document.querySelector(selectedClass).classList.contains('displayFlexClass')
};

const asides = document.querySelector('aside');
const navButtons = asides.querySelectorAll('button');
const navigationLinks = asides.querySelectorAll('nav');

let navigArr = [];
navigationLinks.forEach(n => navigArr.push(n));
navigArr = navigArr.filter(el => {
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

const buttsArr = [];
navButtons.forEach((b, index) => index !== 0 && buttsArr.push(b));
buttsArr.forEach((butt, index) => {
    butt.onclick = () => {
        if (classCondition(`.${navigArr[index].classList[0]}`)) {
            return;
        }
        clearFunc();
        toggleClassesHandler(`.${navigArr[index].classList[0]}`)
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

const buttons = document.querySelectorAll('.asideStyles button');

const buttonsArray = [];
buttons.forEach((elem, index) => index !== 0 && buttonsArray.push(elem));

document.querySelector('#navButtons').onclick = () => {
    clearFunc();
    if (document.querySelector('#HTMLnavButt').classList.contains('displayNoneClass')) {
        document.querySelector('#navButtons').innerHTML = 'х';
        document.querySelector('#navButtons').classList.replace('slidingTop', 'slidingBack');
        buttonsArray.forEach(button => button.classList.replace('displayNoneClass', 'displayFlexClass'));
        setTimeout(() => {
            buttonsArray.forEach(button => button.classList.replace('hiddenElem', 'visibleElem'));
        }, 4)
    } else {
        clearFunc();
        document.querySelector('#navButtons').innerHTML = 'Navigation';
        document.querySelector('#navButtons').classList.replace('slidingBack', 'slidingTop')
        buttonsArray.forEach(button => button.classList.replace('displayFlexClass', 'displayNoneClass'));
        buttonsArray.forEach(button => button.classList.replace('visibleElem', 'hiddenElem'));
    }
};

document.querySelector("main").onclick = () => {
    if (document.querySelector('#HTMLnavButt').classList.contains('displayFlexClass')) {
        clearFunc();
        document.querySelector('#navButtons').innerHTML = 'Navigation';
        document.querySelector('#navButtons').classList.replace('slidingBack', 'slidingTop')
        buttonsArray.forEach(button => button.classList.replace('displayFlexClass', 'displayNoneClass'));
        buttonsArray.forEach(button => button.classList.replace('visibleElem', 'hiddenElem'));
    }
};

const images = document.querySelectorAll('img');

images.forEach((img) => {
    if (!detectmob()) {
        img.onclick = function () {
            !img.classList.contains('UIscale')
                ? img.classList.add('UIscale')
                : img.classList.remove('UIscale');

        }
    }
});

const jsEngTheoryElems = document.querySelectorAll('.engJSTheory');
const jsRuTheoryElems = document.querySelectorAll('.ruJSTheory');

jsEngTheoryElems.forEach(elem => elem.classList.add('jsTheoryDisplayNone'));

function toggleLanguageHandler() {
    jsEngTheoryElems.forEach(elem => elem.classList.toggle('jsTheoryDisplayNone'));
    jsRuTheoryElems.forEach(elem => elem.classList.toggle('jsTheoryDisplayNone'));
}

document.querySelector('#languageSwitcher').onclick = () => {
    toggleLanguageHandler();
};
document.removeEventListener()
let prevClass = null;
const h3 = document.createElement('h3');
h3.classList.add('sideBarTitle');
document.querySelector('.sideBar').prepend(h3);
const sideBar = document.querySelector('.sideBarContainer');
const sideBarBuilder = (selectedClass) => {
    if (selectedClass !== prevClass) {
        const navlist = document.querySelector(`.${selectedClass}`).cloneNode(true);
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
//IntersectionObserver
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

        let ancs = document.querySelector(`a[href*=${elem.target.id}]`);

        if (ancs.parentElement && !detectmob()) {
            sideBarBuilder(ancs.parentElement.classList[0])
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
