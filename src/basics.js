if (1==2){
    console.log("hi")
}else{
    console.log("hey")
}

var testVar = "hey"
const FIRST = 3
const SECOND = 4
const THIRD = 10

console.log(testVar.length)

switch (testVar.length) {
    case FIRST:
        console.log("it's the first option!")
        break
    case SECOND:
        console.log("it's the second option...")
        break
    case THIRD:
        console.log("it's the third option!")
        break
    default:
        console.log("bad news- it isn't any of them")
}

// classic for loop
for(var i = 0; i < 10; i++){
    console.log(i)
}

var items = ["one", "asjdasd", "cow", "fish"]

function echo(item){
    console.log(`you said ${item}`)
}

items.forEach(echo)