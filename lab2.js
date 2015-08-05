'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington. */

function Blob() {
  this.rate = 0;
}

var blob = new Blob();

var dowingtonPopulation = 1000;
var hours = 0;

function eatDowington() {
  while (dowingtonPopulation > 0) {
    hours++;
    blob.rate++;
    dowingtonPopulation -= blob.rate;
  }
  return hours;
}

var hoursSpentInDowington; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)
hoursSpentInDowington = eatDowington();

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

function hoursToOoze(population, peoplePerHour) {
  // TODO: implement me based on the instructions above.
  // Be sure to then assign me to the Blob's prototype.
  hours = 0;
  while (population > 0) {
    hours++;
    population -= peoplePerHour;
    peoplePerHour++;
  }
  return hours;
}

Blob.prototype.hoursToOoze = hoursToOoze;

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.
assert(blob.hoursToOoze(1, 1) === 1, 'A population of 1 will be gone in an hour.');
assert(blob.hoursToOoze(3, 3) === 1, 'All 3 will be gone in an hour if rate starts at 3.');
assert(blob.hoursToOoze(6, 1) === 3, 'A small town of 6 will be gone in three hours.');
//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing(homePlanet, spokenLanguage) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.homePlanet = homePlanet;
  this.spokenLanguage = spokenLanguage;
}

// sb is a SentientBeing object
function sayHello(sb) {
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating
  console.log(hello[this.spokenLanguage]);
  return hello[sb.spokenLanguage];
    //TODO: put this on the SentientBeing prototype
}

SentientBeing.prototype.sayHello = sayHello;

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

function Klingon() {}
Klingon.prototype = new SentientBeing('Qo\'nos', 'klingon');

function Human() {}
Human.prototype = new SentientBeing('Earth', 'federation standard');

function Romulan() {}
Romulan.prototype = new SentientBeing('Romulus', 'romulan');

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.
assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the Romulan should hear Jolan\'tru');
assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the Human should hear hello');
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the Romulan should hear Jolan\'tru');
assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the Human should hear hello');
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
    if (a.charAt(a.length - 1) > b.charAt(b.length - 1)) {
      return 1;
    }
    if (a.charAt(a.length - 1) > b.charAt(b.length - 1)) {
      return -1;
    }
    return 0;
  }
  stringArray.sort(byLastLetter);
  return stringArray;
}

var greetings = ['howdy', 'hello', 'hiya', 'hi'];
assert(lastLetterSort(greetings)[0] === 'hiya', 'The array isn\'t sorting by last letter.');
assert(lastLetterSort(['earth', 'fire', 'wind', 'water', 'heart']).join() === ['wind', 'fire', 'earth', 'water', 'heart'].join(), 'These planeteers have not been sorted by their last letter.');

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  numberArray.forEach(function(n) {
    sum += n;
  });
  return sum;
}

assert(sumArray([1, 2, 3, 4, 5]) === 15, 'These values should add up to 15.');
assert(sumArray([5, 10, 15, 20, 25]) === 75, 'These values should add up to 75');

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    return (sumArray(a) - sumArray(b));
  });
  return arrayOfArrays;
}

var singleDigitArray = [[1, 8, 3], [1, 4, 5], [1, 2, 4], [1, 2], [1]];
assert(sumSort(singleDigitArray).join() === '1,1,2,1,2,4,1,4,5,1,8,3', 'The arrays aren\'t sorting by their sums.');

var tripleDigitArray = [[900, 100, 400], [100, 500, 700], [300], [400, 200]];
assert(sumSort(tripleDigitArray).join() === '300,400,200,100,500,700,900,100,400', 'These triple digit arrays aren\'t sorting by their sums.');
//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
