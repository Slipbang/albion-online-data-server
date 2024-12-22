'use strict';

//Algorithms

//linearSearch
const linearSearchArray = [1, 4, 6, 12, 51, 124, 651, 512, 5213, 11];
let linearSearchCount = 0;
const linearSearch = (array, item) => {
    for (let i = 0; i < linearSearchArray.length; i++) {
        linearSearchCount++;
        if (linearSearchArray[i] === item) {
            return i;
        }
    }
    return null;
}

console.log('linearSearch ' + linearSearch(linearSearchArray, 6))
console.log('linearSearchCount: ' + linearSearchCount)

//binarySearch
const binarySearchArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let binarySearchCount = 0;
const binarySearch = (array, item) => {
    let start = 0;
    let end = binarySearchArray.length;
    let middle;
    let found = false;
    let position = -1;
    while (found === false && start <= end) {
        binarySearchCount++;
        middle = Math.floor((start + end) / 2)
        if (binarySearchArray[middle] === item) {
            found = true;
            position = middle;
            return position;
        }
        if (item < binarySearchArray[middle]) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
    }
    return position;
}

console.log('binarySearch: ' + binarySearch(binarySearchArray, 9))
console.log('binarySearchCount: ' + binarySearchCount)

//recursiveBinarySearch

let recursiveBinarySearchCount = 0;
const recursiveBinarySearch = (array, item, start, end) => {
    let middle = Math.floor((start + end) / 2);
    recursiveBinarySearchCount++;
    if (item === array[middle]) {
        return middle;
    }
    if (item < array[middle]) {
        return recursiveBinarySearch(array, item, start, middle - 1)
    } else {
        return recursiveBinarySearch(array, item, middle + 1, end)
    }
}
console.log('recursiveBinarySearch: ' + recursiveBinarySearch(binarySearchArray, 12, 0, binarySearchArray.length))
console.log('recursiveBinarySearchCount: ' + recursiveBinarySearchCount);

//selectionSort
//Сортировка выбором
const selectionSortArray = [0, 3, 2, 5, 6, 8, 1, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 6, 2, 35, 6, 3, 32] // [0,1,1,2,3.......]

let selectionSortCount = 0;

const selectionSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        let IndexMin = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[IndexMin]) {
                IndexMin = j;
            }
            selectionSortCount++;
        }
        let tmp = array[i];
        array[i] = array[IndexMin];
        array[IndexMin] = tmp;
    }
    return array;
}
console.log(selectionSort(selectionSortArray))
console.log(selectionSortCount)

//bubbleSort

const bubbleSortArray = [0, 3, 2, 5, 6, 8, 23, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 6, 2, 35, 6, 3, 32, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23,];
let bubbleSortCount = 0;

const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[j + 1] < array[j]) {
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
            bubbleSortCount++;
        }
    }
    return array;
}

console.log(bubbleSort(bubbleSortArray))
console.log('bubbleSortCount: ' + bubbleSortCount)

//quickSort

const quickSortArray = [0, 3, 2, 5, 6, 8, 23, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 6, 2, 35, 6, 3, 32, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23,];
let quickSortCount = 0;

const quickSort = (array) => {
    if (array.length <= 1) {
        return array;
    }
    let pivotIndex = Math.floor(array.length / 2);
    let pivot = array[pivotIndex];
    let less = [];
    let greater = [];
    for (let i = 0; i < array.length; i++) {
        quickSortCount++;
        if (i === pivotIndex)
            continue
        if (array[i] < pivot) {
            less.push(array[i])
        } else {
            greater.push(array[i])
        }
    }
    return [...quickSort(less), pivot, ...quickSort(greater)]
}
console.log(quickSort(quickSortArray));
console.log('quickSortCount: ' + quickSortCount);


//поиск в ширину

const graph = {}
graph.a = ['b', 'c']
graph.b = ['f']
graph.c = ['d', 'e']
graph.d = ['f']
graph.e = ['f']
graph.f = ['g']

const breadthSearch = (graph, start, end) => {
    let queue = [];
    queue.push(start);
    while (queue.length > 0) {
        const current = queue.shift();
        if (!graph[current]) {
            graph[current] = [];
        }
        if (graph[current].includes(end)) {
            return true;
        } else {
            queue = [...queue, ...graph[current]]
        }
    }
    return false;
}

console.log(breadthSearch(graph, 'a', 'g'))

//алгоритм Дейкстры

const graph1 = {}
graph1.a = {b: 2, c: 1}
graph1.b = {f: 7}
graph1.c = {d: 5, e: 2}
graph1.d = {f: 2}
graph1.e = {f: 1}
graph1.f = {g: 1}
graph1.g = {}

const shortPath = (graph, start, end) => {
    const costs = {};
    const processed = [];
    let neighbors = {};
    Object.keys(graph).forEach(node => {
        if (node !== start) {
            let value = graph[start][node];
            costs[node] = value || 1000000000000;
        }
    })
    let node = findNodeLowestCost(costs, processed);
    while (node) {
        const cost = costs[node];
        neighbors = graph[node];
        Object.keys(neighbors).forEach(neighbor => {
            let newCost = cost + neighbors[neighbor];
            if (newCost < costs[neighbor]) {
                costs[neighbor] = newCost;
            }
        })
        processed.push(node);
        node = findNodeLowestCost(costs, processed);
    }
    return costs
}

function findNodeLowestCost(costs, processed) {
    let lowestCost = 1000000000000;
    let lowestNode;

    Object.keys(costs).forEach(node => {
        let cost = costs[node];
        if (cost < lowestCost && !processed.includes(node)) {
            lowestCost = cost;
            lowestNode = node;
        }
    })
    return lowestNode;
}

console.log(shortPath(graph1, 'a', 'g'));

//treeAlgs

