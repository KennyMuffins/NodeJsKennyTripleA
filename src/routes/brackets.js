let express = require('express')
let router = express.Router()

// QueryString
router.get('/brackets', (req,res) => {
    // if (req.query.name){
    //     res.send(`You have requested a person, ${req.query.name}`)
    // } else {
    //     res.send('You have requested a person')
    // }

    const brackets = "()(){(())";
    //Set true by default, if false, break out of loop
    var output = true;

    for (var i = 0; i < brackets.length; i++) {
        var c = brackets.charAt(i);
        switch (c) {
            case '(':
                var positionOfEndBracket1 = brackets.indexOf(")");
                if (positionOfEndBracket1 == -1) {
                    output = false;
                } else {
                    var positionOfStartBracket1 = i;
                    if (positionOfEndBracket1 < positionOfStartBracket1) {
                        output = false;
                    }
                }
            break;
            case '[':
                var positionOfEndBracket2 = brackets.indexOf("]");
                if (positionOfEndBracket2 == -1) {
                    output = false;
                } else {
                    var positionOfStartBracket2 = i;
                    if (positionOfEndBracket2 < positionOfStartBracket2) {
                        output = false;
                    }
                }
            break;
            case '{':
                var positionOfEndBracket3 = brackets.indexOf("}");
                if (positionOfEndBracket3 == -1) {
                    output = false;
                } else {
                    var positionOfStartBracket3 = i;
                    if (positionOfEndBracket3 < positionOfStartBracket3) {
                        output = false;
                    }
                }
            break;
        }
        if (!output) {
            break;
        }
      }

      res.send(`Input:, ${brackets}   Output:, ${output}`)
})

// Params property on the request object
router.get('/brackets/:bracketstring', (req,res) => {
   // res.send(`You have requested a person, ${req.params.name}`)


    //const brackets = "([{}])();

    const brackets = req.params.bracketstring;

    //false
    //const brackets = "'([{)]}";
    //Set true by default, if false, break out of loop
    var output = true;

    var stack = [];

    for (var i = 0; i < brackets.length; i++) {
        var c = brackets.charAt(i);

        //Only put into stack if is opening bracket
        if (c == '(' || c == '[' || c == '{') {
            stack.push(c);
        }

        //If Empty Stack, meaning no opening bracket at top of stack, so break, no point checking anymore
        if (stack.length == 0) {
            break;
        }

        switch (c) {
            case ')': 
                //Get top most of stack
                var checkOpeningCurveBracket = stack.pop();
                if (checkOpeningCurveBracket == '{' || checkOpeningCurveBracket == '[') {
                    output = false;
                }
                break;
            case '}': 
                //Get top most of stack
                var checkOpeningCurlyBracket = stack.pop();
                if (checkOpeningCurlyBracket != '{') {
                    output = false;
                }
                break;
            case ']': 
                //Get top most of stack
                var checkOpeningRectBracket = stack.pop();
                if (checkOpeningRectBracket != '[') {
                    output = false;
                }
                break;
        }

        //If any scenario results in output being set to false, meaning entire string is invalid
        if (!output) {
            break;
        }
    }

    if (stack.length > 0) {
        output = false;
    }

    res.send(`Input:, ${brackets}   Output:, ${output},    Stack: ${stack}`)
})


router.get('/error', (req, res) => {
    throw new Error("This is a forced thrown error")
})

module.exports = router