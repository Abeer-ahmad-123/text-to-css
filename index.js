document.addEventListener('paste', function (e) {
  let total = [];
  let uniqueArray = [];
  let fontSizeUniqueArray = [];
  let backgroundColorUniqueArray = [];
  let fontFamilyUniqueArray = [];
  emptyDiv();
  ['text/plain', 'text/html'].forEach((format) => {
    total.push(e.clipboardData.getData(format));

    const input = e.clipboardData.getData(format);
    function extractSubstr(str, regexp) {
      return (
        str
          .replace(/[^\w\s]|_/g, '')
          .replace(/\s+/g, ' ')
          .toLowerCase()
          .match(regexp) || []
      );
    }
    function getWordsByNonWhiteSpace(str) {
      return extractSubstr(str, /\S+/g);
    }
    var word = getWordsByNonWhiteSpace(total[0]);

    document.getElementById('wordCount').innerHTML =
      'Word Count: ' + word.length;

    let styleSubStr = 'style="';
    let styleEndStr = '">';
    let styleStartIndexes = [];
    let styleEndIndexes = [];
    let styleArray2 = [];
    let i = 0;
    let colorArray = [];
    let fontSizeArray = [];
    let backgroundArray = [];
    let fontFamilyArray = [];

    // to get start and end index of style
    gettingStartAndEndIndexes(
      i,
      input,
      styleStartIndexes,
      styleEndIndexes,
      styleSubStr,
      styleEndStr
    );

    var newArray = styleStartIndexes.map(function (value, index) {
      return styleStartIndexes[index] + ',' + styleEndIndexes[index];
    });

    //adding data to the respective array
    addDatatoArray(
      styleArray2,
      newArray,
      input,
      colorArray,
      fontSizeArray,
      backgroundArray,
      fontFamilyArray
    );
    uniqueArray = [...new Set(colorArray)];
    fontSizeUniqueArray = [...new Set(fontSizeArray)];
    backgroundColorUniqueArray = [...new Set(backgroundArray)];
    fontFamilyUniqueArray = [...new Set(fontFamilyArray)];

    document.getElementById('background').innerHTML = 'Background Color: ';
    if (backgroundColorUniqueArray.length === 0) {
      arrayIsEmpty('No Background Color Found', 'backgroundColor');
    } else {
      for (let a = 0; a < backgroundColorUniqueArray.length; a++) {
        // Create an "li" node of data in array:
        const node = document.createElement('li');
        const NameNode = document.createElement('li');
        const textnode = document.createTextNode(
          backgroundColorUniqueArray[a].includes('rgb')
            ? backgroundColorUniqueArray[a] + ')'
            : backgroundColorUniqueArray[a]
        );
        // Append the text node to the "li" node:
        NameNode.style.listStyle = 'none';
        NameNode.style.marginRight = '5px';
        NameNode.style.marginLeft = '5px';

        NameNode.appendChild(textnode);

        node.style.listStyle = 'none';
        node.style.background = backgroundColorUniqueArray[a];
        node.style.listStyle = 'none';
        node.style.width = '20px';
        node.style.height = '20px';
        node.style.borderRadius = '30%';
        node.style.border = '1.5px solid black';

        //if there is text in div no background color found then replacing it with the text in array
        replaceInnerText(
          'No Background Color Found',
          'backgroundColor',
          NameNode,
          node
        );
      }
    }

    document.getElementById('font').innerHTML = 'Font Size: ';

    if (fontSizeUniqueArray.length === 0) {
      arrayIsEmpty('No Font Size Found', 'fontSize');
    } else {
      for (let a = 0; a < fontSizeUniqueArray.length; a++) {
        // Create an "li" node:
        const node = document.createElement('li');
        const textnode = document.createTextNode(fontSizeUniqueArray[a]);
        // Append the text node to the "li" node:
        node.appendChild(textnode);
        const NameNode = document.createElement('li');
        const textnode2 = document.createTextNode('');
        // Append the text node to the "li" node:
        NameNode.style.listStyle = 'none';
        NameNode.appendChild(textnode2);
        node.style.listStyle = 'none';
        node.style.marginRight = '10px';
        replaceInnerText('No Font Size Found', 'fontSize', NameNode, node);
      }
    }
    document.getElementById('fontFamilyName').innerHTML = 'Font Family: ';
    if (fontFamilyUniqueArray.length === 0) {
      arrayIsEmpty('No Font Family Found', 'fontFamily');
    } else {
      for (let a = 0; a < fontFamilyUniqueArray.length; a++) {
        // Create an "li" node:

        const node = document.createElement('li');
        const textnode = document.createTextNode(fontFamilyUniqueArray[a]);
        const NameNode = document.createElement('li');
        const textnode2 = document.createTextNode('');
        // Append the text node to the "li" node:
        NameNode.style.listStyle = 'none';
        NameNode.appendChild(textnode2);
        // Append the text node to the "li" node:
        node.appendChild(textnode);
        node.style.listStyle = 'none';
        replaceInnerText('No Font Family Found', 'fontFamily', NameNode, node);
      }
    }
    document.getElementById('colorName').innerHTML = 'Colors: ';
    if (uniqueArray.length === 0) {
      arrayIsEmpty('No Colors Found', 'color');
    } else {
      for (let a = 0; a < uniqueArray.length; a++) {
        // Create an "li" node:
        const node = document.createElement('li');
        const NameNode = document.createElement('li');
        const textnode = document.createTextNode(
          uniqueArray[a].includes('rgb') ? uniqueArray[a] + ')' : uniqueArray[a]
        );
        // Append the text node to the "li" node:
        NameNode.style.listStyle = 'none';
        NameNode.style.marginRight = '5px';
        NameNode.appendChild(textnode);
        node.style.background = uniqueArray[a];
        node.style.marginRight = '10px';
        node.style.listStyle = 'none';
        node.style.width = '20px';
        node.style.height = '20px';
        node.style.borderRadius = '30%';
        node.style.border = '1.5px solid black';

        replaceInnerText('No Colors Found', 'color', NameNode, node);
      }
    }
  });
});
function emptyDiv() {
  document.getElementById('wordCount').innerHTML = 'Word Count Here';
  document.getElementById('colorName').innerHTML = '';
  document.getElementById('color').innerHTML = '';
  document.getElementById('font').innerHTML = '';
  document.getElementById('fontSize').innerHTML = '';
  document.getElementById('background').innerHTML = '';
  document.getElementById('backgroundColor').innerHTML = '';
  document.getElementById('fontFamilyName').innerHTML = '';
  document.getElementById('fontFamily').innerHTML = '';
}
function gettingStartAndEndIndexes(
  i,
  input,
  styleStartIndexes,
  styleEndIndexes,
  styleSubStr,
  styleEndStr
) {
  //getting start and end indexes of style
  while (i < input.length) {
    let index = input.indexOf(styleSubStr, i);
    let endIndex = input.indexOf(styleEndStr, i);
    if (index === -1) break;
    if (endIndex === -1) break;
    styleStartIndexes.push(index + 7);
    styleEndIndexes.push(endIndex);
    i = index + styleSubStr.length;
    i = endIndex + styleSubStr.length;
  }
}
function replaceInnerText(text, id, NameNode, node) {
  //if div has no ** found text in it then replacing it and then adding elements from array
  if (document.getElementById(id).innerText === text) {
    document.getElementById(id).innerText = '';
    if (NameNode) {
      document.getElementById(id).appendChild(NameNode);
    }
    document.getElementById(id).appendChild(node);
  } else {
    if (NameNode) {
      document.getElementById(id).appendChild(NameNode);
    }

    document.getElementById(id).appendChild(node);
  }
}
function arrayIsEmpty(text, id) {
  //adding text no ** found of array is empty
  // Create an "li" node:

  if (document.getElementById(id).innerText === text) {
    document.getElementById(id).innerText = '';
    const node = document.createElement('li');
    const textnode = document.createTextNode(text);
    // Append the text node to the "li" node:
    node.appendChild(textnode);
    node.style.listStyle = 'none';

    document.getElementById(id).appendChild(node);
  } else {
    const node = document.createElement('li');
    const textnode = document.createTextNode(text);
    // Append the text node to the "li" node:
    node.appendChild(textnode);
    node.style.listStyle = 'none';

    document.getElementById(id).appendChild(node);
  }
}
function addDatatoArray(
  styleArray2,
  newArray,
  input,
  colorArray,
  fontSizeArray,
  backgroundArray,
  fontFamilyArray
) {
  //adding respective data into array's
  for (var k = 0; k < newArray.length; k++) {
    const val = newArray[k].split(',');
    styleArray2 = input.substring(val[0], val[1]);
    let replaceQuot = styleArray2.replaceAll('&quot;', '');
    let replaceMonoQuot = replaceQuot.replaceAll('Mono&quot;', '');
    let replaceVar = replaceMonoQuot.replaceAll('var(--', '');
    let replaceAllBrackets = replaceVar.replaceAll(')', '');
    let replaceHeaderColor = replaceAllBrackets.replaceAll('header-color,', '');
    let removeSpaces = replaceHeaderColor.replaceAll(' ', '');
    const mapVal = removeSpaces.split(';');
    let regex = /^([a-zA-Z]+)(?:-([a-zA-Z]+))+$/;
    for (var j = 0; j < mapVal.length; j++) {
      if (mapVal[j].includes('color')) {
        if (
          (mapVal[j].split(':')[0].match(regex) === null &&
            mapVal[j].split(':')[1].match(regex) === null) ||
          (mapVal[j].split(':')[0].match(regex) === null &&
            mapVal[j].split(':')[1].match(regex) !== null)
        ) {
          colorArray.push(mapVal[j].split(':')[1]);
        }
      }
      if (mapVal[j].includes('font-size')) {
        if (
          mapVal[j].includes('px') ||
          mapVal[j].includes('rem') ||
          mapVal[j].includes('vh')
        ) {
          fontSizeArray.push(mapVal[j].split(':')[1]);
        }
      }

      if (mapVal[j].includes('background-color')) {
        backgroundArray.push(mapVal[j].split(':')[1]);
      }

      if (mapVal[j].includes('font-family')) {
        fontFamilyArray.push(mapVal[j].split(':')[1]);
      }
    }
  }
}