const tree = [
    {
        v: 5,
        c: [
            {
                v: 10,
                c: [
                    {
                        v: 11,
                    }
                ]
            },
            {
                v: 7,
                c: [
                    {
                        v: 5,
                        c: [
                            {
                                v: 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        v: 5,
        c: [
            {
                v: 10
            },
            {
                v: 15
            }
        ]
    }
]

const recursiveTreeAlgs = (tree) => {
    let sum = 0;
    tree.forEach(node => {
        sum += node.v;
        if (!node.c) {
            return node.v;
        }
        sum += recursiveTreeAlgs(node.c)
    })
    return sum;
}

const iterationTreeAlgs = (tree) => {
    if (!tree.length) {
        return 0;
    }
    let sum = 0;
    let stack = [];
    tree.forEach(node => stack.push(node));
    while (stack.length) {
        const node = stack.pop();
        sum += node.v;
        if (node.c) {
            node.c.forEach(child => stack.push(child))

        }
    }
    return sum;
}

console.log('iterationTreeAlgs: ' + iterationTreeAlgs(tree));
console.log('recursiveTreeAlgs: ' + recursiveTreeAlgs(tree));

//cash

const cashFunction = (fn) => {
    const cash = {};
    return function (n) {
        if (cash[n]) {
            console.log('взято из кэша', cash[n]);
            return cash[n];
        }
        let result = fn(n);
        console.log('посчитала функция', result);
        cash[n] = result;
        return result;
    }
}

const factorial = (n) => {
    let result = 1;
    while (n != 1) {
        result *= n;
        n--;
    }
    return result;
}

const cashFactorial = cashFunction(factorial);

cashFactorial(5);
cashFactorial(4);
cashFactorial(3);
cashFactorial(4);
cashFactorial(5);
cashFactorial(1);

console.log('factorial: ' + factorial(5));

//linkedList

class LinkedList {
    constructor() {
        this.size = 0;
        this.root = null;
    }

    add(value) {
        if (this.size === 0) {
            this.root = new Node(value);
            this.size++;
            return true;
        }
        let node = this.root;
        while (node.next) {
            node = node.next;
        }
        let newNode = new Node(value);
        node.next = newNode;
        this.size++;
    }

    getSize() {
        return this.size;
    }

    print() {
        let result = [];
        let node = this.root;
        while (node) {
            result.push(node.value);
            node = node.next;
        }
        console.log(result);
        ;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

const List = new LinkedList();
List.add(5);
List.add(4);
List.add(3);
List.add(2);
List.add(5);
List.add(7);

List.print();

//бинарное дерево поиска

class BinaryTree {
    constructor() {
        this.root = null;
    }

    add(value) {
        if (!this.root) {
            this.root = new TreeNode(value);
        } else {
            let node = this.root;
            let newNode = new TreeNode(value);
            while (node) {
                if (value > node.value) {
                    if (!node.right) {
                        break;
                    }
                    node = node.right;
                } else {
                    if (!node.left) {
                        break;
                    }
                    node = node.left;
                }
            }
            if (value > node.value) {
                node.right = newNode;
            } else {
                node.left = newNode;
            }
        }
    }

    print(root = this.root) {
        if (!root) {
            return true;
        }
        console.log(root.value);
        this.print(root.left);
        this.print(root.right);
    }
}

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;

    }
}

const binarySearchingTree = new BinaryTree();
binarySearchingTree.add(5);
binarySearchingTree.add(2);
binarySearchingTree.add(6);
binarySearchingTree.add(2);
binarySearchingTree.add(1);
binarySearchingTree.print();

const newMap = new Map();
const ObjKey = {id: 5}
newMap.set(ObjKey, 'ulbi tv');

console.log('newMap: ' + newMap.get(ObjKey));

const newSet = new Set();
newSet.add(5);
newSet.add(5);
newSet.add(5);
newSet.add(4);
newSet.add(4);
newSet.add(3);
newSet.add(3);
newSet.add(2);
newSet.add(2);

console.log(newSet);


//--------------------------------------------------------------------------------------------
let restyle = document.querySelector('.example26');
let button1 = document.querySelector('#buttonexample');
button1.onclick = function () {
    restyle.classList.toggle('example26');
    restyle.classList.toggle('example27');
};

let button2 = document.querySelector('#buttonexample1');
button2.onclick = function () {
    document.querySelector('.overlay1').style.display = "inline";
};
let button3 = document.querySelector('#closebutton1');
button3.onclick = function () {
    document.querySelector('.overlay1').style.display = "none";
};

let button4 = document.querySelector('#blurbutton');
button4.onclick = function () {
    document.querySelector('.imagefilter').style.filter = "blur(2px)";
};
let button5 = document.querySelector('#shadowbutton');
button5.onclick = function () {
    document.querySelector('.imagefilter').style.filter = "drop-shadow(5px 6px 4px rgba(0, 0, 0, 0.5))";
};
let button6 = document.querySelector('#grayscalebutton');
button6.onclick = function () {
    document.querySelector('.imagefilter').style.filter = "grayscale(100%)";
};
let button7 = document.querySelector('#brightnessbutton');
button7.onclick = function () {
    document.querySelector('.imagefilter').style.filter = "brightness(50%)";
};
let button8 = document.querySelector('#contrastbutton');
button8.onclick = function () {
    document.querySelector('.imagefilter').style.filter = "contrast(150%)";
};
let button9 = document.querySelector('#rotatebutton');
button9.onclick = function () {
    document.querySelector('.imagefilter').style.filter = "hue-rotate(180deg)";
};
let button10 = document.querySelector('#invertbutton');
button10.onclick = function () {
    document.querySelector('.imagefilter').style.filter = "invert(100%)";
};
let button11 = document.querySelector('#saturatebutton');
button11.onclick = function () {
    document.querySelector('.imagefilter').style.filter = "saturate(300%)";
};
let button12 = document.querySelector('#sepiabutton');
button12.onclick = function () {
    document.querySelector('.imagefilter').style.filter = "sepia(100%)";
};
let button13 = document.querySelector('#opacitybutton');
button13.onclick = function () {
    document.querySelector('.imagefilter').style.filter = "opacity(50%)";
};
let overflowexample = document.querySelector('#overflowexample');
overflowexample.onclick = function () {
    document.querySelector('.example35').style.overflow = 'hidden';
    document.querySelector('.example35').style.textOverflow = 'ellipsis';
    document.querySelector('.example35').style.whiteSpace = 'nowrap';
    document.querySelector('.example35').style.writingMode = 'horizontal-tb';
};
let wordwrapexample = document.querySelector('#wordwrapexample');
wordwrapexample.onclick = function () {
    document.querySelector('.example35').style.overflow = 'auto';
    document.querySelector('.example35').style.textOverflow = 'clip';
    document.querySelector('.example35').style.whiteSpace = 'normal';
    document.querySelector('.example35').style.wordWrap = 'break-word';
    document.querySelector('.example35').style.wordBreak = 'break-all';
    document.querySelector('.example35').style.writingMode = 'horizontal-tb';
};
let writingmodeexample = document.querySelector('#writingmodeexample');
writingmodeexample.onclick = function () {
    document.querySelector('.example35').style.overflow = 'auto';
    document.querySelector('.example35').style.textOverflow = 'clip';
    document.querySelector('.example35').style.whiteSpace = 'normal';
    document.querySelector('.example35').style.wordWrap = 'normal';
    document.querySelector('.example35').style.wordBreak = 'normal';
    document.querySelector('.example35').style.writingMode = 'vertical-lr';
};
let displayflexexample = document.querySelector('#displayflexexample');
displayflexexample.onclick = function () {
    document.querySelector('.flexcontainerexample').style.display = 'flex';
};
let normalise = document.querySelector('#normalise');
normalise.onclick = function () {
    document.querySelector('.flexcontainerexample').style.display = 'inherit';
};
let rowexample = document.querySelector('#rowexample');
rowexample.onclick = function () {
    document.querySelector('.flexcontainerexample2').style.flexDirection = 'row';
};
let rowreverseexample = document.querySelector('#rowreverseexample');
rowreverseexample.onclick = function () {
    document.querySelector('.flexcontainerexample2').style.flexDirection = 'row-reverse';
};
let columnexample = document.querySelector('#columnexample');
columnexample.onclick = function () {
    document.querySelector('.flexcontainerexample2').style.flexDirection = 'column';
};
let columnreverseexample = document.querySelector('#columnreverseexample');
columnreverseexample.onclick = function () {
    document.querySelector('.flexcontainerexample2').style.flexDirection = 'column-reverse';
};
let flexnowrapexample = document.querySelector('#flexnowrapexample');
flexnowrapexample.onclick = function () {
    document.querySelector('.flexcontainerexample3').style.flexWrap = 'nowrap';
};
let flexwrapexample = document.querySelector('#flexwrapexample');
flexwrapexample.onclick = function () {
    document.querySelector('.flexcontainerexample3').style.flexWrap = 'wrap';
};
let flexwrapreverseexample = document.querySelector('#flexwrapreverseexample');
flexwrapreverseexample.onclick = function () {
    document.querySelector('.flexcontainerexample3').style.flexWrap = 'wrap-reverse';
};
let flexflowexample = document.querySelector('#flexflowexample');
flexflowexample.onclick = function () {
    document.querySelector('.flexcontainerexample4').style.flexFlow = 'column wrap';
};
let resetbutton = document.querySelector('#resetbutton');
resetbutton.onclick = function () {
    document.querySelector('.flexcontainerexample4').style.justifyContent = 'flex-start';
    document.querySelector('.flexcontainerexample4').style.flexFlow = 'row nowrap';
};
document.querySelector('#flexstartexample').onclick = function () {
    document.querySelector('.flexcontainerexample4').style.justifyContent = 'flex-start';
};
document.querySelector('#flexendexample').onclick = function () {
    document.querySelector('.flexcontainerexample4').style.justifyContent = 'flex-end';
};
document.querySelector('#centerexample').onclick = function () {
    document.querySelector('.flexcontainerexample4').style.justifyContent = 'center';
};
document.querySelector('#spacebetweenexample').onclick = function () {
    document.querySelector('.flexcontainerexample4').style.justifyContent = 'space-between';
};
document.querySelector('#spacearoundexample').onclick = function () {
    document.querySelector('.flexcontainerexample4').style.justifyContent = 'space-around';
};
document.querySelector('#spaceevenlyexample').onclick = function () {
    document.querySelector('.flexcontainerexample4').style.justifyContent = 'space-evenly';
};
document.querySelector('#stretchexample').onclick = function () {
    document.querySelector('.flexcontainerexample5').style.alignItems = 'stretch';
};
document.querySelector('#flexstartexample2').onclick = function () {
    document.querySelector('.flexcontainerexample5').style.alignItems = 'flex-start';
};
document.querySelector('#flexendexample2').onclick = function () {
    document.querySelector('.flexcontainerexample5').style.alignItems = 'flex-end';
};
document.querySelector('#centerexample2').onclick = function () {
    document.querySelector('.flexcontainerexample5').style.alignItems = 'center';
};
document.querySelector('#baselineexample').onclick = function () {
    document.querySelector('.flexcontainerexample5').style.alignItems = 'baseline';
    document.querySelector('.flexcontainerexample5 .item1').style.fontSize = '30px';
    document.querySelector('.flexcontainerexample5 .item2').style.fontSize = '40px';
    document.querySelector('.flexcontainerexample5 .item3').style.fontSize = '60px';
    document.querySelector('.flexcontainerexample5 .item4').style.fontSize = '80px';
    document.querySelector('.flexcontainerexample5 .item5').style.fontSize = '100px';
    document.querySelector('.flexcontainerexample5 .item6').style.fontSize = '120px';
};
document.querySelector('#resetfontsize').onclick = function () {
    document.querySelector('.flexcontainerexample5 .item1').style.fontSize = '60px';
    document.querySelector('.flexcontainerexample5 .item2').style.fontSize = '60px';
    document.querySelector('.flexcontainerexample5 .item3').style.fontSize = '60px';
    document.querySelector('.flexcontainerexample5 .item4').style.fontSize = '60px';
    document.querySelector('.flexcontainerexample5 .item5').style.fontSize = '60px';
    document.querySelector('.flexcontainerexample5 .item6').style.fontSize = '60px';
};
document.querySelector('#onwrapbutton').onclick = function () {
    document.querySelector('.flexcontainerexample6').style.flexWrap = 'wrap';
};
document.querySelector('#offwrapbutton').onclick = function () {
    document.querySelector('.flexcontainerexample6').style.flexWrap = 'nowrap';
};
document.querySelector('#oncolumn').onclick = function () {
    document.querySelector('.flexcontainerexample6').style.flexDirection = 'column';
};
document.querySelector('#offcolumn').onclick = function () {
    document.querySelector('.flexcontainerexample6').style.flexDirection = 'row';
};
document.querySelector('#acstretchexample').onclick = function () {
    document.querySelector('.flexcontainerexample6').style.alignContent = 'stretch';
};
document.querySelector('#acflexstartexample').onclick = function () {
    document.querySelector('.flexcontainerexample6').style.alignContent = 'flex-start';
};
document.querySelector('#acflexendexample').onclick = function () {
    document.querySelector('.flexcontainerexample6').style.alignContent = 'flex-end';
};
document.querySelector('#accenterexample').onclick = function () {
    document.querySelector('.flexcontainerexample6').style.alignContent = 'center';
};
document.querySelector('#acspacebetweenexample').onclick = function () {
    document.querySelector('.flexcontainerexample6').style.alignContent = 'space-between';
};
document.querySelector('#acspacearoundexample').onclick = function () {
    document.querySelector('.flexcontainerexample6').style.alignContent = 'space-around';
};
document.querySelector('#acspaceevenlyexample').onclick = function () {
    document.querySelector('.flexcontainerexample6').style.alignContent = 'space-evenly';
};
document.querySelector('#autowidth').onclick = function () {
    document.querySelector('.flexcontainerexample6 .item1').style.width = 'auto';
    document.querySelector('.flexcontainerexample6 .item2').style.width = 'auto';
    document.querySelector('.flexcontainerexample6 .item3').style.width = 'auto';
    document.querySelector('.flexcontainerexample6 .item4').style.width = 'auto';
    document.querySelector('.flexcontainerexample6 .item5').style.width = 'auto';
    document.querySelector('.flexcontainerexample6 .item6').style.width = 'auto';
    document.querySelector('.flexcontainerexample6 .item7').style.width = 'auto';
    document.querySelector('.flexcontainerexample6 .item8').style.width = 'auto';
};
document.querySelector('#pxwidth').onclick = function () {
    document.querySelector('.flexcontainerexample6 .item1').style.width = '100px';
    document.querySelector('.flexcontainerexample6 .item2').style.width = '100px';
    document.querySelector('.flexcontainerexample6 .item3').style.width = '100px';
    document.querySelector('.flexcontainerexample6 .item4').style.width = '100px';
    document.querySelector('.flexcontainerexample6 .item5').style.width = '100px';
    document.querySelector('.flexcontainerexample6 .item6').style.width = '100px';
    document.querySelector('.flexcontainerexample6 .item7').style.width = '100px';
    document.querySelector('.flexcontainerexample6 .item8').style.width = '100px';
};
let inputgrow1 = document.querySelector('#firstitem');
let inputgrow2 = document.querySelector('#seconditem');
let inputgrow3 = document.querySelector('#thirditem');
document.querySelector('#acceptbutton').onclick = function () {
    document.querySelector('.flexcontainerexample8 .item1').style.flexGrow = +inputgrow1.value;
    document.querySelector('.flexcontainerexample8 .item2').style.flexGrow = +inputgrow2.value;
    document.querySelector('.flexcontainerexample8 .item3').style.flexGrow = +inputgrow3.value;
};
let fsinputgrow1 = document.querySelector('#fsfirstitem');
let fsinputgrow2 = document.querySelector('#fsseconditem');
let fsinputgrow3 = document.querySelector('#fsthirditem');
document.querySelector('#acceptbuttonfs').onclick = function () {
    document.querySelector('.flexcontainerexample8 .item1').style.flexShrink = +fsinputgrow1.value;
    document.querySelector('.flexcontainerexample8 .item2').style.flexShrink = +fsinputgrow2.value;
    document.querySelector('.flexcontainerexample8 .item3').style.flexShrink = +fsinputgrow3.value;
};
let flexinputgrow1 = document.querySelector('#flexfirstitem');
let flexinputgrow2 = document.querySelector('#flexseconditem');
let flexinputgrow3 = document.querySelector('#flexthirditem');
document.querySelector('#acceptbuttonflex').onclick = function () {
    document.querySelector('.flexcontainerexample8 .item1').style.flex = flexinputgrow1.value;
    document.querySelector('.flexcontainerexample8 .item2').style.flex = flexinputgrow2.value;
    document.querySelector('.flexcontainerexample8 .item3').style.flex = flexinputgrow3.value;
    document.querySelector('.cssshow1').innerHTML = flexinputgrow1.value;
    document.querySelector('.cssshow2').innerHTML = flexinputgrow2.value;
    document.querySelector('.cssshow3').innerHTML = flexinputgrow3.value;
};
let order1 = document.querySelector('#order1');
let order2 = document.querySelector('#order2');
let order3 = document.querySelector('#order3');
let order4 = document.querySelector('#order4');
let order5 = document.querySelector('#order5');
let order6 = document.querySelector('#order6');
let order7 = document.querySelector('#order7');
let order8 = document.querySelector('#order8');
document.querySelector('#orderaccept').onclick = function () {
    document.querySelector('.flexcontainerexample9 .item1').style.order = +order1.value;
    document.querySelector('.flexcontainerexample9 .item2').style.order = +order2.value;
    document.querySelector('.flexcontainerexample9 .item3').style.order = +order3.value;
    document.querySelector('.flexcontainerexample9 .item4').style.order = +order4.value;
    document.querySelector('.flexcontainerexample9 .item5').style.order = +order5.value;
    document.querySelector('.flexcontainerexample9 .item6').style.order = +order6.value;
    document.querySelector('.flexcontainerexample9 .item7').style.order = +order7.value;
    document.querySelector('.flexcontainerexample9 .item8').style.order = +order8.value;
};
let rangeinputx = document.querySelector('#rangeinputx');

function fun1() {
    let rangeinput1 = +rangeinputx.value + 'px';
    document.querySelector('.flexcontainerexample10').style.width = rangeinput1;
};let rangeinputy = document.querySelector('#rangeinputy');

function fun2() {
    let rangeinput2 = +rangeinputy.value + 'px';
    document.querySelector('.flexcontainerexample10').style.height = rangeinput2;
};document.querySelector('#cont10row').onclick = function () {
    document.querySelector('.flexcontainerexample10').style.flexDirection = 'row';
};
document.querySelector('#cont10col').onclick = function () {
    document.querySelector('.flexcontainerexample10').style.flexDirection = 'column';
};
document.querySelector('#modalwindow').onclick = function () {
    document.querySelector('.flexcontainerexample13').style.visibility = 'visible';
};
document.querySelector('#closemw').onclick = function () {
    document.querySelector('.flexcontainerexample13').style.visibility = 'hidden';
};

//уроки Javascript

//UNIT 1. СТАРТУЕМ И ПИШЕМ ПЕРВУЮ ПРОГРАММУ
document.getElementById('out').innerHTML = 'Hello';
document.querySelector('.queryselector1').innerHTML = 'какой-то текст';
document.querySelector('#multiplikation').innerHTML = 12 * 12;
document.querySelector('#queryselector2').innerHTML = "<data>28.11.1993</data>";
//document.querySelector('h3 div span').innerHTML = 'world';
document.querySelector('.tree').innerHTML = '<h3>произвольный текст</h3>';
document.querySelector('.fraktion').innerHTML = 3.14;
let jslink = document.querySelector('.jslink');
jslink.innerHTML = '<img src="./images/imageExample.png" alt="imageExample">';

let z1 = 6;
let z2 = 3;
document.querySelector('.calc').innerHTML = z1 * z2;

let y1 = 6;
let y2 = 3;
document.querySelector('.separ').innerHTML = y1 / y2;
let d1 = document.querySelector('.test-1');
console.log(d1);
let d2 = document.querySelector('.test-2');
d2 = 5;
console.log(d2);

//let divS3 = document.querySelector('div.s3');
let divS3 = document.querySelector('div.s4');
console.log(divS3);
//document.querySelector('body').innerHTML = '';


// UNIT 2. ОСНОВЫ ВВОДА ДАННЫХ
let inputIn = document.querySelector('#input-in');
let button14 = document.querySelector('#clacbutton');
let outPut = document.querySelector('.output')
button14.onclick = function () {
    let val = +inputIn.value;
    console.log(val + 10);
    inputIn.value = '';
    outPut.innerHTML = val;
};
let ae = 7;
let be = 9;
console.log(ae * be);
let ce = 7;
let de = 9;
console.log(ce / de);
let e = 3;
let f = 5;
console.log(e + f);
let e1 = '3';
let f1 = 5;
console.log(e1 + f1);
let e2 = 3;
let f2 = 0;
console.log(e2 / f2);
let e3 = 3;
let f3 = 'hello';
console.log(e3 + f3);
let e4 = 3;
let f4 = 'hello';
console.log(e4 * f4);

let name1 = document.querySelector('#name1');
let secondname1 = document.querySelector('#secondname1');
let summbut = document.querySelector('#summbut');
summbut.onclick = function () {
    console.log('hallo' + ' ' + name1.value + ' ' + secondname1.value);
};
let name2 = document.querySelector('#name2');
let secondname2 = document.querySelector('#secondname2');
let summbut1 = document.querySelector('#summbut1');
let outpu11 = document.querySelector('.output1');
summbut1.onclick = function () {
    outpu11.innerHTML = +name2.value + +secondname2.value
};

document.querySelector('#seven').value = 'hello';
let y111 = document.querySelector('#borderinput');
y111.style.border = '2px solid red';

let name3 = document.querySelector('#name3');
let secondname3 = document.querySelector('#secondname3');
let outpu12 = document.querySelector('.output2');
let summbut2 = document.querySelector('#summbut2');
summbut2.onclick = function () {
    outpu12.innerHTML = +name3.value + +secondname3.value
};

let t = document.querySelector('#textinput');
let parsbutt = document.querySelector('#parsebutt');
parsbutt.onclick = function () {
    let tt = t.value
    console.log(parseFloat(tt))
};

let name4 = document.querySelector('#name4');
let secondname4 = document.querySelector('#secondname4');
let userage = document.querySelector('#userage');
let userjob = document.querySelector('#userjob');
let submitbut = document.querySelector('#submitbut');
let output2 = document.querySelector('.output3');
submitbut.onclick = function () {
    output2.innerHTML = 'Уважаемый ' + name4.value + ' ' + secondname4.value + ', Ваш возраст ' + userage.value + ' года, по профессии Вы ' + userjob.value
};


//UNIT 3. ОПЕРАТОР IF, ELSE, SWITCH CASE - ВЫБОР В JAVASCRIPT

let a2 = 8;
if (a2 >= 9) {
    console.log('yes');
} else {
    console.log('else')
}
;const age1butt = document.querySelector('#age1butt');
const age1 = document.querySelector('.age1');

age1butt.onclick = () => {
    let num1 = +age1.value;
    if (num1 >= 16 && num1 < 60) {
        console.log('welcome!');
    } else if (num1 >= 60) {
        console.log('иди домой дед')
    } else {
        console.log('ты не пройдешь!');
    }
    switch (num1) {
        case 15:
            console.log('еще рано');
            break;
        case 16:
            console.log('заходи не бойся, уходя не плачь');
            break;
        default:
            console.log('тiкай з городу');
    }
}
const b1 = document.querySelector('#b-1');
const i1 = document.querySelector('#i-1');
const out1 = document.querySelector('.out-1');
b1.onclick = () => {
    let I1 = i1.value;
    if (I1 == 4) {
        out1.innerHTML = 'true';
    } else {
        out1.innerHTML = 'false';
    }
};
const b2 = document.querySelector('#b-2');
const a21 = document.querySelector('#a-21');
const a22 = document.querySelector('#a-22');
const out2 = document.querySelector('.out-2');
b2.onclick = () => {
    let A21 = +a21.value;
    let A22 = +a22.value;
    if (A21 > A22) {
        out2.textContent = A21;
    } else if (A21 == A22) {
        out2.textContent = 'получился ППК';
    } else {
        out2.textContent = A22;
    }
};

let i31 = document.querySelector('#i-31');
let i32 = document.querySelector('#i-32');
let b3 = document.querySelector('#b-3');
let out3 = document.querySelector('.out-3');
b3.onclick = () => {
    let i31value = i31.value;
    let i32value = i32.value
    if (+i31value > +i32value) {
        out3.textContent = i31value;
    } else {
        out3.textContent = i32value;
    }
}

const b4 = document.querySelector('#b-4');
const i4 = document.querySelector('#i-4');
const out4 = document.querySelector('.out-4');
b4.onclick = () => {
    let I4 = +i4.value;
    if (2022 - I4 >= 18) {
        out4.textContent = '1';
    } else {
        out4.textContent = '0';
    }
};
const b5 = document.querySelector('#b-5');
const i5 = document.querySelector('#i-5');
const out5 = document.querySelector('.out-5');
b5.onclick = () => {
    let I5 = +i5.value;
    if (I5 < 0) {
        out5.textContent = 'm';
    } else if (I5 == 0) {
        out5.textContent = '0';
    } else {
        out5.textContent = '1';
    }
};
const b6 = document.querySelector('#b-6');
const i6 = document.querySelector('#i-6');
const out6 = document.querySelector('.out-6');
b6.onclick = () => {
    let I6 = +i6.value % 2;
    console.log(I6);
    if (I6 == 0) {
        out6.textContent = 'even';
    } else {
        out6.textContent = 'odd';
    }
};
const b7 = document.querySelector('#b-7');
const i7 = document.querySelector('#i-7');
const o7 = document.querySelector('#o-7');
const out7 = document.querySelector('.out-7');
b7.onclick = function () {
    let I7 = +i7.value;
    let O7 = +o7.value;
    out7.textContent = Math.pow(I7, O7);
};
const s8 = document.querySelector('#s-8');
const b8 = document.querySelector('#b-8');
const out8 = document.querySelector('.out-8');
b8.onclick = function () {
    let num2 = +s8.value;
    switch (num2) {
        case 1:
            out8.innerHTML = 'one';
            break;
        case 2:
            out8.innerHTML = 'two';
            break;
        case 3:
            out8.innerHTML = 'three';
            break;
    }
};
const b9 = document.querySelector('#b-9');
const i9 = document.querySelector('#i-9');
const out9 = document.querySelector('.out-9');
b9.onclick = function () {
    let I9 = +i9.value;
    if (I9 >= 1 && I9 <= 32) {
        out9.innerHTML = '1';
    } else if (I9 >= 33 && I9 <= 43) {
        out9.innerHTML = '2';
    } else if (I9 >= 44 && I9 <= 64) {
        out9.innerHTML = '3';
    } else {
        out9.innerHTML = '0';
    }
};
1
const s10 = document.querySelector('#s-10');
const b10 = document.querySelector('#b-10');
const out10 = document.querySelector('.out-10');
b10.onclick = function () {
    let S10 = +s10.value;
    out10.innerHTML = S10;
};
const s11 = document.querySelector('#s-11');
const out11 = document.querySelector('.out-11');
s11.onchange = function () {
    let S11 = +s11.value;
    out11.innerHTML = S11;
};
const i12 = document.querySelector('#i-12');
const b12 = document.querySelector('#b-12');
const out12 = document.querySelector('.out-12');
b12.onclick = function () {
    let I12 = i12.value;
    out12.innerHTML = typeof (I12);
};
const i13 = document.querySelector('#i-13');
const b13 = document.querySelector('#b-13');
const out13 = document.querySelector('.out-13');
b13.onclick = function () {
    let I13 = i13.value;
    out13.innerHTML = typeof (I13);
};


// let i14 = document.querySelector('#i-14');
// let o14 = document.querySelector('#o-14');
// let s14 = document.querySelector('#s-14');
// document.querySelector('#b-14').onclick = () => {
//     let I14 = +i14.value;
//     let O14 = +o14.value;
//     let S14 = s14.value
//     switch (S14) {
//         case '+':
//             document.querySelector('.out-14').innerHTML = I14 + O14;
//             break;
//         case '-':
//             document.querySelector('.out-14').innerHTML = I14 - O14;
//             break;
//         case '*':
//             document.querySelector('.out-14').innerHTML = I14 * O14;
//             break;
//         case '/':
//             document.querySelector('.out-14').innerHTML = I14 / O14;
//             break;
//     }
// }
const i14 = document.querySelector('#i-14');
const o14 = document.querySelector('#o-14');
const s14 = document.querySelector('#s-14');
const b14 = document.querySelector('#b-14');
const out14 = document.querySelector('.out-14');
b14.onclick = function () {
    let I14 = +i14.value;
    let O14 = +o14.value;
    let S14 = s14.value;
    if (S14 === '+') {
        out14.innerHTML = I14 + O14;
    } else if (S14 === '-') {
        out14.innerHTML = I14 - O14;
    } else if (S14 === '/') {
        out14.innerHTML = I14 / O14;
    } else if (S14 === '*') {
        out14.innerHTML = I14 * O14;
    }
};


// let s15 = document.querySelector('#s-15');
// let o15 = document.querySelector('#o-15');
// let z15 = document.querySelector('#z-15');
// document.querySelector('#b-15').onclick = () => {
//     let S15 = +s15.value;
//     let O15 = +o15.value;
//     let Z15 = z15.value
//     switch (Z15) {
//         case '&&':
//             document.querySelector('.out-15').innerHTML = S15 + ' ' + Z15 + ' ' + O15;
//             break;
//         case '||':
//             document.querySelector('.out-15').innerHTML = S15 + ' ' + Z15 + ' ' + O15;
//             break;
//
//     }
// }


const i15 = document.querySelector('#s-15');
const o15 = document.querySelector('#o-15');
const z15 = document.querySelector('#z-15');
const b15 = document.querySelector('#b-15');
const out15 = document.querySelector('.out-15');
b15.onclick = function () {
    let I15 = +i15.value;
    let O15 = +o15.value;
    let Z15 = z15.value;
    if (Z15 === '&&') {
        out15.innerHTML = I15 && O15;
    } else if (Z15 === '||') {
        out15.innerHTML = I15 || O15;
    }
};

//UNIT 4. РАБОТАЕМ С ФОРМАМИ: INPUT, RANGE, TEXTAREA, CHECKBOX...

document.querySelector('#butinpas').onclick = () => {
    document.querySelector('.showinpas').innerHTML = document.querySelector('#inpas').value;
};
document.querySelector('#butincol').onclick = () => {
    document.querySelector('#butincol').style.backgroundColor = document.querySelector('#incol').value;
    document.querySelector('.showincol').innerHTML = document.querySelector('#incol').value;
};
document.querySelector('#butindate').onclick = () => {
    document.querySelector('.showindate').innerHTML = document.querySelector('#indate').value;
};

document.querySelector('#inrange').oninput = () => {
    document.querySelector('.showinrange').innerHTML = document.querySelector('#inrange').value;
};
document.querySelector('#butcheckbox').onclick = () => {
    let myCheckbox = document.querySelector('#incheckbox');
    let showcheckbox = document.querySelector('.showcheckbox')
    if (myCheckbox.checked) {
        showcheckbox.innerHTML = myCheckbox.checked;
    } else {
        showcheckbox.innerHTML = myCheckbox.checked;
    }
};
document.querySelector('#butform').onclick = (event) => {
    event.preventDefault();
    let form = document.querySelector('#formexamp');
    document.querySelector('.showform').innerHTML = form.elements.textarea.value + '  ' + form.elements.inptextform.value;
};

//tasks

//T1
//Создайте button - при нажатии на него выводите alert с номером задачи.
document.querySelector('#buttinp1').onclick = () => {
    alert('Задача №1');
};

//T2
//Создайте input type=button - при нажатии на него выводите alert с номером задачи. Номер задачи просто пропишите вручную.
document.querySelector('#buttinp2').onclick = () => {
    alert('Задача №2');
}

//T3
//Создайте p - при нажатии на него выводите alert с номером задачи.
document.querySelector('.pinp3').onclick = () => {
    alert('Задача №3');
};

//T4
//Создайте input(checkbox) и button - при нажатии на кнопку выводите true если checkbox выбран и false если не выбран.

document.querySelector('#buttinp4').onclick = () => {
    if (document.querySelector('#checkinp4').checked) {
        document.querySelector('.outinp4').innerHTML = true;
    } else {
        document.querySelector('.outinp4').innerHTML = false;
    }
};

//T5
//Создайте input(checkbox).i-5 и button.b-5. Для checkbox добавьте value="task-5" - при нажатии на кнопку b-5 выводите value checkbox если checkbox выбран и false если не выбран.

let checkinp5 = document.querySelector('#checkinp5');
let outinp5 = document.querySelector('.outinp5');
document.querySelector('#buttinp5').onclick = () => {
    if (checkinp5.checked) {
        outinp5.innerHTML = checkinp5.value;
    } else {
        outinp5.innerHTML = false;
    }
};

//T6
//Создайте input(hidden) и button - при нажатии на кнопку выводите value из input в div

document.querySelector('#buttinp6').onclick = () => {
    document.querySelector('.outinp6').innerHTML = document.querySelector('#checkinp6').value;
};

//T7
//Создайте input(password) и button - при нажатии на кнопку выводите в div.outinp71 value прописанное в input.
//В div.outinp72 выводите 1 если длина пароля больше или равна 6 или 0 если меньше. Для подсчета количества символов в строке используйте length.

let checkinp7 = document.querySelector('#checkinp7');
document.querySelector('#buttinp7').onclick = () => {
    document.querySelector('.outinp71').innerHTML = checkinp7.value;
    if (checkinp7.value.length >= 6) {
        document.querySelector('.outinp72').innerHTML = 1;
    } else {
        document.querySelector('.outinp72').innerHTML = 0;
    }
}

//T8
//Создайте div и button. При нажатии кнопки создавайте внутри div элемент input и кнопку (innerHTML).
//Добавьте на созданную кнопку событие клик и запуск функции. Функция должна в out(2) выводить value созданного input.
document.querySelector('#buttinp81').onclick = () => {
    let checkinp82 = document.createElement('input');
    let buttinp82 = document.createElement('button');
    let outinp82 = document.createElement('div');

    checkinp82.setAttribute('id', 'checkinp82');
    buttinp82.setAttribute('id', 'buttinp82');
    outinp82.setAttribute('class', 'outinp82');
    buttinp82.innerHTML = 'клацай';

    document.querySelector('.outinp81').appendChild(checkinp82);
    document.querySelector('.outinp81').appendChild(buttinp82);
    document.querySelector('.outinp81').appendChild(outinp82);

    document.querySelector('#buttinp82').onclick = () => {
        document.querySelector('.outinp82').innerHTML = document.querySelector('#checkinp82').value;
    }
};

//T9
//Создайте один input(radio) и button - при нажатии на button если radio выбран (активен, checked) выводите в div - value прописанное в input, либо 0 если не активен.

let radioinp9 = document.querySelector('#radioinp9');
document.querySelector('#buttinp9').onclick = () => {
    if (radioinp9.checked) {
        document.querySelector('.outinp9').innerHTML = radioinp9.value;
    } else {
        document.querySelector('.outinp9').innerHTML = 0;
    }
};

//T10
//Создайте input(color) и button - при нажатии на кнопку окрашивайте div выбранным цветом (имеется ввиду .style.background).

document.querySelector('#buttinp10').onclick = () => {
    document.querySelector('.outinp10').style.background = document.querySelector('#colorinp10').value;
};

//T11
//Создайте input(color).colorinp111 и input(color).colorinp112- два элемента и button - при нажатии на кнопку присвойте цвет из первого input в value второго.

document.querySelector('#buttinp11').onclick = () => {
    document.querySelector('#colorinp112').value = document.querySelector('#colorinp111').value;
};

//T12
//Создайте input(date) и button - при нажатии на кнопку выводите в div выбранную в input дату.

document.querySelector('#buttinp12').onclick = () => {
    document.querySelector('.outinp12').innerHTML = document.querySelector('#dateinp12').value;
};

//T13
//Создайте input(range). При изменении положения ползунка input выводите значение в out. Для события используйте oninput.

document.querySelector('#rangeinp13').oninput = () => {
    document.querySelector('.outinp13').innerHTML = document.querySelector('#rangeinp13').value;
};

//T14
//Создайте text-area и button - при нажатии на кнопку выводите в out-14 текст введенный в text-area

document.querySelector('#buttinp14').onclick = () => {
    document.querySelector('.outinp14').innerHTML = document.querySelector('#textarea14').value;
};

//T15
//Создайте text-area input и button - при нажатии на кнопку выводите текст из input в textarea и на страницу в out-15.

document.querySelector('#buttinp15').onclick = () => {
    document.querySelector('#textarea15').value = document.querySelector('#textinp15').value;
    document.querySelector('.outinp15').innerHTML = document.querySelector('#textinp15').value;
};


//T16
//Создайте select и button - при нажатии на кнопку выводите в out-16 value выбранного option из select16.

document.querySelector('#buttinp16').onclick = () => {
    document.querySelector('.outinp16').innerHTML = document.querySelector('#select16').value;
};

//T17
//Создайте select. Добавьте ему событие onchange, при наступлении которого запускается функция. Функция должна выводить в out-17 value выбранного в select option.

document.querySelector('#select17').onchange = () => {
    document.querySelector('.outinp17').innerHTML = document.querySelector('#select17').value;
};

//T18
//Создайте select и input. Добавьте на select событие onchange, при наступлении которого запускается функция. Функция должна выводить в input value выбранного в select option.

document.querySelector('#select18').onchange = () => {
    document.querySelector('#textinp18').value = document.querySelector('#select18').value;
};

//T19
//Создайте форму. В ней input(text).textinp191 и input(password).passinp192 - и кнопку button. По нажатию кнопки выводите значение text и password в out-19 через пробел.
//Обратите внимание на хитрость. Мы, кнопку сейчас повесили за пределами формы. Чуть позже мы рассмотрим почему это делали.

document.querySelector('#buttinp19').onclick = () => {
    document.querySelector('.outinp19').innerHTML = document.querySelector('#textinp191').value + ' ' + document.querySelector('#passinp192').value
};

//T20
//Создайте форму. В ней input(text) и input(password) - и кнопку button. По нажатию кнопки выводите значение из input text и password в out-20 через пробел. Используйте form.elements.

document.querySelector('#buttinp20').onclick = function (form) {
    let inputs = document.getElementById("forminp20").elements;
    let usernameinput = inputs['username'];
    let passwordinput = inputs['password'];
    document.querySelector('.outinp20').innerHTML = usernameinput.value + ' ' + passwordinput.value;
    form.preventDefault();
};


//UNIT 5. ЦИКЛЫ В JAVASCRIPT (ЧАСТЬ 1)

let divfor = document.querySelectorAll('.divfor div');
console.log(divfor);
for (let i = 0; i < divfor.length; i = i + 1) {
    console.log(divfor[i]);
    divfor[i].style.background = 'red';
}
;let divfor1 = document.getElementsByClassName('divfor');
console.log(divfor1);
for (let i = 0; i < divfor1.length; i++) {
    divfor1[i].style.border = '2px solid black';
}
;document.querySelector('#radiobut').onclick = () => {
    let radio = document.querySelectorAll('.radiodiv input');
    console.log(radio);
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            console.log(radio[i].value);
        }
    }
};
let divout = '';
for (let i = 0; i < 10; i++) {

    if (i == 4) continue;
    if (i == 8) break;
    divout += i + ' ';
}
;document.querySelector('.divout').innerHTML = divout;


function t1() {
    let out_2 = "";
    for (let i = 0; i <= 50; i = i + 1) {
        out_2 += i + " ";
    }
    document.querySelector(".showcycle").innerHTML = out_2;
};document.querySelector('#cyclebut').onclick = t1;

function t2() {
    let out_3 = "";
    for (let i = 2; i <= 122; i = i + 2) {
        out_3 += i + " ";
    }
    document.querySelector(".showcycle1").innerHTML = out_3;
};document.querySelector('#cyclebut1').onclick = t2;


function t3() {
    let out_4 = "";
    for (let i = 25; i >= 7; i--) {
        out_4 += i + " ";
    }
    document.querySelector(".showcycle2").innerHTML = out_4;
};document.querySelector('#cyclebut2').onclick = t3;


function t4() {
    let out_5 = "";
    for (let i = 77; i >= 35; i -= 3) {
        out_5 += i + " ";
    }
    document.querySelector(".showcycle3").innerHTML = out_5;
};document.querySelector('#cyclebut3').onclick = t4;


function t5() {
    let out_6 = "";
    for (let i = 1; i <= 17; i++) {
        if (i % 2 == 0) {
            out_6 += i + "_**";
        } else {
            out_6 += i + "_*";
        }
    }
    document.querySelector(".showcycle4").innerHTML = out_6;
};document.querySelector('#cyclebut4').onclick = t5;

function t6() {
    let out_7 = "";
    for (let i = 1; i <= 3; i++) {
        out_7 += "******<br>";
    }
    document.querySelector(".showcycle5").innerHTML = out_7;
};document.querySelector('#cyclebut5').onclick = t6;


function t7() {
    let out_8 = "";
    let cyclein = document.querySelector('#cyclein').value;
    for (let i = cyclein; i >= 0; i--) {
        out_8 += i + " ";
    }
    document.querySelector(".showcycle6").innerHTML = out_8;
};document.querySelector('#cyclebut6').onclick = t7;


function t8() {
    let out_9 = "";
    let fircyclein = document.querySelector('#fircyclein').value;
    let seccyclein = document.querySelector('#seccyclein').value;
    for (let i = fircyclein; i <= seccyclein; i++) {
        out_9 += i + " ";
    }
    document.querySelector(".showcycle7").innerHTML = out_9;
};document.querySelector('#cyclebut7').onclick = t8;

function t9() {
    let out_10 = "";
    let fircyclein1 = document.querySelector('#fircyclein1').value;
    let seccyclein1 = document.querySelector('#seccyclein1').value;
    if (fircyclein1 < seccyclein1) {
        for (let i = fircyclein1; i <= seccyclein1; i++) {
            out_10 += i + " ";
        }
    } else {
        for (let i = fircyclein1; i >= seccyclein1; i--) {
            out_10 += i + " ";
        }
    }
    document.querySelector(".showcycle8").innerHTML = out_10;
};document.querySelector('#cyclebut8').onclick = t9;

function t10() {
    let out_11 = "";
    for (let i = 1950; i <= 2000; i += 2) {
        out_11 += i + " ";
    }
    document.querySelector(".showcycle9").innerHTML = out_11;
};document.querySelector('#cyclebut9').onclick = t10;


function t11() {
    let showdiv = document.querySelectorAll('.div-11');
    for (let i = 0; i < showdiv.length; i++) {
        document.querySelector(".showcycle10").innerHTML += showdiv[i].innerHTML + ' ';
    }
};document.querySelector('#cyclebut10').onclick = t11;


function t12() {
    let divfor1 = document.querySelectorAll('.div-12');
    for (let i = 0; i < divfor1.length; i++) {
        divfor1[i].style.background = 'orange';
    }
};document.querySelector('#cyclebut11').onclick = t12;

let input_13 = document.querySelectorAll('.i-13');

function t13() {

    for (let i = 0; i < input_13.length; i++) {
        input_13[i].value = i + 1;
    }
};document.querySelector('#cyclebut12').onclick = t13;

function t14() {
    let showdiv12 = document.querySelector('.showcycle13')
    let radio = document.querySelectorAll('.i-14');
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            showdiv12.innerHTML = radio[i].value;
        }
    }
};document.querySelector('#cyclebut13').onclick = t14;

function t15() {
    let out_15 = "";
    for (let i = 10, j = 0; i >= 0, j <= 10; i--, j++) {
        out_15 += i + ' ' + j + ' ';
    }

    document.querySelector(".showcycle14").innerHTML = out_15;
};document.querySelector('#cyclebut14').onclick = t15;


//UNIT 6. ВЛОЖЕННЫЕ ЦИКЛЫ В JAVASCRIPT (ЧАСТЬ 2)

let outstars = document.querySelector('.outstars');
for (let i = 0; i < 5; i++) {
    for (let k = 0; k < 10; k++) {
        outstars.innerHTML += '* ';
    }
    outstars.innerHTML += '<br>';
}
;

let outtable = document.querySelector('.outtable');
for (let i = 1; i < 10; i++) {
    for (let k = 1; k < 10; k++) {
        outtable.innerHTML += `${i}*${k}=${i * k}<br>`;
    }
    outtable.innerHTML += '<hr>'
}
;

let outstars1 = document.querySelector('.outstars1');
for (let i = 0; i < 3; i++) {
    for (let k = 0; k < 3; k++) {
        outstars1.innerHTML += '*';
    }
    outstars1.innerHTML += '_';
}
;

let outstars2 = document.querySelector('.outstars2');
for (let i = 1; i <= 3; i++) {
    outstars2.innerHTML += `${i} <br>`;
    for (let k = 0; k < 3; k++) {
        outstars2.innerHTML += '*_';
    }
    outstars2.innerHTML += `<br>`;
}
;

let outstars3 = document.querySelector('.outstars3');
for (let i = 1; i <= 4; i++) {
    for (let k = 0; k < 3; k++) {
        outstars3.innerHTML += '*_';
    }
    outstars3.innerHTML += '<br>';
}
;

let outstars4 = document.querySelector('.outstars4');
for (let i = 1; i <= 4; i++) {
    outstars4.innerHTML += `${i}_`;
    for (let k = 1; k <= 5; k++) {
        outstars4.innerHTML += `${k} `;
    }
}
;

let outstars5 = document.querySelector('.outstars5');
for (let i = 1; i <= 3; i++) {
    for (let k = 0; k < 6; k++) {
        if (k % 2 == 0) {
            outstars5.innerHTML += 1;
        } else {
            outstars5.innerHTML += 0;
        }
    }
    outstars5.innerHTML += '<br>';
}
;

let outstars6 = document.querySelector('.outstars6');
for (let i = 1; i <= 3; i++) {
    for (let k = 0; k < 6; k++) {
        if (k % 3 == 2) {
            outstars6.innerHTML += 'x';
        } else if (k % 2 == 0) {
            outstars6.innerHTML += '1';
        } else {
            outstars6.innerHTML += '0';
        }
    }

    outstars6.innerHTML += '<br>';
}
;

let outstars7 = document.querySelector('.outstars7');
for (let i = 1; i <= 4; i++) {
    for (let k = 1; k <= i; k++) {
        outstars7.innerHTML += `*`;
    }
    outstars7.innerHTML += `<br>`;
}
;

let outstars8 = document.querySelector('.outstars8');
for (let i = 4; i >= 1; i--) {
    for (let k = 1; k <= i; k++) {
        outstars8.innerHTML += `*`;
    }
    outstars8.innerHTML += `<br>`;
}
;
// второй вариант
// let outstars8 = document.querySelector('.outstars8');
// for (let i = 1; i <= 4; i++) {
//     for (k = 4; k >= i; k--) {
//         outstars8.innerHTML +=`*`;
//     }
//     outstars8.innerHTML += `<br>`;
// };

let outstars9 = document.querySelector('.outstars9');
for (let i = 1; i <= 5; i++) {
    for (let k = 1; k <= i; k++) {
        outstars9.innerHTML += `${k} `;
    }
    outstars9.innerHTML += `<br>`;
}
;

// let outstars10 = document.querySelector('.outstars10');
// for (let i = 1; i <= 5; i++) {
//     for (k = 0; k <= 10; k++) {
//         if ((k*i) < 10) {
//             outstars10.innerHTML += `${k}`+'0 ';
//         }
//         else {
//             outstars10.innerHTML += `${k*i} `;
//         }
//     }
//     outstars10.innerHTML += `<br>`;
// };


let outstars10 = document.querySelector('.outstars10');
let a = '', b = 0;
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
        b = +b + 1
        a += (b < 10) ? `0${b} ` : `${b} `
    }
    a += '<br>'
}
;outstars10.innerHTML = a;


//UNIT 7. ФУНКЦИИ И ВСЕ О НИХ

let a1 = 8;

function t20() {
    document.querySelector('.outstars11').innerHTML = a1;
}

document.querySelector('#funcbutt').onclick = t20;

let a12 = 8;

function t21() {
    return a12;
}

document.querySelector('#funcbutt1').onclick = function () {
    document.querySelector('.outstars12').textContent = t21();
};

function t22(a, b) {
    return (a * b);
}

document.querySelector("#funcbutt2").onclick = function () {
    document.querySelector('.outstars13').textContent = t22(3, 4);
}
document.querySelector('#funcbutt3').onclick = function () {
    document.querySelector('.outstars13').textContent = t22(5, 6);
}

