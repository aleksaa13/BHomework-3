// Type JavaScript here and click "Run Code" or press Ctrl + s
//console.log('Hello, world!');


/****************************************************************
                  WORKING WITH OBJECT LITERALS
****************************************************************/

/*** CHALLENGE 1 of 1 ***/

function makePerson(name, age) {
	let obj={};
  obj.name=name;
  obj.age=age;
  return obj;
}

const vicky = makePerson('Vicky', 24);


// /********* Uncomment these lines to test your work! *********/
//console.log(vicky.name); // -> Logs 'Vicky'
//console.log(vicky.age); // -> Logs 24





/****************************************************************
                       USING OBJECT.CREATE
****************************************************************/

/*** CHALLENGE 1 of 3 ***/

const personStore = {
	greet:function(){
   console.log("Hello"); 
  }
};

// /********* Uncomment this line to test your work! *********/
 //personStore.greet(); // -> Logs 'hello'



/*** CHALLENGE 2 of 3 ***/

function personFromPersonStore(name, age) {
	const person=Object.create(personStore);
  person.name=name;
  person.age=age;
return person;
}

const sandra = personFromPersonStore('Sandra', 26);


// /********* Uncomment these lines to test your work! *********/
// console.log(sandra.name); // -> Logs 'Sandra'
// console.log(sandra.age); //-> Logs 26
// sandra.greet(); //-> Logs 'hello'



/*** CHALLENGE 3 of 3 ***/

personStore.introduce=function(){
  console.log("Hi, my name is "+ this.name);
};

// sandra.introduce(); // -> Logs 'Hi, my name is Sandra'





/****************************************************************
                    USING THE 'NEW' KEYWORD
****************************************************************/

/*** CHALLENGE 1 of 3 ***/

function PersonConstructor() {
	this.greet = function () {
  console.log("hello")
}
}
// /********* Uncomment this line to test your work! *********/
const simon = new PersonConstructor;
// simon.greet(); // -> Logs 'hello'


/*** CHALLENGE 2 of 3 ***/

function personFromConstructor(name, age) {
	let person=new PersonConstructor();
  person.name=name;
  person.age=age;
  return person;
}

const mike = personFromConstructor('Mike', 30);


// /********* Uncomment these lines to test your work! *********/
// console.log(mike.name); // -> Logs 'Mike'
// console.log(mike.age); //-> Logs 30
// mike.greet(); //-> Logs 'hello'



/*** CHALLENGE 3 of 3 ***/
PersonConstructor.prototype.introduce = function() {
  console.log("Hi, my name is " + this.name);
};


// mike.introduce(); // -> Logs 'Hi, my name is Mike'


/****************************************************************
                        USING ES6 CLASSES
****************************************************************/

/*** CHALLENGE 1 of 3 ***/

class PersonClass {
	
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log("hello");
  }

}

// /********* Uncomment this line to test your work! *********/
const george = new PersonClass;
// george.greet(); // -> Logs 'hello'



/*** CHALLENGE 2 of 3 ***/
class DeveloperClass extends PersonClass {
  constructor(name) {
    super(name);
  }
  greet() {
    console.log("hello");
  }
introduce(){
  console.log("Hellow world, my name is "+this.name);
}
}


// /********* Uncomment these lines to test your work! *********/
 const thai = new DeveloperClass('Thai', 32);
// console.log(thai.name); // -> Logs 'Thai'
// thai.introduce(); //-> Logs 'Hello World, my name is Thai'



/****************************************************************
                      EXTENSION: SUBCLASSING
****************************************************************/

const userFunctionStore = {
  sayType: function() {
    console.log("I am a " + this.type);
  }
}

function userFactory(name, score) {
  let user = Object.create(userFunctionStore);
  user.type = "User";
  user.name = name;
  user.score = score;
  return user;
}

 const adminFunctionStore=Object.create(userFunctionStore);
function adminFactory(name, score) {
  const admin = userFactory(name, score)
  Object.setPrototypeOf(admin, adminFunctionStore)
  admin.type = "Admin"
  
  return admin
}

adminFunctionStore.sharePublicMessage = function () {
  return console.log("Welcome users!")
}

const adminFromFactory = adminFactory("Eva", 5);
const userFromFactory = userFactory("John", 4);


// /********* Uncomment these lines to test your work! *********/
// adminFromFactory.sayType() // -> Logs "I am a Admin"
// adminFromFactory.sharePublicMessage() // -> Logs "Welcome users!"


/****************************************************************
EXTENSION: MIXINS
****************************************************************/

class Dog {
  constructor() {
    this.legs = 4;
  }
  speak() {
    console.log('Woof!');
  }
}

const robotMixin = {
  skin: 'metal',
  speak: function() { console.log(`I have ${this.legs} legs and am made of ${this.skin}`) },
}

let robotFido = new Dog();
robotFido=Object.assign(robotFido, robotMixin);

// robotFido = /* Put code here to give Fido robot skills */;

// /********* Uncomment to test your work! *********/
//robotFido.speak() // -> Logs "I am made of metal"

