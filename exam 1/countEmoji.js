const text = '<@Kate />:apple: <@Max/><@alisa /> :like: received:apple::apple:';
const text1 = '<@Kate />:apple: <@Max/>:like:<@alisa /> :like: received:apple::apple:';
const text2 = '<@Kate />:apple: <@Max/>:apple: :APPLE: :AppLe:<@alisa /> :like: received:apple::apple:';
const text3 = '<@Kate />:apple: <@Max/>:apple APPLE: AppLe:<@alisa /> :like: received:apple::apple:';
const text4 = '<@Kate />:apple: <@Max/>:like:<@alisa /> :like: received:apple::apple: <@kate / > alsdaksdjhsa <@KATE / > :apple: :apple:'; // is here should be {kate: 3, max: 2, alisa: 2}?
const text5 = '<@Kate />:apple: <@Max/><@olia/><@misha/><@dasha/><@alisa /> :like: received:apple::apple:  <@dima/><@vasia/><@gena/><@ihor/><@tolik />';
const text6 = ':apple: :apple: <@Kate />:apple: <@Max/><@alisa /> :like: received:apple::apple: ';

const result = countEmoji(text6, 'apple');
console.log(Object.keys(result).map(key => {
  return `${key }: ${result[key]}`;
}).join(', '));

function checkAndConvertToLC(char) {
  if (char.charCodeAt(0) <= 90 && char.charCodeAt(0) >= 65) {
    return String.fromCharCode(char.charCodeAt(0) + 32)
  }
  return char;
}

function countEmoji(message, emoji) {

  const result = {};
  const currentNames = [];
  let isNameInProgress = false;
  let currentName = '';
  let isEmojiInProgress = false;
  let currentEmoji = '';

  for (let i = 0; i < message.length; i++) {
    
    if (message[i].charCodeAt(0) === 60 && message[i + 1].charCodeAt(0) === 64) {
      isNameInProgress = true;
      isEmojiInProgress = false;
      currentEmoji = "";
      currentName = "";

      if (result[currentNames[currentNames.length - 1]]) {
        currentNames.forEach((name, i) => delete currentNames[i]);
      }
      continue;
    }

    if (isNameInProgress) {
      if (message[i].charCodeAt(0) === 64 || message[i].charCodeAt(0) === 47 || message[i].charCodeAt(0) === 32) { // @ /
        continue;
      }

      if (message[i].charCodeAt(0) === 62) { // >
        currentNames.push(currentName);
        isNameInProgress = false;
        currentName = "";
        continue;
      }

      currentName += checkAndConvertToLC(message[i]);
      continue;
    }

    if (!isNameInProgress && !isEmojiInProgress && message[i].charCodeAt(0) === 58) { // :
      isEmojiInProgress = true;
      continue;
    }

    if (isEmojiInProgress && message[i].charCodeAt(0) === 58) { // :
      isEmojiInProgress = false;
      if (currentEmoji === emoji && currentNames[currentNames.length - 1]) {
        currentNames.forEach(name => {
          result[name] ??= 0;
          result[name] += 1;
        });
      }
      currentEmoji = "";
      continue;
    }

    if (isEmojiInProgress) {
      currentEmoji += checkAndConvertToLC(message[i]);
    }
  }

  if (currentNames[currentNames.length - 1]) {
    currentNames.forEach(name => result[name] ??= 0);
  }

  return result;
}

// console.log(countEmoji(text1, 'apple'))

// console.log(String.fromCharCode("A".charCodeAt(0) + 32))
// console.log('A'.charCodeAt(0));
// console.log(String.fromCharCode(64))

// expected result
// {
// kate: 1,
// max: 2,
// alisa: 2
// }