function t23() {
    let a = document.querySelector('#inputbrthdate');
    let b = 2022 - a.value;
    return b;
};document.querySelector('#funcbutt14').onclick = function () {
    document.querySelector('.outstars14').textContent = t23();
};

function t24(a = 'Hello', b = 'Dmitry', c = ' ') {
    return a + c + b;
}

document.querySelector('#funcbutt15').onclick = function () {
    document.querySelector('.outstars15').textContent = t24();
};

function t25() {


    let a25 = +document.querySelector('#inputnumb').value;
    let b25 = +document.querySelector('#inputnumb1').value;
    if (a25 < b25) {
        return Math.floor((Math.random() * (b25 - a25 + 1)) + a25);
    } else {
        return Math.floor((Math.random() * (a25 - b25 + 1)) + b25);
    }
};document.querySelector('#funcbutt16').onclick = function () {
    document.querySelector('.outstars16').textContent = t25();
};

function t26() {
    let x = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    let y = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    let z = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    return `rgb(${x}, ${y}, ${z})`;
}

document.querySelector('#funcbutt17').onclick = function () {
    document.querySelector('.outstars17').innerHTML = t26();
    document.querySelector('.outstars17').style.color = t26();
};

function t27(str) {
    return str.trim();
}

document.querySelector('#funcbutt18').onclick = function () {
    document.querySelector('.outstars18').innerHTML = t27(' hello ');

};

function t28(a) {
    if (a % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

document.querySelector('#funcbutt19').onclick = function () {
    document.querySelector('.outstars19').innerHTML = t28(document.querySelector('#inputnumb2').value);
};

function t29(n, m) {
    n = Number(n);
    m = Number(m);

    if (n > m) {
        return n;
    } else if (n == m) {
        return n || m;
    } else if (n < m) {
        return m;
    }
}

document.querySelector('#funcbutt20').onclick = function () {
    document.querySelector('.outstars20').innerHTML = t29(document.querySelector('#inputnumb3').value, document.querySelector('#inputnumb4').value);
};
// второй способ
// function t29(n,m) {
//     return Math.max(n,m)
// }
// document.querySelector('#funcbutt20').onclick = function() {
//     document.querySelector('.outstars20').innerHTML = t29(document.querySelector('#inputnumb3').value,document.querySelector('#inputnumb4').value);
// };


// UNIT 8. ЦИКЛ WHILE, DO WHILE

let sum = 0;
let p = 0;
while (p <= 10) {
    sum = sum + p;
    p++;
}
console.log('sum = ' + sum)


let outstars21 = document.querySelector('.outstars21');
let p1 = 0;
let outStr = '';
let flag = 3;

while (p1 < 4) {
    let p2 = 0;
    while (p2 < 4) {
        if (p2 < flag) {
            outStr += '&nbsp';
        } else {
            outStr += '*';
        }
        p2++;
    }
    flag--;
    outStr += '<br>';
    p1++;
}
outstars21.innerHTML = outStr;


let outwhile = document.querySelector('.outwhile1');
let p3 = 1;
let k3 = ''

function t30() {
    while (p3 <= 50) {
        k3 += `${p3} `; // p3 + " ";
        p3++;
    }
    outwhile.innerHTML = k3;
}

document.querySelector('#funcbutt21').onclick = t30;


let outwhile1 = document.querySelector('.outwhile2');
let p4 = 2;
let k4 = '';

function t31() {
    while (p4 <= 122) {
        k4 += `${p4} `; // p4 + " ";
        p4 += 2;
    }
    outwhile1.innerHTML = k4;
}

document.querySelector('#funcbutt22').onclick = t31;

let outwhile2 = document.querySelector('.outwhile3');
let p5 = 25;
let k5 = '';

function t32() {
    while (p5 >= 7) {
        k5 += `${p5} `; // p5 + " ";
        p5--;
    }
    outwhile2.innerHTML = k5;
}

document.querySelector('#funcbutt23').onclick = t32;

let outwhile3 = document.querySelector('.outwhile4');
let p6 = 77;
let k6 = '';

function t33() {
    while (p6 >= 35) {
        k6 += `${p6}_`; // p6 + "_";
        p6 += -3;
    }
    outwhile3.innerHTML = k6;
}

document.querySelector('#funcbutt24').onclick = t33;


let outwhile4 = document.querySelector('.outwhile5');
let p7 = 1;
let k7 = '';

function t34() {
    while (p7 <= 17) {
        if (p7 % 2 == 0) {
            k7 += `${p7}_**`; // p7 + "_";
            p7++;
        } else {
            k7 += `${p7}_*`; // p7 + "_";
            p7++;

        }
    }
    outwhile4.innerHTML = k7;
}

document.querySelector('#funcbutt25').onclick = t34;

let outwhile6 = document.querySelector('.outwhile6');
let inputwhile6 = document.querySelector('#inputwhile6');
let p8 = 1;
let outStr8 = '';

function t35() {
    while (p8 <= +inputwhile6.value) {
        let p81 = 1;
        while (p81 <= 6) {
            outStr8 += '*';
            p81++;
        }
        outStr8 += '<br>';
        p8++;
    }
    outwhile6.innerHTML = outStr8;
}

document.querySelector('#funcbutt26').onclick = t35;


let outwhile7 = document.querySelector('.outwhile7');
let inputwhile7 = document.querySelector('#inputwhile7');
let outStr9 = '';

function t36() {
    let p9 = inputwhile7.value;
    while (p9 >= 0) {
        outStr9 += `${p9} `;
        p9--;
    }
    outwhile7.innerHTML = outStr9;
}

document.querySelector('#funcbutt27').onclick = t36;


let outwhile8 = document.querySelector('.outwhile8');
let inputwhile8 = document.querySelector('#inputwhile8');
let inputwhile9 = document.querySelector('#inputwhile9');
let outStr10 = '';

function t37() {
    let p10 = inputwhile8.value;
    let k10 = inputwhile9.value;
    p10 = Number(p10);
    k10 = Number(k10);
    if (p10 < k10) {
        while (p10 <= k10) {
            outStr10 += `${p10} `;
            p10++;
        }
    } else if (p10 > k10) {
        while (p10 >= k10) {
            outStr10 += `${p10} `;
            p10--;
        }
    } else if (p10 == k10) {
        outStr10 += 'error';
    }
    outwhile8.innerHTML = outStr10;
};document.querySelector('#funcbutt28').onclick = t37;

let outwhile9 = document.querySelector('.outwhile9');
let inputwhile10 = document.querySelector('#inputwhile10');
let inputwhile11 = document.querySelector('#inputwhile11');
let outStr11 = '';

function t38() {
    let p11 = inputwhile10.value;
    let k11 = inputwhile11.value;
    p11 = Number(p11);
    k11 = Number(k11);
    if (p11 < k11) {
        while (p11 <= k11) {
            outStr11 += `${p11} `;
            p11++;
        }
    } else if (p11 > k11) {
        while (k11 <= p11) {
            outStr11 += `${k11} `;
            k11++;
        }
    } else if (p11 == k11) {
        outStr11 += 'error';
    }
    outwhile9.innerHTML = outStr11;
};document.querySelector('#funcbutt29').onclick = t38;


let outwhile10 = document.querySelector('.outwhile10');
let p12 = 1950;
let k12 = '';

function t39() {
    while (p12 <= 2000) {
        k12 += `${p12} `; // p12 + " ";
        p12 += 2;
    }
    outwhile10.innerHTML = k12;
}

document.querySelector('#funcbutt30').onclick = t39;


let outwhile11 = document.querySelector('.outwhile11');
let divwihle = document.querySelectorAll('.divt40');
let p13 = 0;
let k13 = '';

function t40() {
    while (p13 < divwihle.length) {
        k13 += divwihle[p13].innerHTML + ' ';
        p13++;
    }
    outwhile11.innerHTML = k13;
}

document.querySelector('#funcbutt31').onclick = t40;


let divwihle12 = document.querySelectorAll('.divt41');
let p14 = 0;

function t41() {
    while (p14 < divwihle12.length) {
        divwihle12[p14].style.background = 'orange';
        p14++;
    }
}

document.querySelector('#funcbutt32').onclick = t41;


let inputwhile13 = document.querySelectorAll('.inputwhile13');
let p15 = 0;

function t42() {
    while (p15 < divwihle12.length) {
        inputwhile13[p15].value += p15 + 1;
        p15++;
    }
}

document.querySelector('#funcbutt33').onclick = t42;


function t43() {
    let outwhile14 = document.querySelector('.outwhile14');
    let radiowhile = document.querySelectorAll('.radiowhile');
    let p16 = 0;
    while (p16 < radiowhile.length) {
        if (radiowhile[p16].checked) {
            outwhile14.innerHTML = radiowhile[p16].value;
        }
        p16++;
    }
};document.querySelector('#funcbutt34').onclick = t43;


let outwhile15 = document.querySelector('.outwhile15');
let p17 = 10;
let o17 = 0;
let k17 = '';

function t44() {
    while (p17 >= 0, o17 <= 10) {
        k17 += `${p17} ${o17} `;
        p17--;
        o17++;
    }
    outwhile15.innerHTML = k17;
};document.querySelector('#funcbutt35').onclick = t44;


// function t15() {
//     let out_15 = "";
//     for (let i = 10, j = 0; i >= 0, j <= 10; i--, j++) {
//         out_15 += i + ' ' + j + ' ';
//     }
//
//     document.querySelector(".showcycle14").innerHTML = out_15;
// };
// document.querySelector('#cyclebut14').onclick = t15;


// UNIT 9. РАБОТАЕМ С DOM

const showstyle = document.querySelector('.showstyle');

showstyle.style.width = '150px';
showstyle.style.paddingBottom = '40px';

console.log(showstyle.style);

showstyle.classList.add('showstyle2', 'showstyle3'); //несколько классов добавляется через запятую и в отдельных ковычках
showstyle.classList.remove('showstyle3');

const toggle = document.querySelector('.toggle');

toggle.onclick = function () {
    this.classList.toggle('showstyle3');
};

console.log(showstyle.getAttribute('data-showstyle'));
console.log(document.querySelectorAll('link')[1].getAttribute('href'));

showstyle.setAttribute('data-num', 6);

let gas = document.querySelectorAll('.gas');
for (let i = 0; i < gas.length; i++) {
    gas[i].onclick = function () {
        let gallons = document.querySelector('.gallons').value;
        let amount = this.getAttribute('data-gas');
        console.log(gallons * amount);
    }
}

let addedtext = document.createElement('div');
addedtext.innerHTML = 'hello';
addedtext.classList.add('addedtext');

document.querySelector('.addtext').appendChild(addedtext);
addedtext.onclick = function () {
    alert('hallo');
}

function funct1() {
    document.querySelector('.outdom1').style.width = '200px';
    document.querySelector('.outdom1').style.height = '40px';
};document.querySelector('#dombut1').onclick = funct1;

function funct2() {
    document.querySelector('.outdom2').classList.add('bg-2')
};document.querySelector('#dombut2').onclick = funct2;

function funct3() {
    document.querySelector('.outdom3').classList.remove('bg-3');
};document.querySelector('#dombut3').onclick = funct3;

function funct4() {
    document.querySelector('.outdom4').classList.toggle('bg-4')
};document.querySelector('#dombut4').onclick = funct4;


function funct5() {
    let a = document.querySelector('.outdom4');
    let b = document.querySelector('.outdom5');

    b.innerHTML = a.classList.contains('bg-4');

};document.querySelector('#dombut5').onclick = funct5;


function funct6() {
    let lengthp6 = document.querySelectorAll('.p-6');
    document.querySelector('.outdom6').innerHTML = lengthp6.length;
};document.querySelector('#dombut6').onclick = funct6;

function funct7() {
    let outdom7 = document.querySelectorAll('.outdom7');
    for (let i = 0; i < outdom7.length; i++) {
        outdom7[i].classList.add('bg-7')
    }

};document.querySelector('#dombut7').onclick = funct7;

function funct8() {
    let outdom8 = document.querySelectorAll('.outdom8');
    for (let i = 0; i < outdom8.length; i++) {
        outdom8[i].classList.toggle('bg-8')
    }

};document.querySelector('#dombut8').onclick = funct8;


function funct9() {
    this.classList.add('bg-9');
}

let outdom9 = document.querySelectorAll('.outdom9');
for (let i = 0; i < outdom9.length; i++) {
    outdom9[i].onclick = funct9;
}
;


function funct10() {
    this.classList.toggle('bg-9');
}

let outdom10 = document.querySelectorAll('.outdom10');
for (let i = 0; i < outdom10.length; i++) {
    outdom10[i].onclick = funct10;
}
;


let addedtext11 = document.createElement('div');
addedtext11.innerHTML = '25';
addedtext11.classList.add('addedtext11');

function funct11() {
    document.querySelector('.outdom11').append(addedtext11);
};document.querySelector('#dombut11').onclick = funct11;


let addedtext12 = document.createElement('div');
addedtext12.innerHTML = '12';
addedtext12.classList.add('addedtext12', 'bg-12');

function funct12() {
    document.querySelector('.outdom12').append(addedtext12);
};document.querySelector('#dombut12').onclick = funct12;


const addedtext13 = document.createElement('div');
addedtext13.innerHTML = 'Push Me';
addedtext13.classList.add('addedtext13', 'bg-13');

function funct13() {
    document.querySelector('.outdom13').append(addedtext13);
    document.querySelector('.addedtext13').onclick = funct13_1;
};document.querySelector('#dombut13').onclick = funct13;

function funct13_1() {
    const addedtext13 = document.createElement('div');
    addedtext13.innerHTML = 'Push Me';
    addedtext13.classList.add('addedtext13', 'bg-13');
    document.querySelector('.outdom14').append(addedtext13);
};


const addedtext14 = document.createElement('div');
addedtext14.innerHTML = '14';
addedtext14.classList.add('addedtext14', 'bg-14');

function funct14() {
    document.querySelector('.outdom14-1').prepend(addedtext14);

};document.querySelector('#dombut14').onclick = funct14;


const addedtext15 = document.createElement('div');
addedtext15.innerHTML = '15';
addedtext15.classList.add('addedtext15', 'bg-15');

function funct15() {
    document.querySelector('.outdom15').before(addedtext15);
};document.querySelector('#dombut15').onclick = funct15;


const addedtext16 = document.createElement('div');
addedtext16.innerHTML = '16';
addedtext16.classList.add('addedtext16', 'bg-16');

function funct16() {
    document.querySelector('.outdom16').after(addedtext16);
};document.querySelector('#dombut16').onclick = funct16;


const addedtext17 = document.createElement('div');
addedtext17.innerHTML = '17';
addedtext17.classList.add('addedtext17', 'bg-17');

function funct17() {
    document.querySelector('.outdom17').replaceWith(addedtext17);
};document.querySelector('#dombut17').onclick = funct17;


function funct18() {
    let p18 = document.querySelector('.p-18');
    let getatrib = p18.getAttribute('data-b');
    document.querySelector('.outdom18').innerHTML = getatrib;

};document.querySelector('#dombut18').onclick = funct18;

function funct19() {
    let p19 = document.querySelectorAll('.p-19');
    for (let i = 0; i <= p19.length; i++) {
        let getatrib12 = p19[i].getAttribute('data-b');
        getatrib12 = Number(getatrib12)
        document.querySelector('.outdom19').innerHTML += getatrib12 + ' ';
    }
};document.querySelector('#dombut19').onclick = funct19;


function funct20() {
    document.querySelector('.outdom20').setAttribute('title', 'go');

};document.querySelector('#dombut20').onclick = funct20;


// UNIT 10. МАССИВЫ В JAVASCRIPT

let array = ['Иван', 37, 'Овен'];
console.log(array[0]);
console.log(array[1]);
console.log(array[2]);
console.log(array[3]);
console.log(array);
console.log(array.length);

let zodiak = ['Козерог', 1, 1, 19]
console.log(zodiak);
console.log('Длинна массива:', zodiak.length);
let man = ['Ivan', 'male', 176, 93, 'Ivanov'];
console.log(man);
console.log('Длинна массива:', man.length);
console.log(man[4]);
man[0] = 'Sergey';
console.log(man);

let numbers = [1, 2, 3, 4];
console.log(numbers);

let numbersind1 = numbers[0] // тут хранится 1
numbers[0] = numbers[numbers.length - 1];
numbers[numbers.length - 1] = numbersind1;
console.log(numbers);

// первый вариант записи массива в HTML

// for (let i = 0; i < numbers.length; i++) {
//     document.querySelector('.outarray').innerHTML += numbers[i] + ' ';
// };


let outarray = '';
for (let i = 0; i < numbers.length; i++) {
    outarray += numbers[i] + ' ';
}
;document.querySelector('.outarray').innerHTML = outarray;

let numbers2 = [4, 2, 5, 23, 43, 4, 2, 6, 12]


//max
let max = numbers2[0];

for (let i = 0; i < numbers2.length; i++) {
    if (numbers2[i] > max) {
        max = numbers2[i]
    }
}
console.log('max: ' + max)


//min
let min = numbers2[0]; // 4

for (let i = 0; i < numbers2.length; i++) {
    if (numbers2[i] < min) {
        min = numbers2[i]
    }
}
console.log('min: ' + min);


//sum
let sumarray = 0; // 4

for (let i = 0; i < numbers2.length; i++) {
    sumarray = sumarray + numbers2[i];
}
;console.log('сумма: ' + sumarray);


let firstarray = ['one', 2, true, false];

function masfunct1() {

    document.querySelector('.outarray1').innerHTML = firstarray;
};document.querySelector('#arraybut1').onclick = masfunct1;


let secondarray = ['three', 4, true, false];

function masfunct2() {
    let outarray2 = '';
    for (let i = 0; i < secondarray.length; i++) {
        outarray2 += secondarray[i] + ' ';
    }
    document.querySelector('.outarray2').innerHTML = outarray2;
};document.querySelector('#arraybut2').onclick = masfunct2;


let thirdarray = ['five', 6, true, false];

function masfunct3() {

    document.querySelector('.outarray3').innerHTML = thirdarray.length;
};document.querySelector('#arraybut3').onclick = masfunct3;


let fourtharray = ['один', 2, 'три', 4, 'пять', 6, 'семь', 8, 'девять', 10];

function masfunct4() {
    let outarray4 = '';
    outarray4 += fourtharray[0] + ' ' + fourtharray[3] + ' ' + fourtharray[8];

    document.querySelector('.outarray4').innerHTML = outarray4;
};document.querySelector('#arraybut4').onclick = masfunct4;


let fiftharray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

function masfunct5() {
    let outarray5 = '';
    outarray5 = fiftharray[0] + fiftharray[2] + fiftharray[3];

    document.querySelector('.outarray5').innerHTML = outarray5;
};document.querySelector('#arraybut5').onclick = masfunct5;


let sixtharray = ['Dmitry', 'Sagittarius', 28, 'november'];

function masfunct6() {
    let outarray6 = '';
    for (let i = 0; i < sixtharray.length; i++) {
        outarray6 += sixtharray[i] + ' ';
    }
    document.querySelector('.outarray6').innerHTML = outarray6;
};document.querySelector('#arraybut6').onclick = masfunct6;


let seventharray = ['china', 'india', 'brazil', 'japan', 'egypt'];

function masfunct7() {
    seventharray[7] = 'vietnam';
    seventharray[6] = 'turkey';
    seventharray[5] = 'italy';
    let outarray7 = '';
    for (let i = 0; i < seventharray.length; i++) {
        outarray7 += seventharray[i] + ' ';
    }
    document.querySelector('.outarray7').innerHTML = outarray7;
};document.querySelector('#arraybut7').onclick = masfunct7;


let eightharray = [];

function masfunct8() {
    eightharray[3] = 3.14;
    eightharray[4] = 17;
    eightharray[6] = 5;
    let outarray8 = '';
    for (let i = 0; i < eightharray.length; i++) {
        outarray8 += eightharray[i] + '-';
    }
    document.querySelector('.outarray8').innerHTML = outarray8;
    document.querySelector('.outarray8-1').innerHTML = eightharray.length;
};document.querySelector('#arraybut8').onclick = masfunct8;


let nintharray = [100, 200, 300, 400, 700, 121];

function masfunct9() {
    document.querySelector('.outarray9').innerHTML = nintharray[nintharray.length - 1];
};document.querySelector('#arraybut9').onclick = masfunct9;


let tentharray = [100, 200, 300, 400, 700, 121];

function masfunct10() {
    document.querySelector('.outarray10').innerHTML = tentharray[1] + tentharray[tentharray.length - 1];
};document.querySelector('#arraybut10').onclick = masfunct10;


let eleventharray = [2, 3, 4, 5, 6, 7];

function masfunct11() {
    let swapnumb11 = eleventharray[2] // тут хранится 1
    eleventharray[2] = eleventharray[4];
    eleventharray[4] = swapnumb11;
    let outarray11 = '';
    for (let i = 0; i < eleventharray.length; i++) {
        outarray11 += eleventharray[i] + ' ';
    }
    document.querySelector('.outarray11').innerHTML = outarray11;

};document.querySelector('#arraybut11').onclick = masfunct11;


let twelftharray = ['test', 'west', 'list', 'class', 'best'];

function masfunct12() {
    let swapnumb12 = twelftharray[0]
    twelftharray[0] = twelftharray[twelftharray.length - 1];
    twelftharray[twelftharray.length - 1] = swapnumb12;
    let outarray12 = '';
    for (let i = 0; i < twelftharray.length; i++) {
        outarray12 += twelftharray[i] + ' ';
    }
    document.querySelector('.outarray12').innerHTML = outarray12;
};document.querySelector('#arraybut12').onclick = masfunct12;


let thirteentharray = ['test', 'west', 'list', 'class', 'best'];

function masfunct13() {
    let outarray13 = '';
    for (let i = 0; i < thirteentharray.length; i++) {
        outarray13 += thirteentharray[i] + ' ' + [i] + ' ';
    }
    document.querySelector('.outarray13').innerHTML = outarray13;
};document.querySelector('#arraybut13').onclick = masfunct13;


let fourteentharray = [1, 2, 3, 'hello', 66];

function masfunct14() {
    let outarray14 = '';
    for (let i = fourteentharray.length - 1; i >= 0; i--) {
        outarray14 += fourteentharray[i] + ' ';
    }
    document.querySelector('.outarray14').innerHTML = outarray14;
};document.querySelector('#arraybut14').onclick = masfunct14;


let fifteentharray = [0, 2, 5, -4, 6, 22, -9, -12, 8, 12, 13, 78];

function masfunct15() {
    let outarray15 = '';
    for (let i = 0; i < fifteentharray.length; i++) {
        if (fifteentharray[i] > 0) {
            outarray15 += fifteentharray[i] + ' ';
        }
    }
    document.querySelector('.outarray15').innerHTML = outarray15;
};document.querySelector('#arraybut15').onclick = masfunct15;


let sixteenthassive = [0, 2, 5, -4, 6, 22, -9, -12, 8, 12, 13, 78];
let sixteenthassive_odd = [];
let sixteenthassive_even = [];

function masfunct16() {
    let outarray16Odd = '';
    let outarray16Even = '';
    for (let i = 0; i < sixteenthassive.length; i++) {
        if (sixteenthassive[i] % 2 == 0) {
            sixteenthassive_odd[sixteenthassive_odd.length] = sixteenthassive[i];
        } else {
            sixteenthassive_even[sixteenthassive_even.length] = sixteenthassive[i];
        }
    }
    for (let i = 0; i < sixteenthassive_odd.length; i++) {
        outarray16Odd += sixteenthassive_odd[i] + ' ';
    }
    for (let i = 0; i < sixteenthassive_even.length; i++) {
        outarray16Even += sixteenthassive_even[i] + ' ';
    }
    document.querySelector('.outarray16-odd').innerHTML = outarray16Odd;
    document.querySelector('.outarray16-even').innerHTML = outarray16Even;
};document.querySelector('#arraybut16').onclick = masfunct16;


let seventeentharray = [3, 0, 2, 6, 0, 1, 3, 1, 9, 0, 2, 0];

function masfunct17() {
    let count = 0;
    for (let i = 0; i < fifteentharray.length; i++) {
        if (seventeentharray[i] > 3) {
            count++;
        }
    }
    document.querySelector('.outarray17').innerHTML = count;
};document.querySelector('#arraybut17').onclick = masfunct17;


let eighteentharray = [15, 24, 13, 78, 21, 4, 45, 67];

function masfunct18() {
    let max18 = eighteentharray[0];
    for (let i = 0; i < eighteentharray.length; i++) {
        if (eighteentharray[i] > max18) {
            max18 = eighteentharray[i];
        }
    }
    document.querySelector('.outarray18').innerHTML = max18;
};document.querySelector('#arraybut18').onclick = masfunct18;


let nineteentharray = [15, 424, 313, 78, 241, 4, 45, 67];

function masfunct19() {
    let min19 = nineteentharray[0];
    for (let i = 0; i < nineteentharray.length; i++) {
        if (nineteentharray[i] < min19) {
            min19 = nineteentharray[i];
        }
    }
    document.querySelector('.outarray19').innerHTML = min19;
};document.querySelector('#arraybut19').onclick = masfunct19;


let twentietharray = [4, 5, 6, 7, 8, 9, 10];
let sumarray20 = 0; // 4
function masfunct20() {
    for (let i = 0; i < twentietharray.length; i++) {
        sumarray20 = sumarray20 + twentietharray[i];
    }
    document.querySelector('.outarray20').innerHTML = sumarray20;
};document.querySelector('#arraybut20').onclick = masfunct20;


// UNIT 11. ДОБАВЛЕНИЕ И УДАЛЕНИЕ ЭЛЕМЕНТОВ В МАССИВЕ, POP, PUSH,SPLICE

const massA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const massB = ['a', 'b', 'c', 'd', 'e', 'f'];

console.log(massA.length);
console.log(massA.push(10, 11, 12, 13, 44, 55, 66));
console.log(massA);

massB.push('j', 'g');
console.log(massB);
console.log(massB.pop()); // метод pop не имеет параметра в скобках!
console.log(massB.pop());
console.log(massB);

//удалить элемент внутри массива с помощью оператора delete
delete massA[3]; // оператор delete удаляет элемент массива и оставляет пропуск на его месте
console.log(massA);

//вырезание элементов вместе со смещением индексов производят с помощью метода "splice", а так же с его помощью можно добавить новые элементы на месте старых
massA.splice(3, 3);
console.log(massA);


function showArr(domElem, arr) {
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        out += arr[i] + ' ';
    }
    document.querySelector(domElem).innerHTML = out;
};

let spl_array1 = [33, 'best', 66, 'best'];

function funkmass1() {
    let input1 = document.querySelector('.inpmass1').value;
    array1.push(input1);
    showArr('.divarray1', array1);
}
document.querySelector('#buttarray1').onclick = funkmass1;


function showArr(domElem, arr) {
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        out += arr[i] + ' ';
    }
    document.querySelector(domElem).innerHTML = out;
}
let array2 = [33, 'best', 66, 'best'];

function funkmass2() {
    array2.pop();
    showArr('.divarray2', array2);
};document.querySelector('#buttarray2').onclick = funkmass2;


