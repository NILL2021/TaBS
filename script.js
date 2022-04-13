var tokens = ["print"];
var codeEditor = "<textarea name='editor' class='editor' id='editor' >"
var spriteEditor = '<div class="spr">  <input type="file" id="photo" name="photo" accept="image/*">  <img src="" id="img"><button id="add">Add</button></div></div>'
var code = "print \"Hello World\"";
var current = "code"
var rands = ['print "Hello there (woo woo)"', 'print "Wazzup Beijing"', 'print "Me When Shrek"'];
        function lex(what) {
            var cc = "";
            var full = "";
            var result = []
            var inString = false;
            // iterate over the string
            for (char in what) {
                cc = what[char];
                
                // if the character is not a space, tab or newline
                // and we are not in a string
                if (inString == false) {
                if (cc != " " && cc != "\t" && cc != "\n") {
                        full = full + cc;
                }
                } else {
                    full = full + cc;
                }
                
                if (cc == "\"") {
                    if (inString == false) {
                        inString = true;
                    } else {
                        inString = false;
                        result.push(full.replace("\"", ""));
                    }
                    full = "";
                }
                for(token in tokens) {
                    if (inString == false) {
                        if(full == tokens[token]) {
                            result.push(full);
                            full = ""
                        }
                    } 
                }
            }
            console.log(result);
            return result;
        }
        function print(what) {
            console.log(what);
            document.getElementById("output").innerHTML = document.getElementById("output").innerHTML + what + "<br>";
        }
        function parse(what) {
            var awaitingArgs = false;
            //console.log(what);
            var args = [];
            var argsExpected = 0;
            var argsFor = "";
            var i = 0;
            var argsCount = 0
            for(token in what) {
                if(what[token] == "print") {
                    awaitingArgs = true;
                    argsExpected = 0;
                    argsFor = what[token];
                } else {
                        if(awaitingArgs == true) {
                            args.push(what[token]);
                            if (argsCount == argsExpected) {
                                if (argsFor == "print") {
                                    for (arg in args) {
                                        print(args[arg]);
                                    }
                                }
                                argsCount = 0
                                awaitingArgs = false;
                                args = [];
                        }
                            argsCount = argsCount + 1;
                    }
                }
            }
        }
        document.getElementById("runner").onclick = function() {
            var input = document.getElementById("editor").value;
            var tokens = lex(input);
            parse(tokens);
        }
        document.getElementById("clear").onclick = function() {
            document.getElementById("output").innerHTML = "OUTPUT<br>";
        }
        document.getElementById("rand").onclick = function() {
            var rand = Math.floor(Math.random() * rands.length);
            document.getElementById("editor").value = rands[rand];
        }
        document.getElementById("code").onclick = function() {
            current = "code"
            document.getElementById("code").style.backgroundColor = "#d9b422";
            document.getElementById("sprites").style.backgroundColor = "#989898";
            document.getElementById("does").innerHTML = codeEditor + code + "</textarea>";
        }
        document.getElementById("sprites").onclick = function() {
            current = "sprite"
            document.getElementById("sprites").style.backgroundColor = "#d9b422";
            document.getElementById("code").style.backgroundColor = "#989898";
            code = document.getElementById("editor").value;
            document.getElementById("does").innerHTML = spriteEditor;
        }
        document.getElementById("add").onclick = function() {
            print("Coming soon!");
        }