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
        container.classList.add('modalDiv')
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

const sections = document.querySelectorAll('main > div > section');

const createNav = (section, headers3) => {
    const nav = document.createElement('nav');
    nav.classList.add(`${section.id.replace('Butt', '')}`,'displayNoneClass', 'hiddenElem');
    headers3.forEach(header3 => {
        const link = document.createElement('a');
        link.href = `#${header3.id}`;
        link.textContent = header3.textContent;
        nav.appendChild(link);
    })

    return nav;
}

const buildNavigator = (section) => {
    const navMenu = document.querySelector('#navMenu');
    const navMenuButtons = document.querySelector('#navMenuButtons');
    const navigatorButton = document.createElement('button');
    const header1 = section.querySelector('section > h1');


    navigatorButton.textContent = header1.textContent.replace('Основы ', '');
    navigatorButton.id = `${section.id}Butt`;
    navigatorButton.classList.add('displayNoneClass');

    navMenuButtons.appendChild(navigatorButton)

    const subSections = [...section.querySelectorAll('section > section')].filter(section => section.hasAttribute('id'));

    if (subSections.length) {
        const subNav = document.createElement('nav');
        subNav.classList.add(`${section.id.replace('Butt', '')}`, 'displayNoneClass');
        subSections.forEach(subSection => {
            const header2 = subSection.querySelector('section > h2');
            const subNavigatorButton = document.createElement('a');

            subNavigatorButton.textContent = header2.textContent.replace('Основы ', '');
            subNavigatorButton.id = `${subSection.id}Butt`;

            subNav.appendChild(subNavigatorButton);

            navMenu.appendChild(subNav);

            const subHeaders3 = subSection.querySelectorAll('h3');

            const nav = createNav(subSection, subHeaders3);

            navMenu.appendChild(nav);
        })
    } else {
        const headers3 = section.querySelectorAll('h3');
        const nav = createNav(section, headers3);
        navMenu.appendChild(nav);
    }
}

sections.forEach(section => buildNavigator(section));

//navigation
const navs = document.querySelectorAll('.navButtonsStyles nav');

const clearFunc = () => navs.forEach(item => item.classList.replace('displayFlexClass', 'displayNoneClass'));

const toggleClassesHandler = (selectedClass) => {
    const element = document.querySelector(selectedClass);

    if (!element) return;

    element.classList.toggle('displayNoneClass');
    element.classList.toggle('displayFlexClass');
};

const classCondition = (selectedClass) => document.querySelector(selectedClass).classList.contains('displayFlexClass');


const asides = document.querySelector('.navButtonsStyles');

const buttsArr = asides.querySelectorAll('button');

buttsArr.forEach((butt, index) => {
    const currentClass = butt.id.replace('Butt', '')
    butt.onclick = () => {
        if (!classCondition(`.${currentClass}`)) {
            clearFunc();
            toggleClassesHandler(`.${currentClass}`)
        }
    }
});

const cssBasicsNav = document.querySelector('.CSSnav');
const cssBasicsAnc = cssBasicsNav.querySelectorAll('a');

cssBasicsAnc.forEach(a => {
    const currentClass = a.id.replace('Butt', '');
    a.onclick = () => {
        if (classCondition(`.${currentClass}`)) {
            return;
        }
        clearFunc();
        toggleClassesHandler(`.${currentClass}`)
    }
})

const jsBasicsNav = document.querySelector('.JSnav');
const jsBasicsAnc = jsBasicsNav.querySelectorAll('a');

jsBasicsAnc.forEach(a => {
    const currentClass = a.id.replace('Butt', '');
    a.onclick = () => {
        if (classCondition(`.${currentClass}`)) {
            return;
        }
        clearFunc();
        toggleClassesHandler(`.${currentClass}`)
    }
});

const reactFullCoursesNav = document.querySelector('.ReactFullCoursesNav');
const reactFullCoursesAnc = reactFullCoursesNav.querySelectorAll('a');

reactFullCoursesAnc.forEach(a => {
    const currentClass = a.id.replace('Butt', '');
    a.onclick = () => {
        if (classCondition(`.${currentClass}`)) {
            return;
        }
        clearFunc();
        toggleClassesHandler(`.${currentClass}`)
    }
});

const buttonsArray = document.querySelectorAll('.navButtonsStyles button');

document.querySelector('#navButtons').onclick = () => {
    clearFunc();
    console.log(document.querySelector('#HTMLnavButt button'))
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
const sideBar = document.querySelector('.sideBarContainer');
const sideBarBuilder = (selectedClass) => {
    if (selectedClass !== prevClass) {
        const navList = document.querySelector(`.${selectedClass}`)?.cloneNode(true);
        sideBar.innerHTML = '';
        const aList = navList?.querySelectorAll('a');

        aList?.forEach(el => {
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