function showArr(domElem, arr) {
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        out += arr[i] + ' ';
    }
    document.querySelector(domElem).innerHTML = out;
};let array3 = [33, 'best', 66, 'best'];

function funkmass3() {
    array3.shift();
    showArr('.divarray3', array3);
};document.querySelector('#buttarray3').onclick = funkmass3;


function showArr(domElem, arr) {
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        out += arr[i] + ' ';
    }
    document.querySelector(domElem).innerHTML = out;
};let array4 = [33, 'best', 66, 'best'];

function funkmass4() {
    let input4 = document.querySelector('.inpmass4').value;
    array4.push(input4);
    showArr('.divarray4', array4);
};document.querySelector('#buttarray4').onclick = funkmass4;


function showArr(domElem, arr) {
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        out += arr[i] + ' ';
    }
    document.querySelector(domElem).innerHTML = out;
};let array5 = [33, 'best', 66, 'best'];

function funkmass5() {
    let input5 = document.querySelector('.inpmass5').value;
    array5.unshift(input5);
    showArr('.divarray5', array5);
};document.querySelector('#buttarray5').onclick = funkmass5;


function showArr(domElem, arr) {
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        out += arr[i] + ' ';
    }
    document.querySelector(domElem).innerHTML = out;
};let array6 = ['test', 5, 12];

function funkmass6() {
    let input6 = document.querySelector('.inpmass6').value;
    array6[array6.length] = input6;
    showArr('.divarray6', array6);
};document.querySelector('#buttarray6').onclick = funkmass6;


function showArr(domElem, arr) {
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        out += arr[i] + ' ';
    }
    document.querySelector(domElem).innerHTML = out;
};let array7 = ['china', 'india', 'brazil', 'japan', 'egypt'];

function funkmass7() {
    array7.length = array7.length - 1;
    showArr('.divarray7', array7);
};document.querySelector('#buttarray7').onclick = funkmass7;


function showArr(domElem, arr) {
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        out += arr[i] + ' ';
    }
    document.querySelector(domElem).innerHTML = out;
};let array8 = [2, '4', 12, 67, 'hello'];

function funkmass8() {
    let input8 = document.querySelector('.inpmass8').value;
    let newArr = [];
    for (let i = 0; i < array8.length; i++) {
        newArr[0] = input8;
        newArr[i + 1] = array8[i];
    }
    array8 = newArr;
    showArr('.divarray8', array8);
};document.querySelector('#buttarray8').onclick = funkmass8;


function showArr(domElem, arr) {
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        out += arr[i] + ' ';
    }
    document.querySelector(domElem).innerHTML = out;
};let array9 = [100, 200, 300, 400, 700, 121];

function funkmass9() {
    let emptyarray = [];
    for (let i = 1; i < array9.length; i++) {
        emptyarray.push(array9[i]);
    }
    array9 = emptyarray;
    showArr('.divarray9', array9);
};document.querySelector('#buttarray9').onclick = funkmass9;


function showArr(domElem, arr) {
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        out += arr[i] + ' ';
    }
    document.querySelector(domElem).innerHTML = out;
};let array10 = [3, 14, 15, 92, 6];

function funkmass10() {
    array10.reverse();
    showArr('.divarray10', array10);
};document.querySelector('#buttarray10').onclick = funkmass10;


let array11 = [2, 3, 4, 5, 6, 7];

function funkmass11() {
    let mass11 = '';
    let input11 = document.querySelector('.inpmass11').value;
    mass11 = array11.indexOf(parseInt(input11));
    document.querySelector('.divarray11').innerHTML = mass11;
};document.querySelector('#buttarray11').onclick = funkmass11;


let array12 = [6, 62, 60, 70, 1, 5];

function funkmass12() {
    let searchinvalue = +document.querySelector('.inpmass12').value;
    document.querySelector('.divarray12').innerHTML = -1;
    for (let i = 0; i < array12.length; i++) {
        if (array12[i] == searchinvalue) {
            document.querySelector('.divarray12').innerHTML = [i];
        }
    }
}

document.querySelector('#buttarray12').onclick = funkmass12;


let array13 = [6, 0, 22, 1, 4, 76];

function funkmass13() {
    let lastIndex = array13.length - 1
    let reversearray13 = [];
    for (let i = 0; i < array13.length; i++) {
        reversearray13[i] = array13[[lastIndex]];
        lastIndex--;
    }
    document.querySelector('.divarray13').innerHTML = reversearray13;
};document.querySelector('#buttarray13').onclick = funkmass13;


let array14 = [];

function funkmass14() {
    let counter14 = +document.querySelector('.inpmass14').value;
    for (let i = 0; i < counter14; i++) {
        array14[i] = 1;
    }
    document.querySelector('.divarray14').innerHTML = array14;
};document.querySelector('#buttarray14').onclick = funkmass14;


function showArr(domElem, arr) {
    let out = '';
    for (let i = 0; i < arr.length; i++) {
        out += arr[i] + ' ';
    }
    document.querySelector(domElem).innerHTML = out;
};let array15 = [0, 2, 5, -4, 6, 22, -9, -12, 8, 12, 13, 78];

function funkmass15() {
    let newelement15 = +document.querySelector('.inpmass15').value;
    for (let i = 0; i < array15.length; i++) {
        if (array15.indexOf(newelement15) != -1) {
            document.querySelector('.divarray15').innerHTML = array15;
        } else {
            array15.push(newelement15);
            document.querySelector('.divarray15').innerHTML = array15;
            break;
        }
    }
};document.querySelector('#buttarray15').onclick = funkmass15;


let array16 = [];
let array16_1 = [5, 6, 7, 8, 9];
let array16_2 = [23, 24, 56, 87];

function funkmass16() {
    array16 = array16_1.concat(array16_2);
    document.querySelector('.divarray16').innerHTML = array16;
};document.querySelector('#buttarray16').onclick = funkmass16;


let array17 = [];
let array17_1 = ['a', 'b', 'c', 'd'];
let array17_2 = [1, 2, 3, 4, 5];

function funkmass17() {
    for (let i = 0; i < array17_1.length; i++) {
        array17.push(array17_1[i]);
    }
    for (let i = 0; i < array17_2.length; i++) {
        array17.push(array17_2[i]);
    }
    document.querySelector('.divarray17').innerHTML = array17;
};document.querySelector('#buttarray17').onclick = funkmass17;


let array18 = ['b', 'c', '45', 'e', 'z', 'y'];

function funkmass18() {
    let mass18 = '';
    let input18 = document.querySelector('.inpmass18').value;
    mass18 = array18.includes(input18);
    document.querySelector('.divarray18').innerHTML = mass18;
};document.querySelector('#buttarray18').onclick = funkmass18;


let array19 = ['Your', 'payment', 'method', 'will', 'automatically', 'be', 'charged', 'in', 'advance', 'every']
let maxString = '';

function funkmass19() {
    for (let i = 0; i < array19.length; i++) {
        if (array19[i].length > maxString.length) {
            maxString = array19[i];
        }
    }
    document.querySelector('.divarray19').innerHTML = maxString;
}

document.querySelector('#buttarray19').onclick = funkmass19;


let array20 = [4, 5, 6, 7, 8, 9, 10];

function funkmass20() {
    let mass20 = '';
    mass20 = array20.join('');
    document.querySelector('.divarray20').innerHTML = mass20;
};document.querySelector('#buttarray20').onclick = funkmass20;


// UNIT 12. ДВУМЕРНЫЕ МАССИВЫ


// let array = [4, 5, 6];
let dualarray = [[1, 2, 3], [4, 5, 6], [7, 8, 9],];
console.log(dualarray);

// for (let i = 0; i < dualarray.length; i++) {
//     // console.log(dualarray[i]);
//     let dualarraycomplete = dualarray[i];
//     for (let k = 0; k < dualarraycomplete.length; k++) {
//         console.log(dualarraycomplete[k]);
//     }
// }


// for (let i = 0; i < dualarray.length; i++) {
//     let dualarraycomplete = dualarray[i];
//     for (let k = dualarraycomplete.length - 1; k >= 0 ; k--) {
//         console.log(dualarraycomplete[k]);
//     }
// }


let outarray0 = '';

for (let i = 0; i < dualarray.length; i++) {
    for (let k = 0; k < dualarray[i].length; k++) {
        console.log(dualarray[i][k]);
        outarray0 += dualarray[i][k] + ' ';
    }
    outarray0 += '<br>';
}
document.querySelector('.outarray').innerHTML = outarray0;


let outarrayH = ''
for (let i = 0; i < dualarray.length; i++) {
    for (let k = 0; k < dualarray[i].length; k++) {
        if (dualarray[i][k] > 4) {
            outarrayH += dualarray[i][k] + ' ';
        }
    }
    outarrayH += '<br>';
}
document.querySelector('.outarrayh').innerHTML = outarrayH;


let darray = [1, 0, 0, 0, 0];
document.querySelector('.outdualarray').innerHTML = darray;
let kcounter = 0;
document.querySelector('#butarray').onclick = () => {
    if (kcounter + 1 < 5) {
        darray[kcounter] = 0;
        darray[kcounter + 1] = 1;
        kcounter++;
    }
    document.querySelector('.outdualarray').innerHTML = darray;
};


// TASKS UNIT12

let un12Array1 = [12, [45, 87], [55, 13]];

document.querySelector('#butarray1').onclick = function () {
    const div = document.querySelector('.un12divarray1');
    div.innerHTML = un12Array1[2][0];

    return un12Array1[2][0];
}



let un12Array2 = [[12, 'hi'], [45, 87], [55, 13]];

function funcarray2() {
    document.querySelector('.un12divarray2').innerHTML = un12Array2[0][1];
    return un12Array2[0][1];
}
document.querySelector('#butarray2').onclick = funcarray2;


let un12array3 = [[1, 2, 3], [3, 4, 5], [6, [7, 'my']]];

function funcarray3() {
    document.querySelector('.un12divarray3').innerHTML = un12array3[2][1][1];
    return un12array3[2][1][1];
};document.querySelector('#butarray3').onclick = funcarray3;


let un12array4 = [[1, 2, 3], 'go', [3, 4, 5], [6, [7, 'my']]];

function funcarray4() {
    document.querySelector('.un12divarray4').innerHTML = un12array4[1][0] + un12array4[1][1];
    return un12array4[1][0] + un12array4[1][1];
};document.querySelector('#butarray4').onclick = funcarray4;


let un12array5 = [[1, 2], [3, 4], [5, 6], [21, 34], [44, 56]];

function funcarray5() {
    let outarray5 = '';
    for (let i = 0; i < array5.length; i++) {
        if (un12array5[i][0] % 2 === 0) outarray5 += un12array5[i][0] + ' ';
        if (un12array5[i][1] % 2 === 0) outarray5 += un12array5[i][1] + ' ';
    }
    document.querySelector('.un12divarray5').innerHTML = outarray5;
};document.querySelector('#butarray5').onclick = funcarray5;


let un12array6 = [[1, 2], [3, 4], [5, 6], [21, 34], [44, 56]];

function funcarray6() {
    let outarray6 = '';
    for (let i = 0; i < un12array6.length; i++) {
        if (un12array6[i][0] % 2 != 0) outarray6 += un12array6[i][0] + ' ';
        if (un12array6[i][1] % 2 != 0) outarray6 += un12array6[i][1] + ' ';
    }
    document.querySelector('.un12divarray6').innerHTML = outarray6;
};document.querySelector('#butarray6').onclick = funcarray6;


let un12array7 = [[1, 2, 3, 9], [3, 4, 7], [5, 6, 8, 32], [21, 34, 43], [44, 56]];

function funcarray7() {
    let outarray7 = '';
    for (let i = 0; i < un12array7.length; i++) {
        for (let k = 0; k < un12array7[i].length; k++) {
            if (un12array7[i][k] % 2 === 0) outarray7 += un12array7[i][k] + ' ';

        }
    }
    document.querySelector('.un12divarray7').innerHTML = outarray7;
};document.querySelector('#butarray7').onclick = funcarray7;


let un12array8 = [[1, 2, 3, 9], [3, 4, 7], [5, 6, 8, 32], [21, 34, 43], [44, 56]];

function funcarray8() {
    let outarray8 = '';
    for (let i = 0; i < un12array8.length; i++) {
        for (let k = 0; k < un12array8[i].length; k++) {
            if (un12array8[i][k] % 2 != 0) outarray8 += un12array8[i][k] + ' ';

        }
    }
    document.querySelector('.un12divarray8').innerHTML = outarray8;
};document.querySelector('#butarray8').onclick = funcarray8;


let un12array9 = [[-2, 7, -3], [3, 4, -7], [-5, 6, -8, 32], [21, -34, -43], [44, -56]];

function funcarray9() {
    let outarray9 = '';
    for (let i = 0; i < un12array9.length; i++) {
        for (let k = 0; k < un12array9[i].length; k++) {
            if (un12array9[i][k] > 0) outarray9 += un12array9[i][k] + ' ';
        }
    }
    document.querySelector('.un12divarray9').innerHTML = outarray9;
};document.querySelector('#butarray9').onclick = funcarray9;


let un12array10 = [[-2, '7', -3], [3, 4, -7], [-5, 6, -8, 32, 'a'], ['st', 21, -34, -43], [44, -56, 'task']];

function funcarray10() {
    let outarray10 = '';
    for (let i = 0; i < un12array10.length; i++) {
        for (let k = 0; k < un12array10[i].length; k++) {
            if (typeof un12array10[i][k] == 'string') outarray10 += un12array10[i][k] + ' ';
        }
    }
    document.querySelector('.un12divarray10').innerHTML = outarray10;
}
document.querySelector('#butarray10').onclick = funcarray10;


let un12array11 = [[4, 5, 6], [7, 8], [9, 10, 11, 12, 13]];

function funcarray11() {
    let outarray11 = '';
    for (let i = 0; i < un12array11.length; i++) {
        for (let k = un12array11[i].length - 1; k >= 0; k--) {
            outarray11 += un12array11[i][k] + ' ';
        }
    }
    document.querySelector('.un12divarray11').innerHTML = outarray11;
};document.querySelector('#butarray11').onclick = funcarray11;


let un12array12 = [[0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0],];

function funcarray12() {
    let outarray12 = '';
    for (let i = 0; i < un12array12.length; i++) {
        for (let k = 0; k < un12array12[i].length; k++) {
            if (un12array12[i][k] === 0) outarray12 += '&nbsp' + '&nbsp';
            if (un12array12[i][k] === 1) outarray12 += un12array12[i][k] + '&nbsp';
        }
        outarray12 += '<br>';
    }
    document.querySelector('.un12divarray12').innerHTML = outarray12;
};document.querySelector('#butarray12').onclick = funcarray12;


let un12array13 = [];

function funcarray13() {
    let Soutarray13 = 0;
    for (let i = 0; i < 8; i++) {
        let Toutarray13 = [];
        for (let k = 0; k < 8; k++) {
            Toutarray13.push(Soutarray13);
            if (Soutarray13 === 0) {
                Soutarray13 = 1
            } else {
                Soutarray13 = 0;
            }
        }
        if (Soutarray13 === 0) {
            Soutarray13 = 1;
        } else {
            Soutarray13 = 0;
        }
        un12array13.push(Toutarray13);
    }
    console.log(un12array13)
};document.querySelector('#butarray13').onclick = funcarray13;


let un12array14 = [[], [1, 0], [1, 0, 0, 0], [3, 4, 5, 6, 7, 8], [1, 2]];

function funcarray14() {
    let outarray14 = '';
    for (let i = 0; i < un12array14.length; i++) {
        outarray14 += un12array14[i].length + ' ';
    }
    document.querySelector('.un12divarray14').innerHTML = outarray14;
};document.querySelector('#butarray14').onclick = funcarray14;


let un12array15 = [[], [1, 0], [1, 0, 0, 0], [3, 4, 5, 6, 7, 8], [1, 2]];

function funcarray15() {
    let outarray15 = '';
    let maxarray = un12array15[0];
    for (let i = 0; i < un12array15.length; i++) {
        if (un12array15[i].length > maxarray.length) {
            maxarray = un12array15[i];
        }
    }
    outarray15 += maxarray.length;
    document.querySelector('.un12divarray15').innerHTML = outarray15;
};document.querySelector('#butarray15').onclick = funcarray15;


let un12array16 = [[0, 7, 0, 6], 0, 0, 8];
console.group('array16');
console.log(un12array16[3] === 8);
console.log(un12array16[0][1] === 7);
console.log(un12array16[0][3] === 6);
console.groupEnd();


let un12array17 = [[0, 0, 6], [0, 7], 0, [0, 0, 8]];
console.group('array17');
console.log(un12array17[3][2] == 8);
console.log(un12array17[1][1] == 7);
console.log(un12array17[0][2] == 6);
console.groupEnd();


let un12array18 = [3, 0, [0, 12], 0, [8]];
console.group('array18');
console.log(un12array18[0] === 3);
console.log(un12array18[4][0] === 8);
console.log(un12array18[2][1] === 12);
console.groupEnd();


let un12array19 = [[[0, 3]], [[0, 0, 8]], [0, [12]]];
console.group('array19');
console.log(un12array19[0][0][1] === 3);
console.log(un12array19[1][0][2] === 8);
console.log(un12array19[2][1][0] === 12);
console.groupEnd();


let un12array20 = [0, [0, [0, 9]], [0, 0, 18], 12,];
console.group('array20');
console.log(un12array20[1][1][1] === 9);
console.log(un12array20[2][2] === 18);
console.log(un12array20[3] === 12);
console.groupEnd();


// UNIT 13. АССОЦИАТИВНЫЙ МАССИВ (ОБЪЕКТ) В JAVASCRIPT

const asoarray = {
    'a': 5, 'b': 'hello', 'z2': 'hi', y43: 1999, // без кавычек тоже можно писать, но нельзя будет задать ключу сложное значение(пробелы и тд): "complex element" в качестве ключа без кавычек выдаст ошибку
};
asoarray.yyyy = 555;
asoarray.b = 'uuu';
delete asoarray.a; // при обращении к удаленному элементу вовзратится undefined.
console.log(asoarray);
console.log(asoarray.z2);
let kvar = 'y43';
// если мы ключ записываем в качестве переменной через let/const и тд, то его в дальнейшем нужно использовать с квадратными скобками!:
console.log(asoarray[kvar]);

// document.querySelector('.asoarrayout').innerHTML = asoarray;   / данный способ вывода ассоциативного массива не вадиден.
let asoarrayout = '';
for (let key in asoarray) {
    asoarrayout += key + ': ' + asoarray[key] + '<br> ';
}
document.querySelector('.asoarrayout').innerHTML = asoarrayout;


//1
function funkasoaray1() {
    let asoarray1 = {
        "one": 15, "two": 16, "five": 20
    };
    document.querySelector('.assoarrayout1').innerHTML = asoarray1.two;
    return asoarray1.two;
}

document.querySelector('#asoarraybutt1').onclick = funkasoaray1;


//2
function funkasoaray2() {
    let asoarray2 = {
        "one": "hello", "two": "mahai", "five": "hi"
    };
    document.querySelector('.assoarrayout2').innerHTML = asoarray2.five;
    return asoarray2.five;
}

document.querySelector('#asoarraybutt2').onclick = funkasoaray2;


//3
function funkasoaray3() {
    let asoarray3 = {
        "one": "hello", "two": "mahai", "five": "hi", "test": 21, "odd": "hi", "mix": "mix"
    };
    let asoarrayout3 = '';
    for (let key3 in asoarray3) {
        if (asoarray3[key3] == 'hi') {
            asoarrayout3 += asoarray3[key3] + ' ';
        }
    }
    document.querySelector('.assoarrayout3').innerHTML = asoarrayout3;
    return asoarrayout3;

};document.querySelector('#asoarraybutt3').onclick = funkasoaray3;


//4
function funkasoaray4() {
    let asoarray4 = {
        "one": "hello", "two": "mahai", "five": "hi", "test": 21, "odd": "hi", "mix": "mix"
    };
    let asoarrayout4 = '';
    for (let key4 in asoarray4) {
        asoarrayout4 += `${key4} ${asoarray4[key4]} <br>`;
    }
    document.querySelector('.assoarrayout4').innerHTML = asoarrayout4;
    return asoarrayout4;

};document.querySelector('#asoarraybutt4').onclick = funkasoaray4;


//5
function funkasoaraycommon(arr, block) {
    let asoarrayoutcommon = '';
    for (let keycommon in arr) {
        asoarrayoutcommon += `${keycommon} : ${arr[keycommon]} <br>`;
    }
    document.querySelector(block).innerHTML = asoarrayoutcommon;
};document.querySelector('#asoarraybutt5').onclick = () => {
    let asoarray5 = {
        "one": 1, "two": 2
    }
    funkasoaraycommon(asoarray5, '.assoarrayout5');
};


//6
document.querySelector('#asoarraybutt6').onclick = () => {
    let asoarray6 = {
        "b": 17, "e": 22
    }
    let inpasoarray61 = document.querySelector('.inpasoarray61').value;
    let inpasoarray62 = document.querySelector('.inpasoarray62').value;
    asoarray6[inpasoarray61] = inpasoarray62


    funkasoaraycommon(asoarray6, '.assoarrayout6');
};


//7
let asoarray7 = {
    "b": 17, "e": 22
};

function funkasoaray7() {
    let inpasoarray71 = document.querySelector('.inpasoarray71').value;
    for (let key7 in asoarray7) {
        if (key7 === inpasoarray71) {
            document.querySelector('.assoarrayout7').innerHTML = 1;
            break;
        } else {
            document.querySelector('.assoarrayout7').innerHTML = 0;

        }
    }
};document.querySelector('#asoarraybutt7').onclick = funkasoaray7;


//8
let asoarray8 = {
    "b": 17, "e": 22
};

function funkasoaray8() {
    let inpasoarray81 = document.querySelector('.inpasoarray81').value;
    for (let key8 in asoarray8) {
        if (key8 === inpasoarray81) {
            document.querySelector('.assoarrayout8').innerHTML = inpasoarray81;
            break;
        } else {
            document.querySelector('.assoarrayout8').innerHTML = 0;

        }
    }
};document.querySelector('#asoarraybutt8').onclick = funkasoaray8;


//8
let asoarray9 = {
    "b": 17, "e": 22, "j": 17, "k": 22, "d": 54
};

function funkasoaray9() {
    let inpasoarray91 = document.querySelector('.inpasoarray91').value;
    let containerasoarray = '';
    for (let key9 in asoarray9) {
        if (asoarray9[key9] == inpasoarray91) {
            containerasoarray += key9 + ' ';
        } else {
            containerasoarray += ' '
        }

        document.querySelector('.assoarrayout9').innerHTML = containerasoarray;
    }
};document.querySelector('#asoarraybutt9').onclick = funkasoaray9;


//10
function funkasoaray10(arr, val) {
    for (let key10 in arr) {
        if (arr[key10] == val) return true;
    }
    return false;
}

document.querySelector('#asoarraybutt10').onclick = () => {
    let asoarray10 = {
        "k": 22, "d": 54, "m": 22,
    }
    document.querySelector('.assoarrayout10').innerHTML = funkasoaray10(asoarray10, 54);
};


//11
let asoarray11 = {
    "b": 17, "e": 22, "j": 17, "k": 22, "d": 54
};

function funkasoaray11() {
    let inpasoarray11 = document.querySelector('.inpasoarray11-1').value;
    for (let key11 in asoarray11) {
        if (key11 == inpasoarray11) {
            delete asoarray11[key11];
        }
    }
    funkasoaraycommon(asoarray11, '.assoarrayout11');
};document.querySelector('#asoarraybutt11').onclick = funkasoaray11;


//12
let asoarray12 = {
    "b": 17, "e": 22, "j": 17, "k": 22, "d": 54
};

function funkasoaray12() {
    let inpasoarray12 = document.querySelector('.inpasoarray12-1').value;
    for (let key12 in asoarray12) {
        if (asoarray12[key12] == inpasoarray12) {
            delete asoarray12[key12];
        }
    }
    funkasoaraycommon(asoarray12, '.assoarrayout12');
};document.querySelector('#asoarraybutt12').onclick = funkasoaray12;


//13
let asoarray13 = {
    'prim': 'hello', 'one': 4, 'testt': 'vodoley', 'ivan': 6
};

function funkasoaray13() {
    let sumasoarray = 0;

    for (let key13 in asoarray13) {
        if (typeof asoarray13[key13] === 'string') {
            delete asoarray13[key13];
        } else {
            sumasoarray = sumasoarray + asoarray13[key13];
        }
    }
    document.querySelector('.assoarrayout13').innerHTML = sumasoarray;

};document.querySelector('#asoarraybutt13').onclick = funkasoaray13;


//14
let asoarray14 = {
    'prim': [1, 2, 23], 'one': [3, 4, 5], 'testt': [6, 7, 8], 'ivan': [9, 10]
};

function funkasoaray14() {
    let asoarraycontainer14 = '';
    for (let key14 in asoarray14) {
        for (let i = 0; i < asoarray14[key14].length; i++) {
            asoarraycontainer14 += asoarray14[key14][0] + ' ';
            break;
        }
        document.querySelector('.assoarrayout14').innerHTML = asoarraycontainer14;
    }
};document.querySelector('#asoarraybutt14').onclick = funkasoaray14;


//15
let asoarray15 = {
    'prim': [1, 2, 23], 'one': [3, 5], 'testt': [6, 7, 8], 'ivan': [9, 10]
};

function funkasoaray15() {
    let asoarraycontainer15 = '';
    for (let key15 in asoarray15) {
        for (let i = 0; i < asoarray15[key15].length; i++) {
            asoarraycontainer15 += asoarray15[key15][i] + ' ';
        }
        document.querySelector('.assoarrayout15').innerHTML = asoarraycontainer15;
    }
};document.querySelector('#asoarraybutt15').onclick = funkasoaray15;


//16
let asoarray16 = {
    "iis8sj": {
        "name": "Ivan", "age": 27,
    }, "iiss7j": {
        "name": "Petr", "age": 26,
    }, "s3s8sj": {
        "name": "Serg", "age": 47,
    },
};

function funkasoaray16() {
    let asoarraycontainer16 = '';
    for (let key16 in asoarray16) {
        asoarraycontainer16 += asoarray16[key16]['name'] + ' ';

    }
    document.querySelector('.assoarrayout16').innerHTML = asoarraycontainer16;
};document.querySelector('#asoarraybutt16').onclick = funkasoaray16;


//17
let asoarray17 = {
    "iis8sj": {
        "name": "Ivan", "age": 27,
    }, "iiss7j": {
        "name": "Petr", "age": 26,
    }, "s3s8sj": {
        "name": "Serg", "age": 47,
    },
};

function funkasoaray17() {
    let asoarraycontainer17 = '';
    for (let key17 in asoarray17) {
        if (asoarray17[key17]['age'] >= 30) {
            asoarraycontainer17 += asoarray17[key17]['name'] + ' ';
        }
    }
    document.querySelector('.assoarrayout17').innerHTML = asoarraycontainer17;
};document.querySelector('#asoarraybutt17').onclick = funkasoaray17;


let asoarray18 = {
    "red": ['Akademmistechko', 'Nyvky', 'Universytet', 'Lisova'],
    "blue": ['Minska', 'Obolon', 'Pochaina', 'Holosiivska'],
    "green": ['Syrets', 'Zoloti Vorota', 'Klovska', 'Vidubichi']
};

