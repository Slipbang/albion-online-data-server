import printMyName from './moduleOne.mjs'

printMyName(); // --> Dmitry

import {
    someSum,
    one,
    two
} from './moduleOne.mjs'

console.log(someSum(5,5));
console.log(someSum(1,1));
console.log(someSum(55,55));
console.log(someSum(5,10));
console.log(one);
console.log(two);

// напечатать в консоли: node moduleTwo.mjs