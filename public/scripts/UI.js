'use strict';

function detectMobile() {
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

//navigation

const createNav = (section, headers3) => {
    const nav = document.createElement('nav');
    nav.classList.add(`${section.id.replace('Button', '')}`,'displayNoneClass');
    headers3.forEach(header3 => {
        const link = document.createElement('a');
        link.href = `#${header3.id}`;
        link.textContent = header3.textContent;
        nav.appendChild(link);
    })

    return nav;
}

const buildNavigation = (section, navMenu, navMenuButtons, headerLinks) => {
    const navigatorButton = document.createElement('button');
    const header1 = section.querySelector('section > h1');

    const a = document.createElement('a');
    a.href = `#${header1.id}`;
    a.textContent = header1.textContent;
    headerLinks.appendChild(a);

    navigatorButton.textContent = header1.textContent.replace('Основы ', '');
    navigatorButton.id = `${section.id}Button`;
    navigatorButton.classList.add('displayNoneClass');

    navMenuButtons.appendChild(navigatorButton)

    const subSections = [...section.querySelectorAll('section > section')].filter(section => section.hasAttribute('id'));

    if (subSections.length) {
        const subNav = document.createElement('nav');
        subNav.classList.add(`${section.id.replace('Button', '')}`, 'displayNoneClass');
        subSections.forEach(subSection => {
            const header2 = subSection.querySelector('section > h2');
            const subNavigatorButton = document.createElement('button');

            subNavigatorButton.textContent = header2.textContent.replace('Основы ', '');
            subNavigatorButton.id = `${subSection.id}Button`;

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

const navMenu = document.querySelector('#navMenu');
const navMenuButtons = document.querySelector('#navMenuButtons');
const headerLinks = document.querySelector('.headerLinks');
const sections = document.querySelectorAll('main > div > section');
sections.forEach(section => buildNavigation(section, navMenu, navMenuButtons, headerLinks));

const navs = document.querySelectorAll('.navButtonsStyles nav');
const clearStylesFunction = () => navs.forEach(item => item.classList.replace('displayFlexClass', 'displayNoneClass'));

const containsElement_displayFlexClass = (element) => element.classList.contains('displayFlexClass');

const allAsidesButtons = document.querySelectorAll('.navButtonsStyles button');

const toggleClassHandler = (element) => {
    element.classList.toggle('displayNoneClass');
    element.classList.toggle('displayFlexClass')
};

const addOnClickEventToggleClassHandler = (element) => {
    const requiredClass = `.${element.id.replace('Button', '')}`;
    const requiredElement = document.querySelector(requiredClass);
    element.onclick = () => {
        if (!containsElement_displayFlexClass(requiredElement)) {
            clearStylesFunction();
            toggleClassHandler(requiredElement)
        }
    }
}

allAsidesButtons.forEach((button) => addOnClickEventToggleClassHandler(button));

const mainAsidesButtons = document.querySelectorAll('.navButtonsStyles > div > button');
document.querySelector('#navButtons').onclick = () => mainAsidesButtons.forEach(button => toggleClassHandler(button));

const hideButtons = () => {
    if (document.querySelector('#AlgorithmsAnDataStructuresNavButton').classList.contains('displayFlexClass')) {
        clearStylesFunction()
        mainAsidesButtons.forEach(button => toggleClassHandler(button));
    }
}

const headerElems = [
    document.querySelector('main'),
    document.querySelector('aside'),
    document.querySelector('.headerLinks'),
    document.querySelector('h1')
];
headerElems.forEach(elem => elem.onclick = () => hideButtons());

//---------------------------------------------------------------------------------------------------------------------

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


const anchorHandler = debounce((anchors, observer) => {
    anchors.forEach(anchor => {
        const id = anchor.target.id;
        if (id && !detectMobile()) {
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