function funkasoaray18() {
    let inpasoarray18 = document.querySelector('.inpasoarray18').value;
    let asoarraycontainer18 = '';
    if (asoarray18[inpasoarray18] !== undefined) {
        asoarraycontainer18 = asoarray18[inpasoarray18].join(" ");
    }
    document.querySelector('.assoarrayout18').innerHTML = asoarraycontainer18;

};document.querySelector('#asoarraybutt18').onclick = funkasoaray18;


//19
let asoarray19 = {
    "red": ['Akademmistechko', 'Nyvky', 'Universytet', 'Lisova'],
    "blue": ['Minska', 'Obolon', 'Pochaina', 'Holosiivska'],
    "green": ['Syrets', 'Zoloti Vorota', 'Klovska', 'Vidubichi']
};

function funkasoaray19() {
    let inpasoarray19 = document.querySelector('.inpasoarray19').value;
    let asoarraycontainer19 = '';
    for (let key19 in asoarray19) {
        for (let i = 0; i < asoarray19[key19].length; i++) {
            if (asoarray19[key19][i].toLowerCase() == inpasoarray19 || asoarray19[key19][i] == inpasoarray19) {
                asoarraycontainer19 += key19;
            }
        }
    }
    document.querySelector('.assoarrayout19').innerHTML = asoarraycontainer19;
};document.querySelector('#asoarraybutt19').onclick = funkasoaray19;


//20
let asoarray20 = {
    "red": [['Akademmistechko', 1], ['Nyvky', 0], ['Universytet', 3], ['Lisova', 1]],
    "blue": [['Minska', 1], ['Obolon', 0], ['Pochaina', 2], ['Holosiivska', 0]],
    "green": [['Syrets', 1], ['Zoloti Vorota', 2], ['Klovska', 0], ['Vidubichi', 1]],
};

function funkasoaray20() {
    let asoarraycontainer20 = '';
    for (let key20 in asoarray20) {
        for (let i = 0; i < asoarray20[key20].length; i++) {
            if (asoarray20[key20][i][1] == 2) {
                asoarraycontainer20 += asoarray20[key20][i][0] + ' ';
            }
        }
    }

    document.querySelector('.assoarrayout20').innerHTML = asoarraycontainer20;
};


document.querySelector('#asoarraybutt20').onclick = funkasoaray20;


// UNIT 14. ПРАКТИКА ПО МАССИВАМ - ПОЛУЧАЕМ ПРОГНОЗ ПОГОДЫ ПО API

//id=703448


function apifunc() {
    let inputapitext = document.querySelector('.inputapitext').value;
    let inputapinumber = document.querySelector('.inputapinumber').value;

    if (inputapinumber == '') {
        let inputapi1 = 'q=' + inputapitext;
    } else {
        let inputapi1 = 'id=' + inputapinumber;
    }
    fetch(`http://api.openweathermap.org/data/2.5/weather?${inputapi1}&appid=70e1ed322b02acbc57d443dd91065f3e`)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            console.log(data);
            document.querySelector('.package-name').textContent = 'City: ' + data.name;
            document.querySelector('.price').innerHTML = 'Degrees&deg;: ' + Math.round(data.main.temp - 273) + '&deg;';
            document.querySelector('.disclaimer').textContent = 'Clouds: ' + data.weather[0]['description'];
            //https://openweathermap.org/img/wn/02d@2x.png  01d
            document.querySelector('.features').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
            document.querySelector('.visibility').textContent = 'Visibility: ' + data.visibility + ' m.';
            document.querySelector('.wind').textContent = 'Wind speed: ' + data.wind['speed'] + ' m/s';
        })
        .catch(function () {
            //catch any errors
        })
}

document.querySelector('#button-api').onclick = apifunc;


//sumoftwo задача


function twoSum(arr100, target100) {
    const result100 = {};
    for (let i = 0; i < arr100.length; i++) {
        result100[arr100[i]] = i;
    }
    for (let i = 0; i < arr100.length; i++) {
        const diff = target100 - arr100[i];
        if (result100[diff] && result100[diff] !== i) {
            return [i, result100[diff]]
        }
    }
    return result100;
}

console.log(twoSum([10, 20, 10, 40, 50, 60, 70], 50));


//UNIT 15. SET В JAVASCRIPT

let Aset = new Set();
Aset.add(1);
Aset.add(2);
Aset.add(3);
Aset.add('Hello');
Aset.add(1); // не добавится тк в сет добавляются только уникальные элементы
Aset.add('1'); // но в таком случае добавится
// Aset.clear() // очищает массив
//Aset.delete('Hello'); // удаляет выбранный в скобках элемент(не номер, а именно элемент)
console.log(Aset);
console.log(Aset[0]); // в сете нельзя обратиться на прямую к элементу
console.log(Aset.length); // в сете нельзя использовать метод length, вместо этого используют size;
console.log(Aset.size); // количество элементов
console.log(Aset.has(2));// выводит булевым значением наличие запрашиваемого элемента
console.log(Aset.has('2'));// false
for (let item of Aset) {
    console.log(item)
}

let forsetarray = [1, 2, 3, 1, 4, 5, 'hello', 5, 1, 3];
let newset = new Set(forsetarray);
console.log(newset);
console.log(newset.size);
let newarr = Array.from(newset);
console.log(newarr); // конвертация сета обратно в массив
console.log(newarr[2]);


//1
let set1 = new Set();
set1.add('h');
set1.add('b');
set1.add('o');
set1.add('h');
console.log(set1)
let arrayfromset1 = Array.from(set1)
document.querySelector('.outset1').innerHTML += arrayfromset1;


//2
let set2 = new Set();

function funcset2() {
    let inputset2 = document.querySelector('.inputset2').value;
    set2.add(inputset2);
    console.log(set2)
    let arrayfromset2 = Array.from(set2)
    document.querySelector('.outset2').innerHTML = arrayfromset2;
};document.querySelector('#buttset2').onclick = funcset2;


//3
let set3 = new Set(['one', 'two', 'four']);

function funcset3() {
    let inputset3 = document.querySelector('.inputset3').value;
    set3.delete(inputset3);
    console.log(set3)
    let arrayfromset3 = Array.from(set3)
    document.querySelector('.outset3').innerHTML = arrayfromset3;
};document.querySelector('#buttset3').onclick = funcset3;


//4
let set4 = new Set(['a', 'b', 'c', 'z']);

function funcset4() {
    let inputset4 = document.querySelector('.inputset4').value;
    let setcontainer4 = '';
    if (set4.has(inputset4)) {
        setcontainer4 = true;
    } else {
        setcontainer4 = false;
    }
    document.querySelector('.outset4').innerHTML = setcontainer4;
};document.querySelector('#buttset4').onclick = funcset4;


//5
let set5 = new Set(['a', 'b', 'c', 'z', 'a2', 'b2', 'c2', 'z2']);

function funcset5() {
    document.querySelector('.outset5').innerHTML = set5.size;
};document.querySelector('#buttset5').onclick = funcset5;


//6
let arrayforset6 = [1, 2, 3, 4, 5, 3, 4, 5, 2, 4, 5, 3, 24, 5, 2, 4, 56, 4, 3, 2, 335, 2, 23, 41, 3, 4, 1, 1, 4, 2, 2, 4, 5, 24, 5, 3, 22, 56];

function funcset6() {
    let set6 = new Set(arrayforset6);
    console.log(set6)
    document.querySelector('.outset6').innerHTML = set6.size;
};document.querySelector('#buttset6').onclick = funcset6;


//7

function funcset7() {
    let inputset7 = document.querySelector('.inputset7').value;
    let setcontainer7 = '';
    let set7 = new Set(inputset7);
    if (inputset7.length == set7.size && set7.size > 6) {
        setcontainer7 += 1;
    } else {
        setcontainer7 += 0;
    }
    document.querySelector('.outset7').innerHTML = setcontainer7;
};document.querySelector('#buttset7').onclick = funcset7;


//8
let set8 = new Set([1, 2, 3, 4, 5, 3, 4, 7, 9, 5, 7, 8, 9, 23, 45, 5, 2, 4, 5, 3, 24, 5, 2, 4, 56, 4, 3, 2, 335, 2, 23, 41, 3, 4, 1, 1, 4, 2, 2, 4, 5, 24, 5, 3, 22, 56]);

function funcset8() {
    let setarray8 = [];
    for (let setitem8 of set8) {
        if (setitem8 > 5) {
            setarray8.push(setitem8);
        }
    }
    console.log(setarray8)
    document.querySelector('.outset8').innerHTML = setarray8;
};document.querySelector('#buttset8').onclick = funcset8;


//9
function funcset9(our_set) {        //const funcset9 = our_set => { }
    let out9 = '';
    for (let item9 of our_set) {
        out9 += item9 + ' ';
    }
    return out9;
}

document.querySelector('#buttset9').onclick = () => {
    let set9 = new Set([9, 8, 7, 6, 5]);
    document.querySelector('.outset9').innerHTML = funcset9(set9);
};


//10
const funcset10 = (out_set, elem) => {
    let out10 = '';
    for (let item10 of out_set) {
        out10 += item10 + ' ';
    }
    document.querySelector(elem).textContent = out10;
};
document.querySelector('#buttset10').onclick = () => {
    let set10 = new Set(['4', '5', '6']);
    funcset10(set10, '.outset10');
};


//11
const funcset11 = () => {
    let set11 = new Set();
    set11.add([1]);
    set11.add([1]);
    console.log(set11);
}
document.querySelector('#buttset11').onclick = funcset11;


//12
let str12 = 'The name conjures up visions of plum pudding and Christmas punch quaint coaching inns and cozy firesides but also of orphaned and starving children';
const funcset12 = () => {
    let setarray12 = [];
    for (let i = 0; i < str12.length; i++) {
        if (str12[i] !== ' ') {
            setarray12.push(str12[i]);
        }
    }
    let set12 = new Set(setarray12);
    return set12
};
document.querySelector('#buttset12').onclick = () => {
    console.log(funcset12());
};


//13
let str13 = 'The name conjures up visions of plum pudding and Christmas punch quaint coaching inns and cozy firesides but also of orphaned and starving children';
const funcset13 = () => {
    let setarray13 = []; // setarray13 = str13.split('');
    for (let i = 0; i < str13.length; i++) {
        setarray13.push(str13[i]);

    }
    let set13 = new Set(setarray13);

    let container13 = {};
    for (let item13 of set13) {
        let counter = 0;
        for (let i = 0; i < setarray13.length; i++) {
            if (setarray13[i] === item13) {
                counter++;
            }
        }
        container13[item13] = counter;

    }
    return container13;
}

document.querySelector('#buttset13').onclick = () => {
    console.log(funcset13());
}


//UNIT 16. ПЕРЕБОР МАССИВОВ: FOR, FOR IN, FOR OF

let forarray = [4, 7, 9];
let newelems = document.getElementsByClassName('.newelem');
let newelemsq = document.querySelectorAll('.newelem')
// console.log(forarray);
// console.log(newelems);
// console.log(newelemsq);
// 1 способ======================================
// for (let i =0; i < forarray.length; i++){
//     console.log(forinarray[i]);
// };

// для newelems
// for (let i = 0; i < newelems.length; i++){
//     console.log(newelems[i]);
// };

// для newelemsq
// for (let i = 0; i < newelemsq.length; i++){
//     console.log(newelemsq[i]);
// };


// 2 способ=============================
// for (let key in forarray){
//     console.log(forarray[key]);
// };

// для newelems(не подходит!!!)
// for (let key in newelems){
//     console.log(newelems[key]);
// };

// для newelemsq(не подходит!!!)
// for (let key in newelemsq){
//     console.log(newelemsq[key]);
// };


// 3 способ  !!!=======================
// for (let item of forarray){
//     console.log(item);
// }

// для newelems
// for (let item of newelems){
//     console.log(item);
// }

// для newelemsq
// for (let item of newelemsq){
//     console.log(item);
// }


//tasks:

//T1
//При нажатии buttfor1 выполняете функцию funcfor1. Функция перебирает массив arrayfor1 = [5, 7, 9, 11, 13, 15]; c помощью цикла for (let i. Выведите на страницу в out-1 формате значение+пробел.

let arrayfor1 = [5, 7, 9, 11, 13, 15];

function funcfor1() {
    let outfor1 = '';
    for (let i = 0; i < arrayfor1.length; i++) {
        outfor1 += arrayfor1[i] + ' ';
    }
    document.querySelector('.outfor1').innerHTML = outfor1;
};document.querySelector('#buttfor1').onclick = funcfor1;


//T2
//При нажатии buttfor2 выполняете функцию funcfor2. Функция перебирает массив arrayfor2 = [5, 7, 9, 11, 13, 15]; c помощью цикла for (let i. Выведите на страницу в .out-2 формате индекс+: пробел+значение+пробел.

let arrayfor2 = [5, 7, 9, 11, 13, 15];

function funcfor2() {
    let outfor2 = '';
    for (let i = 0; i < arrayfor2.length; i++) {
        outfor2 += [i] + ': ' + arrayfor2[i] + ' ' + '<br>';
    }
    document.querySelector('.outfor2').innerHTML = outfor2;
};document.querySelector('#buttfor2').onclick = funcfor2;


//T3
// При нажатии buttfor3 выполняете функцию funcfor3. Функция получает div.buttfor3 со страницы с помощью getElementsByClassName и в каждый записывает число 3, перезаписывая содержимое div
function funcfor3() {
    let outfor3 = document.getElementsByClassName('outfor3');
    for (let i = 0; i < outfor3.length; i++) {
        outfor3[i].innerHTML = 3;
    }
};document.querySelector('#buttfor3').addEventListener('click', funcfor3);


//T4
//При нажатии buttfor4 выполняете функцию funcfor4. Функция получает div.buttfor4 со страницы с помощью querySelectorAll и в каждый дописывает число 4.
function funcfor4() {
    let outfor4 = document.querySelectorAll('.outfor4');
    for (let i = 0; i < outfor4.length; i++) {
        outfor4[i].innerHTML = 4;
    }
};document.querySelector('#buttfor4').addEventListener('click', funcfor4);


//T5
//При нажатии buttfor5 выполняете функцию funcfor5. Функция должна с помощью for of перебрать массив array5 = [3,4,5,2,1,7,8,2,4,6,8,11,23,17]; и возвратить новый массив куда входят элементы из array5 большие 7.
let arrayfor5 = [3, 4, 5, 2, 1, 7, 8, 2, 4, 6, 8, 11, 23, 17];

function funcfor5() {
    let newarray5 = [];
    for (let item5 of arrayfor5) {
        if (item5 > 7) {
            newarray5.push(item5);
        }
    }
    return newarray5;
};document.querySelector('#buttfor5').addEventListener('click', () => {
    document.querySelector('.outfor5').innerHTML = funcfor5();
});


//T6
//При нажатии buttfor6 выполняете функцию funcfor6. Функция должна превратить массив arrayfor6 = [[1,2], [3,4], [5,6]]; в одномерный. Результат вывести в out-6 через пробел.
let arrayfor6 = [[1, 2], [3, 4], [5, 6]];

function funcfor6() {
    let newarray6 = [];
    for (let i = 0; i < arrayfor6.length; i++) {
        for (let j = 0; j < arrayfor6[i].length; j++) {
            newarray6 += arrayfor6[i][j] + ' ';
        }
    }
    document.querySelector('.outfor6').innerHTML = newarray6;
};document.querySelector('#buttfor6').addEventListener('click', funcfor6);


//T7
//При нажатии buttfor7 выполняете функцию funcfor7. Функция должна переиндексировать массив arrayfor7 = [{ id : 23, name: 'Ivan'}, {id: 45, name : 'Petr'}];. Что имеется ввиду. Сейчас у нас обычный массив,
//который содержит вложенные объекты. Вам необходимо сделать из arrayfor7 объект, где ключи - значения id из вложенных массивов, а значения - имя (т.е { 23 : Ivan, 45 : Petr}.
//Функция должна возвращать результирующий массив.
let arrayfor7 = [{id: 23, name: 'Ivan'}, {id: 45, name: 'Petr'}];

function funcfor7() {
    let newarray7 = {};
    for (let item7 of arrayfor7) {
        newarray7[item7.id] = item7.name;
    }
    return newarray7;
};document.querySelector('#buttfor7').addEventListener('click', () => {
    console.log(funcfor7());
});


//T8
// При нажатии buttfor8 выполняете функцию funcfor8. Функция должна переиндексировать массив arrayfor8 = [ { id : 23, name: 'Ivan'}, {id: 45, name : 'Petr'}];. Что имеется ввиду. Сейчас у нас обычный массив,
// который содержит вложенные объекты. Вам необходимо сделать из arrayfor8 массив, который будет содержать только числовые id. Т.е. [23, 45]. Функция должна возвращать результирующий массив.
let arrayfor8 = [{id: 23, name: 'Ivan'}, {id: 45, name: 'Petr'}];

function funcfor8() {
    let newarray8 = [];
    for (let item8 in arrayfor8) {
        for (let secitem8 in arrayfor8[item8]) if (typeof arrayfor8[item8][secitem8] == 'number') {
            newarray8.push(arrayfor8[item8][secitem8]);
        }
    }
    return newarray8;
}

document.querySelector('#buttfor8').addEventListener('click', () => {
    console.log(funcfor8());
});


//T9
//При нажатии buttfor9 выполняете функцию funcfor9. Функция должна возвращать в out-9 самый большой индекс из вложенных в arrayfor9 = [ [4,3,2], [2,5], [0,0,0,0,0]]; массивов.
//В данном случае это 4. Т.е. самый большой вложенный массив это [0,0,0,0,0], а в нем самый большой индекс 4.
let arrayfor9 = [[4, 3, 2], [2, 5], [0, 0, 0, 0, 0]];
//(лучший способ решения)
// function funcfor9() {
//     let maxindex9 = '';
//     for (let i = 0; i < arrayfor9.length; i++){
//         if (arrayfor9[0].length < arrayfor9[i].length) {
//             maxindex9 = arrayfor9[i].length - 1;
//         }
//     }
//     return  maxindex9;
// };
// document.querySelector('#buttfor9').addEventListener('click', ()=>{
//     document.querySelector('.outfor9').innerHTML = funcfor9();
// });
//(решение требующееся для данного урока)
function funcfor9() {
    let maxindex9 = '';
    for (let key9 in arrayfor9) {
        for (let i = 0; i < arrayfor9.length; i++) {
            if (arrayfor9[i].length > arrayfor9[key9].length) {
                maxindex9 = arrayfor9[i].length - 1;
            }
        }
        return maxindex9;
    }
};document.querySelector('#buttfor9').addEventListener('click', () => {
    document.querySelector('.outfor9').innerHTML = funcfor9();
});


//T10
//При нажатии buttfor10 выполняете функцию funcfor10. Функция должна преобразовывать массив arrayfor10 в ассоциативный массив вида {4: 4, 6: 6, 9: 9, hello : "hello"} и возвращать полученный массив.
let arrayfor10 = [4, 6, 9, 'Hello'];

function funcfor10() {
    let newarrayfor10 = {};
    for (let item10 of arrayfor10) {
        newarrayfor10[item10] = item10;
    }
    return newarrayfor10;
}

document.querySelector('#buttfor10').addEventListener('click', () => {
    console.log(funcfor10());
});


//Т11
//При нажатии buttfor11 выполняете функцию funcfor11. Функция должна c помощью for in перебрать объект arrayfor11 и вывести в out-11 только те значения, которые больше 10. Вывод - через пробел.
let arrayfor11 = {
    one: 11, two: 7, three: 13, four: 0
}

function funcfor11() {
    let conteinerfor11 = '';
    for (let key11 in arrayfor11) {
        if (arrayfor11[key11] > 10) conteinerfor11 += arrayfor11[key11] + ' ';
    }
    document.querySelector('.outfor11').innerHTML = conteinerfor11;
};document.querySelector('#buttfor11').addEventListener('click', funcfor11);


//T12
//При нажатии buttfor12 выполняете функцию funcfor12. Функция должна c помощью for of перебрать arrayfor12 и вывести в out-12 через пробел.
let arrayfor12 = [4, 5, 6, 7];

function funcfor12() {
    let conteinerfor12 = '';
    for (let item12 of arrayfor12) {
        conteinerfor12 += item12 + ' ';
    }
    document.querySelector('.outfor12').innerHTML = conteinerfor12;

};document.querySelector('#buttfor12').addEventListener('click', funcfor12);


//T13
//При нажатии buttfor13 выполняете функцию funcfor13. Функция должна c помощью for of перебрать arrayfor13 = 'testone' и вывести по символу в out-13 через пробел.
let stringfor13 = 'testone';

function funcfor13() {
    let conteinerfor13 = '';
    for (let item13 of stringfor13) {
        conteinerfor13 += item13 + ' ';
    }
    document.querySelector('.outfor13').innerHTML = conteinerfor13;
};document.querySelector('#buttfor13').addEventListener('click', funcfor13);


//T14
//При нажатии buttfor14 выполняете функцию funcfor14. Функция должна c помощью for of перебрать arrayfor14 и вывести по элементам в out-14 через пробел.
let setfor14 = new Set([4, 5, 6]);

function funcfor14() {
    let conteinerfor14 = '';
    for (let item14 of setfor14) {
        conteinerfor14 += item14 + ' ';
    }
    document.querySelector('.outfor14').innerHTML = conteinerfor14;
};document.querySelector('#buttfor14').addEventListener('click', funcfor14);


//T15
//При нажатии buttfor15 выполняете функцию funcfor15. Функция должна получить NodeList элементов out-15 c помощью document.querySelectorAll,
//затем c помощью for of перебрать полученную коллекцию элементов .out-15 записать внутрь них число 15 (затерев содержимое).
function funcfor15() {
    let conteinerforclasses15 = document.querySelectorAll('.outfor15');
    let containerfor15 = '';
    for (let item15 of conteinerforclasses15) {
        item15.innerHTML = 15;
    }
    console.log(conteinerforclasses15)
};document.querySelector('#buttfor15').addEventListener('click', funcfor15);


//UNIT 17. МЕТОДЫ МАССИВОВ: MAP, FILTER ( ЧАСТЬ 1)
let maparraya = [6, 7, 14, 300, 3, 0, -14];
let maparrayb = maparraya.map(function (item, index) {
    // console.log(item);
    // console.log(index);
    return item * 5; //(7)[30, 35, 70, 1500, 20, 0, -70]
});
console.log(maparrayb)


//let maparrayb = maparraya.map(item => item * 5)     сокращенный вид через стрелочную функцию


let maparrayc = maparraya.filter(function (item, index) {
    if (item % 2 == 0 && item > 0) {  //(3)[6, 14, 300]
        return true;
    }
});
console.log(maparrayc)


//UNIT 17. МЕТОДЫ МАССИВОВ: MAP, FILTER ( ЧАСТЬ 1)

//T1
//Дан массив array1 = [4, 5, 6, 7, 12, 34, 56, 78, 90, 11] - с помощью map переберите массив и создайте новый массив array1_res куда добавьте элементы данного массива умноженные на 2. Возвратите массив array1_res.
let arraymap1 = [4, 5, 6, 7, 12, 34, 56, 78, 90, 11];
let array1_res = [];

function funcmap1() {
    array1_res = arraymap1.map(function (item1,) {
        return item1 * 2;
    })
    console.log(array1_res);
    document.querySelector('.outmap1').innerHTML = array1_res;
};document.querySelector('#buttmap1').addEventListener('click', funcmap1);


//T2
//Дан массив array2 = [2,3,4,5,10,11,12] - с помощью map переберите массив и создайте массив array2_res куда добавьте элементы данного массива возведенные во вторую степень. Возвратите массив array2_res. Действия должны запускаться при вызове функции funcmap2.
let arraymap2 = [2, 3, 4, 5, 10, 11, 12];
let array2_res = [];

function funcmap2() {
    array2_res = arraymap2.map(function (item2,) {
        return item2 ** 2;
    })

};document.querySelector('#buttmap2').onclick = () => {
    console.log(funcmap2());
    document.querySelector('.outmap2').innerHTML = array2_res;
};


//T3
//Дан массив arrayfilter3 = [4,"3",6,7,"12",34,"56",78,90,11] - с помощью map переберите массив и создайте массив array3_res куда добавьте все элементы приведенные к числу. Возвратите array3_res. Действия должны запускаться при вызове функции funcfilter3.
let arrayfilter3 = [4, "3", 6, 7, "12", 34, "56", 78, 90, 11];
let array3_res = [];

function funcfilter3() {
    array3_res = arrayfilter3.map(function (item3, index) {
        return Number(item3);
    })
}

document.querySelector('#buttmap3').onclick = () => {
    console.log(funcfilter3());
    console.log(array3_res);
    document.querySelector('.outmap3').innerHTML = array3_res;
};


//T4
//Следующая задача проще будет решаться через метод forEach, который мы изучим во второй части урока! Сейчас мы делаем костыль, для отработки навыков работы с map. Дан массив arraymap4 = [4,"3",6,7,"12",34,"56",78,90,11] - с помощью map переберите массив и создайте массив array4_res куда добавьте ТОЛЬКО числа из массива a4. Возвратите array4_res. Действия должны запускаться при вызове функции funcfilter4.
let arraymap4 = [4, "3", 6, 7, "12", 34, "56", 78, 90, 11];
let array4_res = [];

function funcmap4() {
    array4_res = arraymap4.map(function (item4, index) {
        if (typeof item4 == 'number') {
            return item4;
        }
    })
};document.querySelector('#buttmap4').onclick = () => {
    console.log(funcmap4());
    console.log(array4_res);
};


//T5
//Дан массив arrayfilter1 = [3, 14, 15, 92]. C помощью filter переберите массив и создайте arrayfilter1_res, который содержит только четные числа из arrayfilter1. Возвратите arrayfilter1_res. Действия должны запускаться при вызове функции funcfilter5.
let arrayfilter5 = [3, 14, 15, 92];
let arrayfilter5_res = [];

function funcfilter5() {
    arrayfilter5_res = arrayfilter5.filter(function (item5, index) {
        if (item5 % 2 == 0) {
            return item5
        }
    })
}

document.querySelector('#buttmap5').onclick = () => {
    console.log(funcfilter5());
    console.log(arrayfilter5_res);
    document.querySelector('.outmap5').innerHTML = arrayfilter5_res;
};


//T6
//
let arrayfilter6 = [3, 14, 15, 92, "6", "5", "hello", 32];
let arrayfilter6_res = [];

function funcfilter6() {
    arrayfilter6_res = arrayfilter6.filter(function (item6, index) {
        if (typeof item6 == 'number') {
            return item6;
        }
    })
};document.querySelector('#buttmap6').onclick = () => {
    console.log(funcfilter6());
    console.log(arrayfilter6_res);
    document.querySelector('.outmap6').innerHTML = arrayfilter6_res;
};


//T7
//Дан массив arrayfilter7 = ["php-7", "html", "css", 92, "6", "5", "hello", 32]. C помощью filter переберите массив arrayfilter7 и создайте  arrayfilter7_res, который содержит только строки из arrayfilter7,
// длина которых больше 3. Возвратите arrayfilter7_res. Действия должны запускаться при вызове функции funcfilter7.
let arrayfilter7 = ["php-7", "html", "css", 92, "6", "5", "hello", 32];
let arrayfilter7_res = [];

