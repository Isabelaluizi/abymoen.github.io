//
// this is just a stub for a function you need to implement
//

var words = [];
var lines = [];
var noDups = [];

function getStats(txt) {
    fillWords(txt);
    fillLines(txt);
    removeDups();
    return {
        nChars: getCharacters(txt),
        nWords: getWords(),
        nLines: getLines(),
        nonEmptyLines: getNonEmptyLines(),
        maxLineLength: maxLineLength(),
        averageWordLength: averageWordLength(),
        palindromes: getPalidromes(),
        longestWords: longestWords(txt),
        mostFrequentWords: mostFrequentWords(txt)
    };
}

function getCharacters(txt) {
    return txt.length;
}

function getWords() {
    return words.length;
}

function getLines() {
    return lines.length;
}

function getNonEmptyLines() {
    var count = 0;
    for(var i=0; i<lines.length; i++) {
        if(!(isOnlyWhite(lines[i]))) {
            count++;
        }
    }
    return count;
}

function averageWordLength() {
    if(words.length === 0) {
        return 0;
    }
    var total = 0;
    for(var i=0; i<words.length; i++) {
        total+=words[i].length;
    }
    return total/words.length;
}

function maxLineLength() {
    var max = 0;
    for(var i=0; i<lines.length; i++) {
        if(lines[i].length > max) {
            max = lines[i].length;
        }
    }
    return max;
}

function getPalidromes() { 
    var arry = [];
    for(var i=0; i<noDups.length; i++) {
        if(isPalindrome(noDups[i]) && noDups[i].length > 1) {
            arry.push(noDups[i]);
        } 
    }
    return arry;
}

function longestWords() {
    var map = createLengthMap();
    var longWords = [];
    var tempStr = [];
    var lim = (noDups.length > 10) ? 10 : noDups.length;
    var max = 0;
    for(var i=0; i<lim; i++) {
        max = 0;
        tempStr = [];
        for(var j=0; j<noDups.length; j++) {
            if(map.get(noDups[j]) > max) {
                max = map.get(noDups[j]);
                tempStr = [];
                tempStr.push(noDups[j]);
            }else if(map.get(noDups[j]) === max) {
                tempStr.push(noDups[j]);
            }
        }
        tempStr.sort();
        for(var n=0; n<tempStr.length; n++) {
            longWords.push(tempStr[n]);
            map.delete(tempStr[n]);
        }
    }
    return createLongArray(longWords);
}

function mostFrequentWords(txt) {
    var map = createFrequencyMap();
    var counterMap = new Map();
    var freqWords = [];
    var tempStr = [];
    var lim = (noDups.length > 10) ? 10 : noDups.length;
    var max = 0;
    for(var i=0; i<lim; i++) {
        max = 0;
        tempStr = [];
        for(var j=0; j<noDups.length; j++) {
            if(map.get(noDups[j]) > max) {
                max = map.get(noDups[j]);
                tempStr = [];
                tempStr.push(noDups[j]);
            }else if(map.get(noDups[j]) === max) {
                tempStr.push(noDups[j]);
            }
        }
        tempStr.sort();
        for(var n=0; n<tempStr.length; n++) {
            freqWords.push(tempStr[n]);
            counterMap.set(tempStr[n], map.get(tempStr[n]));
            map.delete(tempStr[n]);
        }
    }
    return createFreqArray(freqWords, counterMap);
}

function createFreqArray(freqWords, counterMap) {
    var tempArry = [];
	var lim = (freqWords.length > 10) ? 10 : freqWords.length;
	for(var i=0; i<lim; i++) {
		tempArry[i] = freqWords[i];
		tempArry[i] += "(";
		tempArry[i] += counterMap.get(freqWords[i]);
		tempArry[i] += ")";
	}
	return tempArry;
}

function createFrequencyMap() {
    var temp = new Map();
    for(var i=0; i<words.length; i++) {
        if(!temp.has(words[i])) {
            temp.set(words[i], 1);
        } else {
            temp.set(words[i], (temp.get(words[i]) + 1));
        }
    }
    return temp;
}

function createLongArray(longWords) {
    var tempArry = [];
	var lim = (longWords.length > 10) ? 10 : longWords.length;
	for(var i=0; i<lim; i++) {
		tempArry[i] = longWords[i];
	}
	return tempArry;
}

function fillWords(txt) {
    var str = "";
    words = [];
    var count = 0;
    while (count < txt.length) {
        while(isNotSeperator(txt.charAt(count)) && count < txt.length) {
            str = str.concat(txt.charAt(count));
            count++;
        }
        if(str != "") {
            words.push(str.toLowerCase());
        }
        str = "";
        count++;
    }
}

function fillLines(txt) {
    var str = "";
    lines = [];
    var count = 0;
    while (count < txt.length) {
        while(isNotNewline(txt.charAt(count)) && count < txt.length) {
            str = str.concat(txt.charAt(count));
            count++;
        }
        lines.push(str.toLowerCase());
        str = "";
        count++;
    }
    if(txt.charAt(txt.length-1) == "\n") {
        lines.push("");
    }
}

function isNotNewline(txt) {
    if(txt == "\n") {
        return false;
    }
    return true;
}
          
function isNotSeperator(txt) {
    if(txt == "\n" || txt == "\t" || txt == "\v" || txt == "\f" || txt == " " || txt == "." || txt == "," || txt == "-" || txt == "!" || txt == "?" || txt == "@" || txt == "#" || txt == "+" || txt == ":" || txt == ")" || txt == "(" || txt == "/" || txt == "\\" || txt == '"' || txt == "'") {
        return false;
    }
    return true;
}

function isOnlyWhite(txt) {
    for(var j=0; j<txt.length; j++) {
        if(txt.charAt(j) == "\n" || txt.charAt(j) == " " || txt.charAt(j) == "\t") {
            continue;
        } else {
            return false;
        }
    }
    return true;
}

function isPalindrome(txt) {
    if(txt.length % 2 === 0) {
        return isEvenPalindrome(txt);
    } else {
        return isOddPalindrome(txt);
    }
}

function isEvenPalindrome(txt) {
    var backCount = txt.length -1;
    var frontCount = 0;
    while(frontCount < txt.length/2) {
        if(txt.charAt(backCount) != txt.charAt(frontCount)) {
            return false;
        }
        frontCount++;
        backCount--;
    }
    return true;
}

function isOddPalindrome(txt) {
    var backCount = txt.length -1;
    var frontCount = 0;
    while(frontCount < backCount) {
        if(txt.charAt(backCount) != txt.charAt(frontCount)) {
            return false;
        }
        frontCount++;
        backCount--;
    }
    return true;
}

function removeDups() {
    noDups = [];
    var set = new Set();
    for(var i=0; i<words.length; i++) {
        if(!set.has(words[i])) {
            noDups.push(words[i]);
            set.add(words[i]);
        }
    }
}

function createLengthMap() {
    var temp = new Map();
    for(var i=0; i<noDups.length; i++) {
        temp.set(noDups[i], noDups[i].length);
    }
    return temp;
}