function funcfilter7() {
    arrayfilter7_res = arrayfilter7.filter(function (item7, index) {
        if (item7.length > 3) {
            return true;
        }
    })
};document.querySelector('#buttmap7').onclick = () => {
    console.log(funcfilter7());
    console.log(arrayfilter7_res);
    document.querySelector('.outmap7').innerHTML = arrayfilter7_res;
};


//8
//Дан массив arrayfilter8 = [3, 14, 15, 92, "6", "5", "hello", 32]. С помощью filter, переберите массив arrayfilter8 и создайте массив arrayfilter8_res, который содержит индексы четных элементов. Возвратите arrayfilter8_res. Действия должны запускаться при вызове функции funcfilter8.
let arrayfilter8 = [3, 14, 15, 92, "6", "5", "hello", 32];
let arrayfilter8_res = [];

function funcfilter8() {
    arrayfilter8.filter(function (item8, index8) {
        if (Number.isInteger(item8) && item8 % 2 === 0) {
            arrayfilter8_res.push(index8);
        }
    })
};document.querySelector('#buttmap8').onclick = () => {
    console.log(funcfilter8());
    console.log(arrayfilter8_res);
    document.querySelector('.outmap8').innerHTML = arrayfilter8_res;
};


//T9
//Дан массив arrayfilter9 = [3, "hello", 4, "world", 5, "hi"]. С помощью filter, переберите массив arrayfilter9 и создайте массив arrayfilter9_num и arrayfilter9_string, которые содержат первый -
//числа из arrayfilter9, второй - строки. Задачу решите с помощью filter. Действия должны запускаться при вызове функции funcfilter9.
let arrayfilter9 = [3, 14, 15, 92, "6", "5", "hello", 32];
let arrayfilter9_string = [];
let arrayfilter9_num = [];

function funcfilter9() {
    arrayfilter9_string = arrayfilter9.filter(function (item9s, index9s) {
        if (typeof item9s == 'string') {
            return true;
        }
    })
    arrayfilter9_num = arrayfilter9.filter(function (item9n, index9n) {
        if (typeof item9n == 'number') {
            return true;
        }
    })
};document.querySelector('#buttmap9').onclick = () => {
    console.log(funcfilter9());
    console.log(arrayfilter9_num);
    console.log(arrayfilter9_string);
    document.querySelector('.outmap91').innerHTML += arrayfilter9_num;
    document.querySelector('.outmap92').innerHTML += arrayfilter9_string;
};


//T10
//Дан массив arrayfilter10 = [ [1,2,3], [3,4,6], [4,5,7], [8,9,3]]. С помощью filter переберите массив и создайте arrayfilter10_res, в который входят вложенные массивы содержащие цифру 3.  Возвратите arrayfilter10_res. Действия должны запускаться при вызове функции funcfilter10.
let arrayfilter10 = [[1, 2, 3], [3, 4, 6], [4, 5, 7], [8, 9, 3]];
let arrayfilter10_res = [];

function funcfilter10() {
    arrayfilter10_res = arrayfilter10.filter(function (item10, index10) {
        for (let i = 0; i < item10.length; i++) {
            if (item10[i] == 3) {
                return true;
            }
        }
    })
};document.querySelector('#buttmap10').onclick = () => {
    console.log(funcfilter10());
    console.log(arrayfilter10_res);
    document.querySelector('.outmap10').innerHTML = arrayfilter10_res;
}


//UNIT 18. МЕТОДЫ МАССИВОВ: JOIN, SPLIT, FOREACH ( ЧАСТЬ 2)

//метод split создает массив из строки: str.split([separator[, limit]])
let splitstring = 'hello,hi,mahai';
console.log(splitstring.split(','));

//метод join создает строку из массива: arr.join([separator])
let joinarray = [1, 2, 3];
console.log(joinarray.join('.-'));


//forEach не изменяет изначальный массив!!!!(не калечащий метод)

let foreacharray = [7, 8, 9];
foreacharray.forEach(function (elem, index) {
    console.log(index);
    console.log(elem * 2);
    console.log('--')
})


//T1
//Дан массив arrayforeach1 = [4,5,6,7,12,34,56,78,90,11] - с помощью forEach переберите массив и создайте новый массив arrayforeach1_res куда добавьте элементы данного массива умноженные на 2.
//Действия должны запускаться при вызове функции funcforeach1.
let arrayforeach1 = [4, 5, 6, 7, 12, 34, 56, 78, 90, 11];
let arrayforeach1_res = [];

function funcforeach1() {
    arrayforeach1.forEach(function (elem1, index1) {
        arrayforeach1_res.push(elem1 * 2);
    })
    console.log(arrayforeach1_res);
    document.querySelector('.outforeach1').innerHTML = arrayforeach1_res;
};document.querySelector('#buttforeach1').onclick = funcforeach1;


//T2
//Дан массив arrayforeach2 = [2,3,4,5,10,11,12] - с помощью forEach переберите массив и создайте новый массив arrayforeach2_res куда добавьте элементы данного массива деленные на 2.
//Действия должны запускаться при вызове функции funcforeach2.
let arrayforeach2 = [2, 3, 4, 5, 10, 11, 12];
let arrayforeach2_res = [];

function funcforeach2() {
    arrayforeach2.forEach(function (elem2, index2) {
        arrayforeach2_res.push(elem2 / 2)
    })
    console.log(arrayforeach2_res);
    document.querySelector('.outforeach2').innerHTML = arrayforeach2_res;
};document.querySelector('#buttforeach2').onclick = funcforeach2;


//T3
//Дан массив arrayforeach3 = [2, "hello", 3, "hi", 4, "Mazai"] - с помощью forEach переберите массив и создайте новый массив arrayforeach3_res куда добавьте элементы данного массива являющиеся числом.
//Запускаться решение должно при вызове функции funcforeach3.
let arrayforeach3 = [2, "hello", 3, "hi", 4, "Mazai"];
let arrayforeach3_res = [];

function funcforeach3() {
    arrayforeach3.forEach(function (elem3, index3) {
        if (typeof elem3 == 'number') {
            arrayforeach3_res.push(elem3)
        }
        ;
    })
    console.log(arrayforeach3_res);
    document.querySelector('.outforeach3').innerHTML = arrayforeach3_res;
};document.querySelector('#buttforeach3').onclick = funcforeach3;


//T4
//На странице созданы 3 span.taskforeach-4 c атрибутом data. С помощью forEach переберите их и добавьте атрибуты в массив arrayforeach4_res. Запускаться решение должно при вызове функции funcforeach4.
let arrayforeach4_res = [];
let elemspan4 = document.querySelectorAll('.taskforeach-4');

function funcforeach4() {
    elemspan4.forEach(function (elem4, index4) {
        let atrib = elem4.getAttribute('data-taskforeach4');
        arrayforeach4_res.push(atrib);
    })
    console.log(arrayforeach4_res);
    document.querySelector('.outforeach4').innerHTML = arrayforeach4_res;
};document.querySelector('#buttforeach4').onclick = funcforeach4;


//T5
//На странице созданы 3 p.task-5 c атрибутом data. С помощью forEach переберите их и добавьте событие клик.
//Напишите функцию funcforeach5, которая будет запускаться при клике и добавлять атрибут data элемента, по которому кликнули в массив arrayforeach5_res.
let arrayforeach5_res = [];

function funcforeach5() {
    arrayforeach5_res.push(this.getAttribute('data-taskforeach5'))
    console.log(arrayforeach5_res);
};document.querySelectorAll('.taskforeach-5').forEach((elem5) => {
    elem5.onclick = funcforeach5;
})

//T6
//Дана строка str6="helloworld" - преобразуйте ее в массив и присвойте arraysplit6_res. Выведите на страницу. Запускаться решение должно при вызове функции funcforeach6.
let str6 = "helloworld";
let arraysplit6_res = [];

function funcforeach6() {
    arraysplit6_res = str6.split('');
    console.log(arraysplit6_res);
    document.querySelector('.outforeach6').innerHTML = arraysplit6_res;
};document.querySelector('#buttforeach6').onclick = funcforeach6;

//T7
//Дана строка str7="hello world hi mazai" - преобразуйте ее в массив и разбейте по словам. Причем слова не должны содержать пробелов и присвойте arraysplit7_res.
//Выведите на страницу. Запускаться решение должно при вызове функции funcforeach7.
let str7 = "hello world hi mazai";
let arraysplit7_res = [];

function funcforeach7() {
    arraysplit7_res = str7.split(' ');
    console.log(arraysplit7_res);
    document.querySelector('.outforeach7').innerHTML = arraysplit7_res;
};document.querySelector('#buttforeach7').onclick = funcforeach7;


//T8
//Дан массив arrayjoin8 = [1,2,66,77,15] - преобразуйте ее в строку. Разделитель - дефис. Результат присвойте arrayjoin8_res. Запускаться решение должно при вызове функции funcforeach8.
let arrayjoin8 = [1, 2, 66, 77, 15];
let arrayjoin8_res = [];

function funcforeach8() {
    arrayjoin8_res = arrayjoin8.join('-');
    console.log(arrayjoin8_res);
    document.querySelector('.outforeach8').innerHTML = arrayjoin8_res;
}

document.querySelector('#buttforeach8').onclick = funcforeach8;


//T9
//Дан массив arrayjoin9 = [[hi, mahai], [test, best]] - преобразуйте его в строку. Разделитель - дефис. Результат присвойте arrayjoin9_res. Запускаться решение должно при вызове функции funcforeach9.
//Допускается лишний дефис в конце строки!!!
let arrayjoin9 = [['hi', 'mahai'], ['test', 'best']];
let arrayjoin9_res = [];

function funcforeach9() {
    for (let i = 0; i < arrayjoin9.length; i++) {
        arrayjoin9_res += arrayjoin9[i].join('-') + '-';
    }
    console.log(arrayjoin9_res);
    document.querySelector('.outforeach9').innerHTML = arrayjoin9_res;
};document.querySelector('#buttforeach9').onclick = funcforeach9;


//T10
//Дан массив arrayforeach10 = {name: ivan, age: 15, sex: 1, id: 45} - преобразуйте его в GET строку (GET параметры). Найдите описание, что такое GET строка самостоятельно.
//Разделитель - амперсанд. Результат присвойте arrayforeach10_res. Запускаться решение должно при вызове функции funcforeach10. Допускается лишний амперсанд в конце строки!!!

// let arrayforeach10 = {name: 'ivan', age: 15, sex: 1, id: 45};
// let arrayforeach10_res = '';
// function funcforeach10 () {
//     let arrayforeach10_res = new URLSearchParams(arrayforeach10);
//
//     console.log( arrayforeach10_res.toString() )
//     document.querySelector('.outforeach10').innerHTML = arrayforeach10_res.toString();
//
// };
// document.querySelector('#buttforeach10').onclick = funcforeach10;


//решение "влоб"
let result = [];
let arrayforeach10 = {name: 'ivan', age: 15, sex: 1, id: 45};
let arrayforeach10_res = '';
// function funcforeach10 () {
//     for (let key10 in arrayforeach10) {
//         arrayforeach10_res += key10 + '=' + arrayforeach10[key10] + '&';
//     }
//     console.log(encodeURI(arrayforeach10_res));
//     document.querySelector('.outforeach10').innerHTML = arrayforeach10_res;
//
// };
// document.querySelector('#buttforeach10').onclick = funcforeach10;


function funcforeach10() {
    for (let key10 in arrayforeach10) {
        result.push(key10 + '=' + arrayforeach10[key10]);
    }
    arrayforeach10_res = result.join('&');
    document.querySelector('.outforeach10').innerHTML = arrayforeach10_res
}

document.querySelector('#buttforeach10').onclick = funcforeach10;


//UNIT 19. СОБЫТИЯ МЫШИ В JAVASCRIPT


document.querySelector('.blockone').onclick = function (event) {
    console.log(event);
    console.log('click');
}


document.querySelector('.blocktwo').onclick = () => {
    console.log('click');
}
document.querySelector('.blocktwo').ondblclick = () => {
    console.log('double click');
}
document.querySelector('.blocktwo').oncontextmenu = () => {
    console.log('right button');
    return false
}


let width = 75;
document.querySelector('.blockthree').onclick = () => {
    document.querySelector('.blockthree').style.width = width + 'px';
    width = width - 10;
}
document.querySelector('.blockthree').onmousemove = () => {
    console.log('mouse moving...');
    document.querySelector('.blockthree').style.width = width + 'px';
    width++;
}

document.querySelector('.blockthree').onmouseenter = () => {
    console.log('mouse entered');
    document.querySelector('.blockthree').style.background = 'red';
}

document.querySelector('.blockthree').onmouseleave = () => {
    console.log('mouse leaved');
    document.querySelector('.blockthree').style.background = '';
}

document.querySelector('.blockthree').onmousedown = () => {
    console.log('mouse downed');
    document.querySelector('.blockthree').style.background = 'yellow';
}
document.querySelector('.blockthree').onmouseup = () => {
    console.log('mouse upped');
    document.querySelector('.blockthree').style.background = 'blue';
}


let progressbar = 10;
document.querySelector('#buttprogress').onclick = () => {
    progressbar++;
    document.querySelector('#progressbar').value = progressbar;
}


//T1
//Добавьте на блок .blockevent1 событие клик и по клику запуск функции funcevent1. Функция должна возвращать и выводить
//на экран содержимое блока (только текст). Вывод осуществляется в out-1.
function funcevent1() {
    let text = document.querySelector('.event1').textContent;
    document.querySelector('.outevent1').textContent = text;
    return text;
};document.querySelector('.event1').onclick = (event) => {
    funcevent1();
};


//T2
//Добавьте на блок .blockevent2 событие клик и по клику запуск функции funcevent2. Функция должна возвращать true или false в зависимости от того,
//нажата ли клавиша alt или нет в момент клика. Также, выводите на экран результат. Вывод осуществляется в out-2.
function funcevent2(event) {
    document.querySelector('.outevent2').innerHTML = event.altKey;
    return event.altKey;
};document.querySelector('.event2').onclick = funcevent2;


//T3
//Добавьте на блок .blockevent3 событие клик. При клике - увеличивайте ширину блока на 5px. Каждый клик - увеличение ширины на 5px. 10 кликов - на 50px. Ширину выводите в out-3.
let width3 = 75;
document.querySelector('.outevent3').innerHTML = width3;
document.querySelector('.event3').onclick = () => {
    document.querySelector('.event3').style.width = width3 + 'px';
    width3 = width3 + 5;
    document.querySelector('.outevent3').innerHTML = width3;
};


//T4
//Добавьте на блок .blockevent4 событие двойной клик и по двойному клику запуск функции funcevent4. Функция должна возвращать и выводить на экран содержимое блока (только текст). Вывод осуществляется в out-4.
let text4 = document.querySelector('.event4').textContent;

function funcevent4() {
    document.querySelector('.outevent4').textContent = text4;
    return text4;
};document.querySelector('.event4').ondblclick = () => {
    funcevent4();
};


//T5
//Дан блок .event5.active. Добавьте на него событие двойной клик, по которому удаляется класс active если он есть и добавляется если такого класса нет.
document.querySelector('.event5').ondblclick = () => {
    //document.querySelector('.event5').classList.toggle('active');   //второй более короткий вариант
    let eventelement5 = document.querySelector('.event5')

    if (eventelement5.classList.contains('active')) {
        eventelement5.classList.remove('active');
    } else {
        eventelement5.classList.add('active');
    }
};


//T6
//Дан блок .event6 и список .ulevent6. При двойном клике на блоке скрывайте .ulevent6 если он показан и
//показывайте если скрыт. Скрытие и показ делайте через добавление - удаление класса .hideevent6.
document.querySelector('.event6').ondblclick = () => {
    document.querySelector('.ulevent6').classList.toggle('hideevent6');
};


//T7
//Дан блок .div-7. При клике правой кнопкой мыши на блоке добавляйте ему класс .active. При повторном клике - удаляйте.
document.querySelector('.event7').oncontextmenu = () => {
    document.querySelector('.event7').classList.toggle('active');
    return false;
};


//T8
//Дано . ckboxevent8. Повесьте на него событие onchange при котором на документе отключается клик правой кнопкой мыши если checkbox выбран и отключает если не выбран.
let checkboxevent8 = document.querySelector('.checkboxevent8');
document.querySelector('.checkboxevent8').onchange = () => {
    if (checkboxevent8.checked) {
        document.oncontextmenu = function () {
            return false;
        }
    } else {
        document.oncontextmenu = null;
    }
};

//T9
//Дан блок .outevent9. Внутри блока - изображение 1.png. При клике правой кнопкой мыши - меняйте изображение на 2.png. Надеюсь вы догадаетесь изменить только src изображения?
function funcevent9() {
    document.querySelector('.event9 img').setAttribute('src', './JSImages/jojo2.png');
}

document.querySelector('.event9').oncontextmenu = funcevent9;


//T10
//Дан блок .event10. Внутри блока - изображение 1.png. При наведении мыши (mouseenter) - меняйте изображение на 2.png.
function funcevent10() {
    document.querySelector('.event10 img').setAttribute('src', './JSImages/jojo2.png');
}

document.querySelector('.event10').onmouseenter = funcevent10;


//T11
//Дан блок .event11. Внутри блока - изображение 1.png. При наведении мыши (mouseenter) - меняйте изображение на 2.png. При уведении мыши - mouseleave - возвращайте исходное изображение.
function funcevent11_1() {
    document.querySelector('.event11 img').setAttribute('src', './JSImages/jojo1.png');
}

document.querySelector('.event11').onmouseenter = funcevent11_1;

function funcevent11_2() {
    document.querySelector('.event11 img').setAttribute('src', './JSImages/jojo2.png');
}

document.querySelector('.event11').onmouseleave = funcevent11_2;


//T12
//Дан блок .event12. Добавьте на него событие mousedown - при нажатии кнопки мыши - добавляйте ему класс active.
function funcevent12() {
    document.querySelector('.event12').classList.add('active');
}

document.querySelector('.event12').onmousedown = funcevent12;


//T13
//Дан блок .event13. Добавьте на него событие mousedown - при нажатии кнопки мыши - добавляйте ему класс active. Добавьте ему событие mouseup - при отпускании мыши - удаляйте класс active.

document.querySelector('.event13').onmousedown = () => {
    document.querySelector('.event13').classList.add('active');
}
document.querySelector('.event13').onmouseup = () => {
    document.querySelector('.event13').classList.remove('active');
}


//T14
//Дан блок .event14. При нажатии кнопки buttevent14 добавляйте к нему событие onclick - которое, при клике добавляем блоку event14 класс active.
document.querySelector('#buttevent14').onclick = () => {
    document.querySelector('.event14').classList.add('active');
}


//T15
//Дан блок .event15. Добавьте на него событие move. При каждом движении мыши увеличивайте число внутри на 1.
let counterevent15 = 0;

function funcevent15() {
    counterevent15++;
    document.querySelector('.event15').innerHTML = counterevent15;
}

document.querySelector('.event15').onmousemove = funcevent15;


//T16
//Дан блок .event16. Добавьте на него событие move. При каждом движении мыши увеличивайте ширину блока на 1px.
let widthevent16 = 75;

function funcevent16() {
    widthevent16++;
    document.querySelector('.event16').style.width = widthevent16 + 'px';
}

let moovingevent16 = document.querySelector('.event16')
moovingevent16.onmousemove = funcevent16;


//T17
//Дано 2 кнопки - buttevent17_on и buttevent17_off. Напишите фукнции funcevent17On и funcevent17Off которые включают и отключают событие onmousemove в задании 16.
function funcevent17On() {
    moovingevent16.onmousemove = funcevent16;
}

document.querySelector('#buttevent17_on').onclick = funcevent17On;

function funcevent17Off() {
    moovingevent16.onmousemove = null;
}

document.querySelector('#buttevent17_off').onclick = funcevent17Off;


//T18
//Дан блок .event18. Напишите фукнцию funcevent18 которая выводит в данный блок его ширину при событии onmouseenter.
document.querySelector('.event18').onmouseenter = () => {
    //1 способ геттером
    //document.querySelector('.event18').innerHTML = getComputedStyle(document.querySelector('.event18')).width;\
    //2 способ офсетом(устаревший)
    document.querySelector('.event18').innerHTML = document.querySelector('.event18').offsetWidth;
}


//T19
//Дан блок .event19. Напишите фукнцию funcevent19 которая выводит в данный блок его классы при событии onmouseout.
function funcevent19() {

    document.querySelector('.event19').innerHTML = document.querySelector('.event19').classList;
}

document.querySelector('.event19').onmouseout = funcevent19;


//T20
//Дан элемент progress. Напишите фукнцию funcevent20 которая увеличивает его value на 1 при каждом событии mousemove внутри progress.
let counterevent20 = 10;

function funcevent20() {
    counterevent20++;
    document.querySelector('#progressbar20').value = counterevent20;
}

document.querySelector('#progressbar20').onmousemove = funcevent20;


//UNIT 20. СОБЫТИЯ КЛАВИАТУРЫ В JAVASCRIPT

//событие изменения инпута
document.querySelector('.inputkb').oninput = function (eventinp) {
    console.log(eventinp);
};

//событие срабатывания клавиши
document.querySelector('.inputkb').onkeypress = function (eventkb) {
    console.log('keypress');
    console.log('charCode: ' + eventkb.charCode); //q - 113 Q - 81; код цифр от 48 до 57;
    console.log('code: ' + eventkb.code);
    console.log('key: ' + eventkb.key);
    console.log('keyCode: ' + eventkb.keyCode);
    console.log(eventkb);
};

//событие срабатывает при зажатии клавиши
document.querySelector('.inputkb').onkeydown = function (eventkbdown) {
    console.log('keydown');
    console.log('charCode: ' + eventkbdown.charCode); //q - 113 Q - 81; код цифр от 48 до 57;
    console.log('code: ' + eventkbdown.code);
    console.log('key: ' + eventkbdown.key);
    console.log('keyCode: ' + eventkbdown.keyCode);
    console.log(eventkbdown);
    if (eventkbdown.key == 'CapsLock') {
        document.querySelector('.checkboxkb').checked = true;
    } else {
        document.querySelector('.checkboxkb').checked = false;
    }
};

//событие срабатывает при отжатии клавиши
document.querySelector('.inputkb').onkeyup = function (eventkbup) {
    console.log('keyup');
    console.log('charCode: ' + eventkbup.charCode); //q - 113 Q - 81; код цифр от 48 до 57;
    console.log('code: ' + eventkbup.code);
    console.log('key: ' + eventkbup.key);
    console.log('keyCode: ' + eventkbup.keyCode);
    console.log(eventkbup);
    if (eventkbup.key == 'CapsLock') {
        document.querySelector('.checkboxkb').checked = true;
    } else {
        document.querySelector('.checkboxkb').checked = false;
    }
};


document.querySelector('.inputkbfalse').onkeypress = function (eventkbfalse) {
    console.log('keypress');
    console.log('charCode: ' + eventkbfalse.charCode); //q - 113 Q - 81; код цифр от 48 до 57;
    console.log('code: ' + eventkbfalse.code);
    console.log('key: ' + eventkbfalse.key);
    console.log('keyCode: ' + eventkbfalse.keyCode);
    console.log(eventkbfalse);
    let arraykbfalse = {
        q: 'w', w: 'e',
    }
    document.querySelector('.inputkbfalse').value += arraykbfalse[eventkbfalse.key]
    return false;
};


//T1
//Дан input .inputkb1. Напишите функцию funckb1, которая выводит в .outkb1 символ и возвращает его. Во всех
//последующих задачах - работаем с латиницей и цифрами.
document.querySelector('.inputkb1').onkeydown = function funckb1(eventkb1) {
    document.querySelector('.outkb1').textContent = document.querySelector('.inputkb1').value;
    return eventkb1.value;
}


//T2
//Дан input .inputkb2. Напишите функцию funckb2, которая выводит в .outkb2 код символа и возвращает его.
document.querySelector('.inputkb2').onkeydown = function funckb1(eventkb2) {
    document.querySelector('.outkb2').textContent += eventkb2.keyCode + '; ';
    return eventkb2.keyCode;
}


//T3
//Дан input .inputkb3. Напишите функцию funckb3, которая выводит на страницу true если введен символ и false если
//цифра. Для определения - используйте код клавиши.
let inputkb3 = document.querySelector('.inputkb3').value;

function funckb3(eventkb3) {
    if (eventkb3.keyCode >= 48 && eventkb3.keyCode <= 57 || eventkb3.keyCode >= 96 && eventkb3.keyCode <= 105) {
        document.querySelector('.outkb3').textContent = false;
    } else {
        document.querySelector('.outkb3').textContent = true;
    }
};document.querySelector('.inputkb3').onkeydown = funckb3;


//T4
//Дан input .inputkb4. Напишите функцию funckb4, которая выводит в .outkb4 только символы в нижнем регистре. Т.е.
//ввели ab4Bci в out получаем ab4bci.
function funckb4() {
    let inputkb4 = document.querySelector('.inputkb4').value;
    document.querySelector('.outkb4').textContent = inputkb4.toLowerCase();
};document.querySelector('.inputkb4').onkeydown = funckb4;


//T5
//Дан input .inputkb5. Напишите функцию funckb5, которая выводит в .outkb5 все вводимые символы в верхнем регистре.
//Т.е. пользователь ввел AbCd и функция выведет ABCD.
document.querySelector('.inputkb5').onkeydown = function funckb5() {
    document.querySelector('.outkb5').textContent = document.querySelector('.inputkb5').value.toUpperCase();
};


//T6
//Дан input .inputkb6. Напишите функцию funckb6, которая выводит в .inputkb6 только символы в нижнем регистре.
document.querySelector('.inputkb6').onkeydown = function funckb6(eventkb6) {
    let key6 = eventkb6.key;
    if (key6.toLowerCase() === key6) {
        document.querySelector('.outkb6').textContent = document.querySelector('.inputkb6').value;
    } else {
        return false
    }
};


//T7
//Дан input .inputkb7. Напишите функцию funckb7, которая выводит в .outkb7 случаный символ из массива arraykb7 при каждом вводе символа.
let strkb7 = '';
document.querySelector('.inputkb7').onkeydown = function funckb7(eventkb7) {
    const arraykb7 = ['a', 'z', 'x', 'w', 'y', 't'];
    // получаем случайное число
    let index = getRandomInt(0, arraykb7.length - 1);
    strkb7 += arraykb7[index];
    document.querySelector('.outkb7').innerHTML = strkb7;
    return false;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


//T8
//Дан input .inputkb8. Напишите функцию funckb8, которая выводит в .outkb8 вводимый в input текст, но заменяет i на 1, o на 0, l на 7.

document.querySelector('.inputkb8').onkeydown = function funckb8(eventkb8) {
    let arraykb8 = {
        i: 1, o: 0, l: 7,
    }
    if (arraykb8[eventkb8.key] !== undefined) {
        document.querySelector('.inputkb8').value += arraykb8[eventkb8.key];
        return false;
    } else {
        document.querySelector('.outkb8').textContent = document.querySelector('.inputkb8').value;
    }
};

//T9
//Дан input .inputkb9. Напишите функцию funckb8, выводит в .outkb9 количество нажатых клавиш стрелка вниз.
let counterkv9 = 0;
document.querySelector('.inputkb9').onkeydown = function funckb9(eventkb9) {
    if (eventkb9.key == 'ArrowDown') {
        document.querySelector('.outkb9').innerHTML = counterkv9;
        counterkv9++;
    }
};


//T10
//Дан input .inputkb10 и изображение 1.png. Добавьте событие на input, при нажатии клавиш стрелка вправо и
//стрелка влево увеличивать ширину изображения. Клавиши стрелка вверх и вниз - увеличивать высоту
//изображения. Одно нажатие клавиши - 1px.
let counterW10 = 150;
let counterH10 = 80;
document.querySelector('.inputkb10').onkeydown = function funckb10(eventkb10) {
    if (eventkb10.key == 'ArrowLeft') {
        document.querySelector('#jojoimg10').style.width = counterW10 + 'px';
        counterW10--;
    }
    if (eventkb10.key == 'ArrowRight') {
        document.querySelector('#jojoimg10').style.width = counterW10 + 'px';
        counterW10++;
    }
    if (eventkb10.key == 'ArrowDown') {
        document.querySelector('#jojoimg10').style.height = counterH10 + 'px';
        counterH10--
    }
    if (eventkb10.key == 'ArrowUp') {
        document.querySelector('#jojoimg10').style.height = counterH10 + 'px';
        counterH10++
    }

};


// //T11
// //1. Выполните в html верстку клавиш клавиатуры. Сверстайте – блок цифровых клавиш от 1 до 0. И ряд клавиш q – p. Добавьте
// //клавишу левый shift, левый alt, левый ctrl, пробел, enter.
// //
// //2. Добавьте на input .inputkb11 событие onkeypress или onkeyup или onkeydown ( по вашему выбору). Когда событие происходит (
// //ввод символа в input) необходимо подсветить ( добавить класс active) клавише с таким символом. Со всех остальных клавиш
// //– удалить класс active.
// //
// //3. Если вводится следующий символ – повторить удаление active и подсветить клавишу с введенным символом.
// //
// //4. Ограничения проекта – тестируются только указанные клавиши в латинской раскладке. Комбинации клавиш не тестируются.
// //Т.е. нажиматься shift+A, ctrl+shift – не будут. Все символы вводятся в нижнем регистре.
// document.querySelector('.inputkb11').onkeydown = function funckb11(eventkb11) {
//     let keys11 = document.querySelectorAll('.containerkb11 div');
//     for (let i = 0; i < keys11.length; i++) if (keys11[i].textContent == eventkb11.key || keys11[i].textContent == eventkb11.code) {
//         keys11[i].classList.add('active');
//
//     } else {
//         keys11[i].classList.remove('active');
//     }
//     return false;
// }


//UNIT 21. КРАТКИЙ ОБЗОР TOUCH СОБЫТИЙ

document.querySelector('.touchevent').addEventListener('touchstart', functouchs);
document.querySelector('.touchevent').addEventListener('touchend', functouche);
let countertse = 0;

function functouchs(eventtouch) {
    console.log(eventtouch);
    console.log('work');
    document.querySelector('.outtouchevent-1').innerHTML = 'количество нажимающих пальцев: ' + eventtouch.touches.length;
    document.querySelector('.outtouchevent').innerHTML = 'количество кликов: ' + countertse;
    countertse++;
};let countertee = 0;

function functouche() {
    document.querySelector('.outtouchevent-2').innerHTML = 'количество отпусканий пальца: ' + countertee;
    countertee++;
};document.querySelector('.touchevent-1').addEventListener('touchmove', functouchm);
let counterm = 0;

function functouchm(eventm) {
    console.log(eventm)
    document.querySelector('.outtouchevent-3').innerHTML = 'скольжение пальца: ' + counterm;
    counterm++;
}


//T1
//Создайте блок diveventmove1. Добавьте на него событие touchstart. Выведите в outeventmove1 слово touch если событие сработает.
function functouchevent1() {
    document.querySelector('.outeventmove1').innerHTML += 'touch';
}

document.querySelector('.diveventmove1').addEventListener('touchstart', functouchevent1);


//T2
//Создайте блок diveventmove2. Добавьте на него событие touchstart. Выведите в outeventmove2 число срабатываний события.
let countertouchevent2 = 0;

function functouchevent2() {
    document.querySelector('.outeventmove2').innerHTML = 'число срабатываний: ' + countertouchevent2;
    countertouchevent2++;
};document.querySelector('.diveventmove2').addEventListener('touchstart', functouchevent2);


//T3
//Создайте блок diveventmove3_1 и diveventmove3_2. Добавьте на них событие touchstart. Выведите в outeventmove3 номер блока 1 или 2 на котором сработало событие.

function functouchevent3(touchevent3) {
    let outtouchevent3 = document.querySelector('.outeventmove3');
    if (touchevent3.target.classList.contains('diveventmove3_1')) {
        outtouchevent3.innerHTML = 1;
    }
    if (touchevent3.target.classList.contains('diveventmove3_2')) {
        outtouchevent3.innerHTML = 2;
    }

};document.querySelector('.diveventmove3_1').addEventListener('touchstart', functouchevent3);
document.querySelector('.diveventmove3_2').addEventListener('touchstart', functouchevent3);


//T4
//Создайте блок diveventmove4. И кнопку butteventmove4. При нажатии кнопки - добавляйте событие touchstart на блок diveventmove4. При событии происходит вывод текста touch в outeventmove4.
function functouchevent4() {
    document.querySelector('.outeventmove4').innerHTML += 'touch';
}

document.querySelector('#butteventmove4').onclick = () => {
    document.querySelector('.diveventmove4').addEventListener('touchstart', functouchevent4);
}


//T5
//Дана кнопка butteventmove5. При ее нажатии очищайте событие ontouchstart на блоке diveventmove4.
document.querySelector('#butteventmove5').onclick = () => {
    document.querySelector('.diveventmove4').removeEventListener('touchstart', functouchevent4);
}


//T6
//Добавьте событие touchend на diveventmove4. При его срабатывании выведите в outeventmove6 слово touchend.
function functouchevent6() {
    document.querySelector('.outeventmove6').innerHTML += 'touchend';
}

document.querySelector('.diveventmove4').addEventListener('touchend', functouchevent6);


//T7
//Дан блок diveventmove7. Добавьте событие touch, при срабатывании которого окрашивайте блок в красный цвет.
function functouchevent7() {
    document.querySelector('.diveventmove7').style.backgroundColor = 'red';
}

document.querySelector('.diveventmove7').addEventListener('touchstart', functouchevent7);


//T8
//Дан блок diveventmove8. Добавьте на него событие touch, которое при срабатывании окрашивает блок случаным цветом
//из массива arrayeventmove8=[red, green, blue, orange, pink, yellow]
let arrayeventmove8 = ['red', 'green', 'blue', 'orange', 'pink', 'yellow'];

function functouchevent8() {
    let index8 = getRandomInt8(0, arrayeventmove8.length - 1);
    let randomcollor8 = arrayeventmove8[index8];
    document.querySelector('.diveventmove8').style.backgroundColor = randomcollor8;
    document.querySelector('.outeventmove8').innerHTML = randomcollor8;
}

document.querySelector('.diveventmove8').addEventListener('touchstart', functouchevent8);

function getRandomInt8(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


//T9
//Дан блок diveventmove9. Добавьте событие touchstart. Выводите количество одновременных касаний в outeventmove9.
function functouchevent9(touchevent9) {
    document.querySelector('.outeventmove9').innerHTML = 'количество одновременных касаний: ' + touchevent9.touches.length;
}

document.querySelector('.diveventmove9').addEventListener('touchstart', functouchevent9);


//T10
//Дан блок diveventmove10. Добавьте на него событие touchmove. При срабатывании события - увеличивайте его ширину на 1.
let countertouchevent10 = 75;

function functouchevent10() {
    document.querySelector('.diveventmove10').style.width = countertouchevent10 + 'px';
    countertouchevent10++;
}

document.querySelector('.diveventmove10').addEventListener('touchmove', functouchevent10);


//T11
//Дан блок diveventmove11. Добавьте на него событие touch. При срабатывании выводите радиус события radiusX, radiusY.
function functouchevent11(touchevent11) {
    document.querySelector('.outeventmove11').innerHTML = 'radiusX: ' + touchevent11.touches[0].radiusX + '; ' + 'radiusY: ' + touchevent11.touches[0].radiusY;
}

document.querySelector('.diveventmove11').addEventListener('touchstart', functouchevent11);


//T12
//1. Добавьте на кнопку nex событие click, touch так, чтобы при событии запускалась функция nextFunction и
//активным становилось изображение следующее за выделенным классом active-img (рамкой). Соответственно, на
//активном изображении появляется рамка, а остальные - лишаются рамки.

//2. Добавьте на кнопку prev событие click, touch так, чтобы при событии запускалась функция prevFunction и
//активным становилось изображение до выделенного классом active-img (рамкой). Соответственно, на активном
//изображении появляется рамка, а остальные - лишаются рамки.

//3. Учтите краевые эффекты - когда мы доходим до конца или начала, то нажатие кнопки должно приводить к
//перемещению рамки в начало или конец изображений.

//4. Добавьте кнопку reset (функция resetFunction), нажатие которой сбрасывает активное изображение нанулевое.

//5. Добавьте во все действия следующее - в изображении img-12-max заменяется src на активную. Т.е. произошло событие - заменилась главная картинка.

const images12 = document.querySelectorAll('.img-12-min');
let counterte = 0; // переменная, которая указывает на номер активного изображения в images

const next = document.querySelector('.next12');
next.onclick = nextFunction;
const prev = document.querySelector('.prev12');
prev.onclick = prevFunction;
const reset = document.querySelector('.reset12');
reset.onclick = resetFunction;

function nextFunction() {
    if (counterte + 1 < images12.length) {
        counterte++
    } else {
        counterte = 0
    }
    // images12.forEach(element => {
    //     element.classList.remove('active-img')
    // })
    //нужно очистить класс со всех элементов любым циклом перед добавлением класса.
    for (let i = 0; i < images12.length; i++) {
        images12[i].classList.remove('active-img');
    }
    images12[counterte].classList.add('active-img')
    document.querySelector('.img-12-max').src = images12[counterte].src
}

function prevFunction() {
    if (counterte - 1 < 0) {
        counterte = images12.length;
    }
    counterte--;
    images12.forEach(element => {
        element.classList.remove('active-img')
    })
    images12[counterte].classList.add('active-img');
    document.querySelector('.img-12-max').src = images12[counterte].src
}


function resetFunction() {
    counterte = 0;
    images12.forEach(element => {
        element.classList.remove('active-img')
    })
    images12[counterte].classList.add('active-img');
    document.querySelector('.img-12-max').src = images12[counterte].src;
}

// next.ontouchend = nextFunction;
// prev.ontouchend = prevFunction;
// reset.ontouchend = resetFunction;


//UNIT 22. ОБРАБАТЫВАЕМ ОШИБКИ С ПОМОЩЬЮ TRY CATCH

let atry = 5;
atry = atry * 2;
try {
    document.querySelector('.divtry').innerHTML = atry;
} catch (Err) {
    console.log(Err)
    console.log('error')
} finally {
    console.log('still working')
}
console.log(atry);


//T1
//Добавьте в код функции try catch так, чтобы вместо ошибки выводилось в tryout1 цифра 1.
function functry1() {
    // тут добавляете try
    try {
        let a = 22;
        let c = a + d;
        document.querySelector('.tryout1').innerHTML = c;
    }
        // тут catch
    catch (Err) {
        console.log(Err);
        document.querySelector('.tryout1').innerHTML = 1;
    }
    // .. и вывод
}

document.querySelector('#trybutt1').onclick = functry1;


//T2
//Добавьте в код функции try catch так, чтобы вместо ошибки был вывод результата в tryout2.
function functry2() {
    try {
        let a = 4;
        let b = 5;
        document.querySelector('.out-2222222').innerHTML = a * b;
    } catch (Err) {
        console.log(Err);
        let a = 4;
        let b = 5;
        document.querySelector('.tryout2').innerHTML = a * b;
    }
}

document.querySelector('#trybutt2').onclick = functry2;


//T3
//Добавьте в код функции try catch так, чтобы вместо ошибки был вывод результата в tryout3. Если его нет - создавайте в коде.
//т.е. вы не знаете будет или нет он в html.
function functry3() {
    try {
        let a = 4;
        let b = 5;
        document.querySelector('.tryout3').innerHTML = a * b;
    } catch (Err) {
        let a = 4;
        let b = 5;
        let newdiv3 = document.createElement("div");
        newdiv3.classList.add('tryout3');
        newdiv3.textContent = "out-3";
        document.querySelector('#trybutt3').after(newdiv3);
        document.querySelector('.tryout3').innerHTML = a * b;
        console.log(Err);
    }
}

document.querySelector('#trybutt3').onclick = functry3;


//T4
//Дана переменная atry4. В переменную делается push. Используя try catch отловите ошибки если они есть. Если ошибка вывести в tryout4 число 0. Если не ошибка - то результирующий массив через пробел.
let atry4 = [2, 3, 4];

// atry4 = 5;

function functry4() {
    try {
        atry4.push(7);

        document.querySelector('.tryout4').innerHTML = atry4.join(' ');
    } catch (Err) {
        console.log(Err);
        document.querySelector('.tryout4').innerHTML = 0;
    }
}

document.querySelector('#trybutt4').onclick = functry4;


//T5
//Добавьте try, catch, finnaly так, чтобы в tryout5 выводился 0 при ошибки. А в tryout5-1 всегда выводилось слово 'finnaly';
function functry5() {
    let p = document.querySelectorAll('p');
    try {
        p.push(3);
        document.querySelector('.tryout5').innerHTML = p;
    } catch (Err) {
        console.log(Err);
        document.querySelector('.tryout5').innerHTML = 0;
    } finally {
        document.querySelector('.tryout5-1').innerHTML = 'finnaly';
    }
}

document.querySelector('#trybutt5').onclick = functry5;


//UNIT 23. LOCALSTORAGE. СОХРАНЯЕМ ВСЕ
window.addEventListener('storage', function (e) {
    console.log('change');
    document.querySelector('.testLS').innerHTML = localStorage.getItem('b1');
})
localStorage.setItem('data', 5);
console.log(localStorage.getItem('data'));

let arraylsA = [3, 4, 5];
localStorage.setItem('array', JSON.stringify(arraylsA));
let arraylsB = localStorage.getItem('array');
arraylsB = JSON.parse(arraylsB)
console.log(arraylsB);
console.log(arraylsB[1]);
console.log(typeof arraylsB);


let arraylsC = {
    hello: 5, k: 2, 4: 'hi',
};
localStorage.setItem('asoarray', JSON.stringify(arraylsC));
let arraylsD = localStorage.getItem('asoarray');
arraylsD = JSON.parse(arraylsD)
console.log(arraylsD);

console.log(typeof arraylsD);


//T1
// Создайте функцию funcLS1 которая записывает в LS ключ 5 со значением 11. Проверьте что происходит при
// повторном вызове функции. Запускается ф-я по кнопке buttLS1.
function funcLS1() {
    localStorage.setItem(5, 11);
};document.querySelector('#buttLS1').onclick = funcLS1;


//T2
// Создайте функцию funcLS2 которая записывает в LS массив arrayLS2 = [7,6,5]. Ключ arrayLS2. Проверьте что происходит при
// повторном вызове функции. Запускается ф-я по кнопке buttLS2.
let arrayLS2 = [7, 6, 5];

function funcLS2() {
    localStorage.setItem('arrayLS2', JSON.stringify(arrayLS2));
};document.querySelector('#buttLS2').onclick = funcLS2;


//T3
// При нажатии кнопки funcLS3 выведите из LS сохраненный массив arrayLS2. Выведите в divLS3 в формате ключ пробел
// значение перенос строки.
function funcLS3() {
    let stringLS3 = localStorage.getItem('arrayLS2');
    stringLS3 = JSON.parse(stringLS3);
    for (let i = 0; i < stringLS3.length; i++) {
        document.querySelector('.divLS3').innerHTML += [i] + ' ' + stringLS3[i] + '<br>';
    }
};document.querySelector('#buttLS3').onclick = funcLS3;


//T4
// Создайте функцию funcLS4 которая записывает в LS массив arrayLS4 = {hello: world, hi:mahai}. Ключ arrayLS4. Проверьте что
// происходит при повторном вызове функции. Запускается ф-я по кнопке buttLS4.
let arrayLS4 = {hello: 'world', hi: 'mahai'};

function funcLS4() {
    localStorage.setItem('arrayLS4', JSON.stringify(arrayLS4));
};
document.querySelector('#buttLS4').onclick = funcLS4;


//T5
// При нажатии кнопки buttLS5 выведите из LS сохраненный массив arrayLS4. Выведите в divLS5 в формате ключ пробел
// значение перенос строки.
function funcLS5() {
    let stringLS4 = localStorage.getItem('arrayLS4');
    stringLS4 = JSON.parse(stringLS4);
    let LSout5 = '';
    for (let keyLS5 in stringLS4) {
        LSout5 += keyLS5 + ' ' + stringLS4[keyLS5] + '<br>';
    }
    document.querySelector('.divLS5').innerHTML = LSout5;
};document.querySelector('#buttLS5').onclick = funcLS5;


//T6
// Создайте функцию funcLS6 которая очищает весь LS. Запуск по кнопке buttLS6.
function funcLS6() {
    localStorage.clear();
};document.querySelector('#buttLS6').onclick = funcLS6;


//T7
// Создайте input inputLS7 куда пользователь может вводить числа и строки. Создайте массив arrayLS7. Когда
// пользователь нажимает кнопку buttLS7 число должно добавляться в массив. Массив должен сохраняться в LS с
// ключом arrayls7.
let arrayLS7 = [];

function funcLS7() {
    let storageinp7 = document.querySelector('#inputLS7').value;
    arrayLS7.push(storageinp7);
    localStorage.setItem('arrayLS7', JSON.stringify(arrayLS7));
};document.querySelector('#buttLS7').onclick = funcLS7;


//T8
// Создайте функцию funcLS8 при запуске которой из arrayLS7 удаляется последний элемент. После чего массив сохраняется
// в LS с ключем arrayLS7. Использовать массив из предыдущего задания.
function funcLS8() {
    let storagearray8 = localStorage.getItem('arrayLS7');
    storagearray8 = JSON.parse(storagearray8);
    storagearray8.pop();
    localStorage.setItem('arrayLS7', JSON.stringify(storagearray8));
}
document.querySelector('#buttLS8').onclick = funcLS8;


//UNIT 25. AJAX - АСИНХРОННЫЙ JAVASCRIPT

//auth=7859d9d42a8834141d529577207c9596
//https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest

// GET запрос
let xhttp = new XMLHttpRequest();
let aAJAX = 0;
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myAJAXfunction(this.responseText);
    }
};

// xhttp.open('GET', 'https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=1', true);
// xhttp.send();

function myAJAXfunction(data) {
    console.log('GET запрос:');
    aAJAX = data;
    console.log(data)
}

console.log(aAJAX); // манипуляции с переменными ссылающимися на сервер за пределами колбэк функции бессмысленны


//POST запрос
let xhttp2 = new XMLHttpRequest();
let aAJAX2 = 0;
xhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myAJAXfunction2(this.responseText);
    }
};
let aJAXpostrequest = {auth: '7859d9d42a8834141d529577207c9596', action: 2, name: 'Dmitry'};
let AJAXstring = new URLSearchParams(aJAXpostrequest);
// xhttp2.open('POST', 'https://getpost.itgid.info/index2.php', true);
// xhttp2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
// xhttp2.send(AJAXstring); // 'auth=7859d9d42a8834141d529577207c9596&action=2&name=Dmitriy'

function myAJAXfunction2(data) {
    console.log('POST запрос:');
    aAJAX2 = data;
    console.log(data);
};


//дз GET запросы
let httprequest = new XMLHttpRequest();

//T1
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 1. Выведите в outAJAX1 результат. Запускаться функция должна по нажатию buttAJAX1.
document.querySelector('#buttAJAX1').onclick = function myAJAXfunction1() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction1(this.responseText);
        }
    };
    httprequest.open('GET', 'https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=1', true);
    httprequest.send();

    function AJAXfunction1(data) {
        document.querySelector('.outAJAX1').innerHTML = data;
    }
};

//T2
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 2. Добавьте параметр name с вашим именем на латинице.
//Если все сделано верно, сервер пришлет строку hello ваше имя. Выведите в outAJAX2 результат. Запускаться функция должна по нажатию buttAJAX2.
document.querySelector('#buttAJAX2').onclick = function myAJAXfunction2() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction2(this.responseText);
        }
    };
    httprequest.open('GET', 'https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=2&name=Dmitriy', true);
    httprequest.send();

    function AJAXfunction2(data) {
        document.querySelector('.outAJAX2').innerHTML = data;
    }
};


//T3
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 3. Добавьте параметр num1 и num2 содержащие числа.
//Если все сделано верно, сервер вернет сумму чисел. Выведите в outAJAX3 результат. Запускаться функция должна по нажатию buttAJAX3.
document.querySelector('#buttAJAX3').onclick = function myAJAXfunction3() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction3(this.responseText);
        }
    };
    httprequest.open('GET', 'https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=3&num1=10&num2=100', true);
    httprequest.send();

    function AJAXfunction3(data) {
        document.querySelector('.outAJAX3').innerHTML = data;
    }
};


//T4
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 4. Добавьте параметр num1 и num2 содержащие числа.
//Если все сделано верно, сервер вернет случайное число в заданном диапазоне. Не забывайте указывать параметр auth (ключ в чате). Выведите в outAJAX4 результат.
//Запускаться функция должна по нажатию buttAJAX4.
document.querySelector('#buttAJAX4').onclick = function myAJAXfunction4() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction4(this.responseText);
        }
    };
    httprequest.open('GET', 'https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=4&num1=30&num2=60', true);
    httprequest.send();

    function AJAXfunction4(data) {
        document.querySelector('.outAJAX4').innerHTML = data;
    }
};


//T5
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 5. Если все сделано верно, сервер вернет текущее время и дату.
//Не забывайте указывать параметр auth (ключ в чате). Выведите в outAJAX5 результат. Запускаться функция должна по нажатию buttAJAX5.
document.querySelector('#buttAJAX5').onclick = function myAJAXfunction5() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction5(this.responseText);
        }
    };
    httprequest.open('GET', 'https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=5', true);
    httprequest.send();

    function AJAXfunction5(data) {
        document.querySelector('.outAJAX5').innerHTML = data;
    }
};


//T6
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 6. Добавьте параметр num1 и num2 содержащие числа.
//Если все сделано верно, сервер вернет большее число. Не забывайте указывать параметр auth (ключ в чате). Выведите в outAJAX6 результат.
//Запускаться функция должна по нажатию buttAJAX6.
document.querySelector('#buttAJAX6').onclick = function myAJAXfunction6() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction6(this.responseText);
        }
    };
    httprequest.open('GET', 'https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=6&num1=50&num2=150', true);
    httprequest.send();

    function AJAXfunction6(data) {
        document.querySelector('.outAJAX6').innerHTML = data;
    }
};


//T7
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 7. Если все сделано верно, сервер случайную ссылку на изображение.
//Не забывайте указывать параметр auth (ключ в чате). Выведите в outAJAX7 результат. Запускаться функция должна по нажатию buttAJAX7.
document.querySelector('#buttAJAX7').onclick = function myAJAXfunction7() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction7(this.responseText);
        }
    };
    httprequest.open('GET', 'https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=7', true);
    httprequest.send();

    function AJAXfunction7(data) {
        document.querySelector('.outAJAX7').innerHTML = data;
        const image = document.createElement('img');
        image.src = data;
        document.querySelector('.containerAJAX7').appendChild(image);
    }
};


//T8
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 8. В качестве параметра по очереди укажите year равный году вашего рождения.
//Если все правильно сервер вернет ваш возраст. Не забывайте указывать параметр auth (ключ в чате). Выведите в outAJAX8 результат. Запускаться функция должна по нажатию buttAJAX8.
document.querySelector('#buttAJAX8').onclick = function myAJAXfunction8() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction8(this.responseText);
        }
    };
    httprequest.open('GET', 'https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=8&year=1993', true);
    httprequest.send();

    function AJAXfunction8(data) {
        document.querySelector('.outAJAX8').innerHTML = data;
    }
};


//T9
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 9. В качестве параметра по очереди укажите m = 1, d=1, y=1.
//Если все сделано верно, сервер возвратит дату или месяц или год. Не забывайте указывать параметр auth (ключ в чате). Выведите в outAJAX9 результат.
//Запускаться функция должна по нажатию buttAJAX9.
document.querySelector('#buttAJAX9').onclick = function myAJAXfunction9() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction9(this.responseText);
        }
    };
    httprequest.open('GET', 'https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=9&m=1&d=1&y=1', true);
    httprequest.send();

    function AJAXfunction9(data) {
        document.querySelector('.outAJAX9').innerHTML = data;
    };
};


//POST запросы
//T10
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 1. Выведите в outAJAX10 результат. Запускаться функция должна по нажатию buttAJAX10.
document.querySelector('#buttAJAX10').onclick = function myAJAXfunction10() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction10(this.responseText);
        }
    };
    let aJAXpostrequest = {auth: '7859d9d42a8834141d529577207c9596', action: 1};
    let AJAXstring = new URLSearchParams(aJAXpostrequest);
    httprequest.open('POST', 'https://getpost.itgid.info/index2.php', true);
    httprequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    httprequest.send(AJAXstring); //

    function AJAXfunction10(data) {
        document.querySelector('.outAJAX10').innerHTML = data;
    }
};

//T11
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 2. Добавьте параметр name с вашим именем на латинице.
//Если все сделано верно, сервер пришлет строку hello ваше имя. Не забывайте указывать параметр auth (ключ в чате).
//Выведите в outAJAX11 результат. Запускаться функция должна по нажатию buttAJAX11.
document.querySelector('#buttAJAX11').onclick = function myAJAXfunction11() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction11(this.responseText);
        }
    };
    let aJAXpostrequest = {auth: '7859d9d42a8834141d529577207c9596', action: 2, name: 'Dmitriy'};
    let AJAXstring = new URLSearchParams(aJAXpostrequest);
    httprequest.open('POST', 'https://getpost.itgid.info/index2.php', true);
    httprequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    httprequest.send(AJAXstring); //

    function AJAXfunction11(data) {
        document.querySelector('.outAJAX11').innerHTML = data;
    }
};


//T12
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 3. Добавьте параметр num1 и num2 содержащие числа.
//Если все сделано верно, сервер вернет сумму чисел. Не забывайте указывать параметр auth (ключ в чате). Выведите в outAJAX12 результат.
//Запускаться функция должна по нажатию buttAJAX12.
document.querySelector('#buttAJAX12').onclick = function myAJAXfunction12() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction12(this.responseText);
        }
    };
    let aJAXpostrequest = {auth: '7859d9d42a8834141d529577207c9596', action: 3, num1: 15, num2: 35};
    let AJAXstring = new URLSearchParams(aJAXpostrequest);
    httprequest.open('POST', 'https://getpost.itgid.info/index2.php', true);
    httprequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httprequest.send(AJAXstring);

    function AJAXfunction12(data) {
        document.querySelector('.outAJAX12').innerHTML = data;
    }
};


//T13
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 4. Добавьте параметр num1 и num2 содержащие числа.
//Если все сделано верно, сервер вернет случайное число в заданном диапазоне. Не забывайте указывать параметр auth (ключ в чате).
//Выведите в outAJAX13 результат. Запускаться функция должна по нажатию buttAJAX13.
document.querySelector('#buttAJAX13').onclick = function myAJAXfunction13() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction13(this.responseText);
        }
    };
    let aJAXpostrequest = {auth: '7859d9d42a8834141d529577207c9596', action: 4, num1: 10, num2: 200};
    let AJAXstring = new URLSearchParams(aJAXpostrequest);
    httprequest.open('POST', 'https://getpost.itgid.info/index2.php', true);
    httprequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httprequest.send(AJAXstring);

    function AJAXfunction13(data) {
        document.querySelector('.outAJAX13').innerHTML = data;
    }
};


//T14
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 5. Если все сделано верно, сервер вернет текущее время и дату.
//Не забывайте указывать параметр auth (ключ в чате). Выведите в outAJAX14 результат. Запускаться функция должна по нажатию buttAJAX14.
document.querySelector('#buttAJAX14').onclick = function myAJAXfunction14() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction14(this.responseText);
        }
    };
    let aJAXpostrequest = {auth: '7859d9d42a8834141d529577207c9596', action: 5};
    let AJAXstring = new URLSearchParams(aJAXpostrequest);
    httprequest.open('POST', 'https://getpost.itgid.info/index2.php', true);
    httprequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httprequest.send(AJAXstring);

    function AJAXfunction14(data) {
        document.querySelector('.outAJAX14').innerHTML = data;
    }
};


//T15
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 6. Добавьте параметр num1 и num2 содержащие числа.
//Если все сделано верно, сервер вернет большее число. Не забывайте указывать параметр auth (ключ в чате). Выведите в outAJAX15 результат.
//Запускаться функция должна по нажатию buttAJAX15.
document.querySelector('#buttAJAX15').onclick = function myAJAXfunction15() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction15(this.responseText);
        }
    };
    let aJAXpostrequest = {auth: '7859d9d42a8834141d529577207c9596', action: 6, num1: 100, num2: 15};
    let AJAXstring = new URLSearchParams(aJAXpostrequest);
    httprequest.open('POST', 'https://getpost.itgid.info/index2.php', true);
    httprequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httprequest.send(AJAXstring);

    function AJAXfunction15(data) {
        document.querySelector('.outAJAX15').innerHTML = data;
    }
};


//T16
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 7. Если все сделано верно, сервер случайную ссылку на изображение.
//Не забывайте указывать параметр auth (ключ в чате). Выведите в outAJAX16 результат. Запускаться функция должна по нажатию buttAJAX16.
document.querySelector('#buttAJAX16').onclick = function myAJAXfunction16() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction16(this.responseText);
        }
    };
    let aJAXpostrequest = {auth: '7859d9d42a8834141d529577207c9596', action: 7};
    let AJAXstring = new URLSearchParams(aJAXpostrequest);
    httprequest.open('POST', 'https://getpost.itgid.info/index2.php', true);
    httprequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httprequest.send(AJAXstring);

    function AJAXfunction16(data) {
        document.querySelector('.outAJAX16').innerHTML = data;
        const image = document.createElement('img');
        image.src = data;
        document.querySelector('.containerAJAX16').appendChild(image);
    }
};


//T17
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 8. В качестве параметра по очереди укажите year равный году вашего рождения.
//Если все правильно сервер вернет ваш возраст. Не забывайте указывать параметр auth (ключ в чате).Выведите в outAJAX17 результат. Запускаться функция должна по нажатию buttAJAX17.
document.querySelector('#buttAJAX17').onclick = function myAJAXfunction17() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction17(this.responseText);
        }
    };
    let aJAXpostrequest = {auth: '7859d9d42a8834141d529577207c9596', action: 8, year: 1993};
    let AJAXstring = new URLSearchParams(aJAXpostrequest);
    httprequest.open('POST', 'https://getpost.itgid.info/index2.php', true);
    httprequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httprequest.send(AJAXstring);

    function AJAXfunction17(data) {
        document.querySelector('.outAJAX17').innerHTML = data;
    }
};


//T18
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 9. В качестве параметра по очереди укажите m = 1, d=1, y=1.
//Если все сделано верно, сервер возвратит дату или месяц или год. Не забывайте указывать параметр auth (ключ в чате). Выведите в outAJAX18 результат.
//Запускаться функция должна по нажатию buttAJAX18.
document.querySelector('#buttAJAX18').onclick = function myAJAXfunction18() {
    httprequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            AJAXfunction18(this.responseText);
        }
    };
    let aJAXpostrequest = {auth: '7859d9d42a8834141d529577207c9596', action: 9, m: 1, d: 1, y: 1};
    let AJAXstring = new URLSearchParams(aJAXpostrequest);
    httprequest.open('POST', 'https://getpost.itgid.info/index2.php', true);
    httprequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httprequest.send(AJAXstring);

    function AJAXfunction18(data) {
        document.querySelector('.outAJAX18').innerHTML = data;
    }
};


//UNIT 26. УЧИМ FETCH НА ПРАКТИКЕ


// //fetch запрос с гет параметром
// fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=1')
//     .then(data => {   // либо сокращенно   .then(data => data.text()).then(data => {console.log('fetch запрос: ' + data);})
//         console.log(data)
//         // data.text().then(data2 => {
//         //     console.log(data2)
//         // });
//         return data.text();
//     })
//     .then(data => {
//         console.log('fetch get запрос: ' + data);
//     });
//
//
// //fetch запрос с пост параметром
// fetch('https://getpost.itgid.info/index2.php', {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     // mode: 'cors', // no-cors, *cors, same-origin
//     // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     // credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//         //'Content-Type': 'application/json'
//         'Content-Type': 'application/x-www-form-urlencoded',
//     }, // redirect: 'follow', // manual, *follow, error
//     // referrerPolicy: 'no-referrer', // no-referrer, *client
//     body: 'auth=7859d9d42a8834141d529577207c9596&action=2&name=Dmitriy', // JSON.stringify(data) // body data type must match "Content-Type" header
// })
//     .then(response => response.text()) // либо .then(response => response.json()); если в headers - 'Content-Type': 'application/json'
//     .then(response => {
//         console.log('fetch post запрос: ' + response)
//     })


//fetch get запросы
//T1
//Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 1. Выведите в outfetch1 результат. Запускаться функция должна по нажатию buttfetch1.
document.querySelector('#buttfetch1').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=1')
        .then(data => {
            console.log(data)
            return data.text();
        })
        .then(data => {
            document.querySelector('.outfetch1').innerHTML = data;
        });
}


//T2
//Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 2. Добавьте параметр name с вашим именем на латинице.
//Если все сделано верно, сервер пришлет строку hello ваше имя. Выведите в outfetch2 результат. Запускаться функция должна по нажатию buttfetch2.
document.querySelector('#buttfetch2').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=2&name=Dmitriy')
        .then(data => {
            console.log(data)
            return data.text();
        })
        .then(data => {
            document.querySelector('.outfetch2').innerHTML = data;
        });
}


//T3
//Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 3. Добавьте параметр num1 и num2 содержащие числа.
//Если все сделано верно, сервер вернет сумму чисел. Выведите в outfetch3 результат. Запускаться функция должна по нажатию buttfetch3.
document.querySelector('#buttfetch3').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=3&num1=12&num2=13')
        .then(data => {
            console.log(data)
            return data.text();
        })
        .then(data => {
            document.querySelector('.outfetch3').innerHTML = data;
        });
}

//T4
//Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 4. Добавьте параметр num1 и num2 содержащие числа.
//Если все сделано верно, сервер вернет случайное число в заданном диапазоне. Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch4 результат.
//Запускаться функция должна по нажатию buttfetch4.
document.querySelector('#buttfetch4').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=4&num1=10&num2=130')
        .then(data => {
            console.log(data)
            return data.text();
        })
        .then(data => {
            document.querySelector('.outfetch4').innerHTML = data;
        });
}

//T5
//Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 5. Если все сделано верно, сервер вернет текущее время и дату.
//Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch5 результат. Запускаться функция должна по нажатию buttfetch5.
document.querySelector('#buttfetch5').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=5')
        .then(data => {
            console.log(data)
            return data.text();
        })
        .then(data => {
            document.querySelector('.outfetch5').innerHTML = data;
        });
}


//T6
//Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 6. Добавьте параметр num1 и num2 содержащие числа.
//Если все сделано верно, сервер вернет большее число. Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch6 результат. Запускаться функция должна по нажатию buttfetch6.
document.querySelector('#buttfetch6').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=6&num1=110&num2=100')
        .then(data => {
            console.log(data)
            return data.text();
        })
        .then(data => {
            document.querySelector('.outfetch6').innerHTML = data;
        })
}


//T7
//Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 7. Если все сделано верно, сервер случайную ссылку на изображение.
//Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch7 результат. Запускаться функция должна по нажатию buttfetch7.
document.querySelector('#buttfetch7').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=7')
        .then(data => {
            console.log(data)
            return data.text();
        })
        .then(data => {
            document.querySelector('.outfetch7').innerHTML = data;
            const image = document.createElement('img');
            image.src = data;
            document.querySelector('.containerfetch7').appendChild(image);
        })
}


//T8
//Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 8. В качестве параметра по очереди укажите year равный году вашего рождения.
//Если все правильно сервер вернет ваш возраст. Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch8 результат. Запускаться функция должна по нажатию buttfetch8.
document.querySelector('#buttfetch8').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=8&year=1993')
        .then(data => {
            console.log(data)
            return data.text();
        })
        .then(data => {
            document.querySelector('.outfetch8').innerHTML = data;
        })
}


//T9
//Отправьте GET запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 9. В качестве параметра по очереди укажите m = 1, d=1, y=1.
//Если все сделано верно, сервер возвратит дату или месяц или год. Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch9 результат. Запускаться функция должна по нажатию buttfetch9.
document.querySelector('#buttfetch9').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=9&m=1&d=1&y=1')
        .then(data => {
            console.log(data)
            return data.text();
        })
        .then(data => {
            document.querySelector('.outfetch9').innerHTML = data;
        })
}

//fetch post запросы
//T10
//Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 1. Выведите в outfetch10 результат. Запускаться функция должна по нажатию buttfetch10.
document.querySelector('#buttfetch10').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php', {
        method: 'POST', headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }, body: 'auth=7859d9d42a8834141d529577207c9596&action=1',
    })
        .then(response => response.text())
        .then(response => {
            document.querySelector('.outfetch10').innerHTML = response;
        })
}

//T11
//Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 2. Добавьте параметр name с вашим именем на латинице.
//Если все сделано верно, сервер пришлет строку hello ваше имя. Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch11 результат. Запускаться функция должна по нажатию buttfetch11.
document.querySelector('#buttfetch11').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php', {
        method: 'POST', headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }, body: 'auth=7859d9d42a8834141d529577207c9596&action=2&name=Dmitriy',
    })
        .then(response => response.text())
        .then(response => {
            document.querySelector('.outfetch11').innerHTML = response;
        })
}


//T12
//Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 3. Добавьте параметр num1 и num2 содержащие числа.
//Если все сделано верно, сервер вернет сумму чисел. Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch12 результат. Запускаться функция должна по нажатию buttfetch12.
document.querySelector('#buttfetch12').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php', {
        method: 'POST', headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }, body: 'auth=7859d9d42a8834141d529577207c9596&action=3&num1=18&num2=12',
    })
        .then(response => response.text())
        .then(response => {
            document.querySelector('.outfetch12').innerHTML = response;
        })
}


//T13
//Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 4. Добавьте параметр num1 и num2 содержащие числа.
//Если все сделано верно, сервер вернет случайное число в заданном диапазоне. Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch13 результат.
//Запускаться функция должна по нажатию buttfetch13.
document.querySelector('#buttfetch13').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php', {
        method: 'POST', headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }, body: 'auth=7859d9d42a8834141d529577207c9596&action=4&num1=1&num2=55',
    })
        .then(response => response.text())
        .then(response => {
            document.querySelector('.outfetch13').innerHTML = response;
        })
}


//T14
//Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 5. Если все сделано верно, сервер вернет текущее время и дату.
//Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch14 результат. Запускаться функция должна по нажатию buttfetch14.
document.querySelector('#buttfetch14').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php', {
        method: 'POST', headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }, body: 'auth=7859d9d42a8834141d529577207c9596&action=5',
    })
        .then(response => response.text())
        .then(response => {
            document.querySelector('.outfetch14').innerHTML = response;
        })
}


//T15
//Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 6. Добавьте параметр num1 и num2 содержащие числа.
//Если все сделано верно, сервер вернет большее число. Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch15 результат. Запускаться функция должна по нажатию buttfetch15.
document.querySelector('#buttfetch15').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php', {
        method: 'POST', headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }, body: 'auth=7859d9d42a8834141d529577207c9596&action=6&num1=20&num2=25',
    })
        .then(response => response.text())
        .then(response => {
            document.querySelector('.outfetch15').innerHTML = response;
        })
}


//T16
//Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 7. Если все сделано верно, сервер случайную ссылку на изображение.
//Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch16 результат. Запускаться функция должна по нажатию buttfetch16.
document.querySelector('#buttfetch16').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php', {
        method: 'POST', headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }, body: 'auth=7859d9d42a8834141d529577207c9596&action=7',
    })
        .then(response => response.text())
        .then(response => {
            document.querySelector('.outfetch16').innerHTML = response;
            const image = document.createElement('img');
            image.src = response;
            document.querySelector('.containerfetch16').appendChild(image);
        })
};


//T17
//Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 8. В качестве параметра по очереди укажите year равный году вашего рождения.
//Если все правильно сервер вернет ваш возраст. Не забывайте указывать параметр auth (ключ в чате).Выведите в outfetch17 результат. Запускаться функция должна по нажатию buttfetch17.
document.querySelector('#buttfetch17').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php', {
        method: 'POST', headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }, body: 'auth=7859d9d42a8834141d529577207c9596&action=8&year=1993',
    })
        .then(response => response.text())
        .then(response => {
            document.querySelector('.outfetch17').innerHTML = response;
        })
}


//T18
//Отправьте POST запрос (fetch) на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 9. В качестве параметра по очереди укажите m = 1, d=1, y=1.
//Если все сделано верно, сервер возвратит дату или месяц или год. Не забывайте указывать параметр auth (ключ в чате). Выведите в outfetch18 результат.
//Запускаться функция должна по нажатию buttfetch18.
document.querySelector('#buttfetch18').onclick = function () {
    fetch('https://getpost.itgid.info/index2.php', {
        method: 'POST', headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }, body: 'auth=7859d9d42a8834141d529577207c9596&action=9&m=1&d=1&y=1',
    })
        .then(response => response.text())
        .then(response => {
            document.querySelector('.outfetch18').innerHTML = response;
        })
}


//UNIT 27. РАБОТАЕМ С ПРОМИСАМИ (PROMISE)

// let promiseA = new Promise((resolve, reject) => {
//     fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=1')
//         .then(data => {   // либо сокращенно   .then(data => data.text()).then(data => {console.log('fetch запрос: ' + data);})
//             resolve(data.text());
//         })
// })
// let promiseB = new Promise((resolve, reject) => {
//     fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=2&name=Dmitriy')
//         .then(data => {   // либо сокращенно   .then(data => data.text()).then(data => {console.log('fetch запрос: ' + data);})
//             resolve(data.text());
//         })
// })
// Promise.all([promiseA, promiseB]).then(value => {
//     console.log(value);
//     console.log(value[0]);
//     console.log(value[1]);
// })

// promiseA.then(data => {
//     console.log('promise: ' + data);
// })
// promiseB.then(data => {
//     console.log('promise: ' + data);
// })


//T1
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 1.
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 2.
//Два запроса объедините с помощью promiseAll. Результат выведите в outpromise1 результат. Запускаться функция должна по нажатию buttpromise1.
document.querySelector('#buttpromise1').onclick = function () {
    let promiseA1 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=1')
            .then(data => {   // либо сокращенно   .then(data => data.text()).then(data => {console.log('fetch запрос: ' + data);})
                resolve(data.text());
            });
    });
    let promiseB1 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=2&name=Dmitriy')
            .then(data => {   // либо сокращенно   .then(data => data.text()).then(data => {console.log('fetch запрос: ' + data);})
                resolve(data.text());
            });
    });
    Promise.all([promiseA1, promiseB1]).then(value => {
        document.querySelector('.outpromise1').innerHTML = value[0] + ' ' + value[1];
    });
};


//T2
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 3. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет сумму чисел.
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 4. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет случайное число в заданном диапазоне.
//Два запроса объедините с помощью promiseAll. Выведите в outpromise2 результат. Запускаться функция должна по нажатию buttpromise2.
document.querySelector('#buttpromise2').onclick = function () {
    let promiseA2 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=3&num1=50&num2=150')
            .then(data => {
                resolve(data.text());
            });
    });
    let promiseB2 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=4&num1=25&num2=75')
            .then(data => {
                resolve(data.text());
            });
    });
    Promise.all([promiseA2, promiseB2]).then(value => {
        document.querySelector('.outpromise2').innerHTML = value[0] + ' ' + value[1];
    });
};


//T3
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 5. Если все сделано верно, сервер вернет текущее время и дату. Не забывайте указывать параметр auth (ключ в чате).
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 6. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет большее число.
//Два запроса объедините с помощью promiseAll. Выведите в outpromise3 результат. Запускаться функция должна по нажатию buttpromise3.
document.querySelector('#buttpromise3').onclick = function () {
    let promiseA3 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=5')
            .then(data => {
                resolve(data.text());
            });
    });
    let promiseB3 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=6&num1=100&num2=1000')
            .then(data => {
                resolve(data.text());
            });
    });
    Promise.all([promiseA3, promiseB3]).then(value => {
        document.querySelector('.outpromise3').innerHTML = value[0] + ' ' + value[1];
    });
};


//T4
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 7. Если все сделано верно, сервер случайную ссылку на изображение. Не забывайте указывать параметр auth (ключ в чате).
//Отправьте GET запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 8. В качестве параметра по очереди укажите year равный году вашего рождения. Если все правильно сервер вернет ваш возраст.
//Выведите в outpromise4 результат. Запускаться функция должна по нажатию buttpromise4.
document.querySelector('#buttpromise4').onclick = function () {
    let promiseA4 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=7')
            .then(data => {
                resolve(data.text());
            });
    });
    let promiseB4 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php?auth=7859d9d42a8834141d529577207c9596&action=8&year=1993')
            .then(data => {
                resolve(data.text());
            });
    });
    Promise.all([promiseA4, promiseB4]).then(value => {
        document.querySelector('.outpromise4').innerHTML = value[0] + ' ' + value[1];
    });
};


//T5
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 1.
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 2.
//Два запроса объедините с помощью promiseAll. Результат выведите в outpromise5 результат. Запускаться функция должна по нажатию buttpromise5.

document.querySelector('#buttpromise5').onclick = function () {
    let promiseA5 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }, body: 'auth=7859d9d42a8834141d529577207c9596&action=1',
        })
            .then(response => {
                resolve(response.text());
            })
    });
    let promiseB5 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }, body: 'auth=7859d9d42a8834141d529577207c9596&action=2&name=Dmitriy',
        })
            .then(response => {
                resolve(response.text());
            })
    });
    Promise.all([promiseA5, promiseB5]).then(value => {
        document.querySelector('.outpromise5').innerHTML = value[0] + ' ' + value[1];
    })
};


//T6
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 3. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет сумму чисел.
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 4. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет случайное число в заданном диапазоне.
//Два запроса объедините с помощью promiseAll. Выведите в outpromise6 результат. Запускаться функция должна по нажатию buttpromise6.

document.querySelector('#buttpromise6').onclick = () => {
    let promiseA6 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }, body: 'auth=7859d9d42a8834141d529577207c9596&action=3&num1=39&num2=41',
        })
            .then(response => {
                resolve(response.text());
            })
    });
    let promiseB6 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }, body: 'auth=7859d9d42a8834141d529577207c9596&action=4&num1=18&num2=65',
        })
            .then(response => {
                resolve(response.text());
            })
    });
    Promise.all([promiseA6, promiseB6]).then(value => {
        document.querySelector('.outpromise6').innerHTML = value[0] + ' ' + value[1];
    })
};


//T7
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 5. Если все сделано верно, сервер вернет текущее время и дату. Не забывайте указывать параметр auth (ключ в чате).
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 6. Добавьте параметр num1 и num2 содержащие числа. Если все сделано верно, сервер вернет большее число.
//Два запроса объедините с помощью promiseAll. Выведите в outpromise7 результат. Запускаться функция должна по нажатию buttpromise7.

document.querySelector('#buttpromise7').onclick = () => {
    let promiseA7 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }, body: 'auth=7859d9d42a8834141d529577207c9596&action=5',
        })
            .then(response => {
                resolve(response.text());
            })
    });
    let promiseB7 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }, body: 'auth=7859d9d42a8834141d529577207c9596&action=6&num1=500&num2=200',
        })
            .then(response => {
                resolve(response.text());
            })
    })
    Promise.all([promiseA7, promiseB7]).then(value => {
        document.querySelector('.outpromise7').innerHTML = value[0] + ' ' + value[1];
    })
}


//T8
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 7. Если все сделано верно, сервер случайную ссылку на изображение. Не забывайте указывать параметр auth (ключ в чате).
//Отправьте POST запрос на сайт http://getpost.itgid.info/index2.php. В качестве action укажите 8. В качестве параметра по очереди укажите year равный году вашего рождения. Если все правильно сервер вернет ваш возраст.
//Два запроса объедините с помощью promiseAll. Выведите в outpromise8 результат. Запускаться функция должна по нажатию buttpromise8
document.querySelector('#buttpromise8').onclick = () => {
    let promiseA8 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }, body: 'auth=7859d9d42a8834141d529577207c9596&action=7',
        })
            .then(response => {
                resolve(response.text());
            })
    });
    let promiseB8 = new Promise((resolve, reject) => {
        fetch('https://getpost.itgid.info/index2.php', {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }, body: 'auth=7859d9d42a8834141d529577207c9596&action=8&year=1993',
        })
            .then(response => {
                resolve(response.text());
            });
    });
    Promise.all([promiseA8, promiseB8]).then(value => {
        document.querySelector('.outpromise8').innerHTML = value[0] + ' ' + value[1];
    });
};


//UNIT 28. ООП В ES6

// function myAlert(A_OOP, C_OOP, D_OOP) {
//     let B_OOP = `<p class="${C_OOP}">${A_OOP}</p>`;
//     document.querySelector(D_OOP).innerHTML = B_OOP;
// }
//
// myAlert('error', 'orangeTEST_OOP', '.testOOP');
// myAlert('error', 'redTEST_OOP', '.testOOP1');

class Alert {
    constructor(A_OOP, C_OOP, D_OOP) {
        this.message = A_OOP;
        this.cssClass = C_OOP;
        this.out = D_OOP;
    }

    showAlert() {
        document.querySelector(this.out).innerHTML = `<p class="${this.cssClass}">${this.message}</p>`;
    }

    myAlert() {
        alert(this.message);
    }
}

class Alert1 extends Alert {
    constructor(A_OOP, C_OOP, D_OOP, icon) {
        super(A_OOP, C_OOP, D_OOP);
        this.icon = icon;
    }

    showIconAlert() {
        document.querySelector(this.out).innerHTML = `<p class="${this.cssClass}"><span class="material-symbols-outlined">${this.icon}</span>${this.message}</p>`;
    }
}

// let myAlert1 = new Alert('My settings', 'redTEST_OOP', '.testOOP');
// console.log(myAlert1);
// myAlert1.showAlert();

// let myAlert2 = new Alert1('My settings', 'orangeTEST_OOP', '.testOOP', 'settings');
// myAlert2.showIconAlert();
// myAlert2.myAlert(this.message);


//Tasks
//в данном разделе дз выполнено в OOPclasses.js
function closureTwo() {
    let Aclosure = 0;                  // глобальная переменная
    return function () {
        Aclosure = Aclosure + 1;   //локальная переменная
        return Aclosure;
    }

}

//UNIT 29. ЗАМЫКАНИЯ
let Bclosure = closureTwo();
let Cclosure = closureTwo();
console.log(Bclosure);
console.log(Bclosure());
console.log(Bclosure());
console.log(Bclosure());
document.querySelector('#buttclosure1').onclick = () => {
    document.querySelector('.outclosure1').innerHTML = Bclosure();
}
console.log(Cclosure());
console.log(Cclosure());
console.log(Cclosure());
document.querySelector('#buttclosure2').onclick = () => {
    document.querySelector('.outclosure2').innerHTML = Cclosure();
}


//UNIT 30. РЕКУРСИЯ

let recA = 0;

function rec() {
    recA = recA + 2;
    console.log('рекурсия: ' + recA)
    if (recA > 99) {
        return recA;
    }
    rec();
};

rec()


let offsetMB = 0;
let offsetMBB = 0;
let isStarted = false;

// let MB = document.querySelector('.moovingblock');
let timeoutMove;
function moove() {
    isStarted = true;
    offsetMB += 5;
    document.querySelector('.moovingblock').style.left = offsetMB + 'px';
    if (offsetMB == 300) {
        return moovedown();
    }
    timeoutMove = setTimeout(moove, 50);
}

document.querySelector('#moovingbutt').onclick = () => {
    if (!isStarted) moove();
};

let timeoutMooveBack;

function moveback() {
    offsetMB -= 5;
    document.querySelector('.moovingblock').style.left = offsetMB + 'px';
    if (offsetMB == 0) {
        return movetop();
    }
    timeoutMooveBack = setTimeout(moveback, 50)
}

let timeoutMoveDown;

function moovedown() {
    offsetMBB += 5;
    document.querySelector('.moovingblock').style.top = offsetMBB + 'px';
    if (offsetMBB == 300) {
        return moveback();
    }
    timeoutMoveDown = setTimeout(moovedown, 50)
}

let timeoutMoveTop;

function movetop() {
    offsetMBB -= 5;
    document.querySelector('.moovingblock').style.top = offsetMBB + 'px';
    if (offsetMBB == 0) {
        return moove();
    }
    timeoutMoveTop = setTimeout(movetop, 50)
}

document.querySelector('#stopMoving').onclick = () => {
    clearTimeout(timeoutMove);
    clearTimeout(timeoutMoveTop);
    clearTimeout(timeoutMooveBack);
    clearTimeout(timeoutMoveDown);
    document.querySelector('.moovingblock').style.left = '0px';
    document.querySelector('.moovingblock').style.top = '0px';
    offsetMB = 0;
    offsetMBB = 0;
    isStarted = false;
};

const person = {
    name: "gavrik", age: 228, greet: function () {
        console.log('privet gavrik')
    }

}

//learnJSTasks
let promptLi = () => {
    let ul = document.createElement('ul');
    document.querySelector('.boxqwerty').append(ul);

    while (true) {
        let prompt1 = prompt('write here', '');

        if(!prompt1) {
            break;
        }

        let li = document.createElement('li');
        li.innerHTML = prompt1;
        ul.append(li);
    }
}

//promptLi();
