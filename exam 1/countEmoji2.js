const text0 = '<@Kate />:apple: <@Max/><@alisa /> :like: received:apple::apple:';
const text1 = '<@Kate />:apple: <@Max/>:like:<@alisa /> :like: received:apple::apple:';
const text2 = '<@Kate />:apple: <@Max/>:apple: :APPLE: :AppLe:<@alisa /> :like: received:apple::apple:';
const text3 = '<@Kate />:apple: <@Max/>:apple APPLE: AppLe:<@alisa /> :like: received:apple::apple:';
const text4 = '<@Kate />:apple: <@Max/>:like:<@alisa /> :like: received:apple::apple: <@kate / > alsdaksdjhsa <@KATE / > :apple: :apple:'; // is here should be {kate: 3, max: 2, alisa: 2}?
const text5 = '<@Kate />:apple: <@Max/><@olia/><@misha/><@dasha/><@alisa /> :like: received:apple::apple:  <@dima/><@vasia/><@gena/><@ihor/><@tolik />';
const text6 = ':apple: :apple: <@Kate />:apple: <@Max/><@alisa /> :like: received:apple::apple: ';
const custom  = '<@Max/>:apple: :APPLE: :AppLe:<@alisa /> :like: received:apple::apple:';

const result = countEmoji(text4, 'apple');
// console.log(result);
console.log(Object.keys(result).map(key => {
  return `${key }: ${result[key]}`;
}).join(', '));

function countEmoji(text, emoji) {
  const constantsCodes = {
    colon: ':'.charCodeAt(0),
    angleBracketsO: '<'.charCodeAt(0),
    angleBracketsC: '>'.charCodeAt(0),
    atSign: '@'.charCodeAt(0),
    slash: '/'.charCodeAt(0),
    space: ' '.charCodeAt(0),
  }
  const result = {};

  let isNameInProgress = false;
  let isEmojiInProgress = false;
  let isEmojiWasWritten = false;
  let currentEmojiIndex = emoji.length - 1;
  let emojiCounter = 0;
  let currentName = '';

  for (let i = text.length - 1; i >= 0; i--) {

    // work with emoji
    if (!isEmojiInProgress && !isNameInProgress && text[i].charCodeAt(0) === constantsCodes.colon) {
      isEmojiInProgress = true;
      continue;
    }
    if (isEmojiInProgress && text[i].charCodeAt(0) === constantsCodes.colon) {
      if (currentEmojiIndex === -1) {
        if (isEmojiWasWritten) {
          emojiCounter = 0;
          isEmojiWasWritten = false;
        }
        emojiCounter++;
        currentEmojiIndex = emoji.length - 1;
        isEmojiInProgress = false;
      } else {
        currentEmojiIndex = emoji.length - 1;
      }
      continue;
    }
    if (isEmojiInProgress && text[i].charCodeAt(0) !== constantsCodes.angleBracketsC && makeLowerCase(text[i]) !== emoji[currentEmojiIndex--]) {
      isEmojiInProgress = false;
      currentEmojiIndex = emoji.length - 1;
      continue;
    }

    // work with name
    if (!isNameInProgress && text[i].charCodeAt(0) === constantsCodes.angleBracketsC) {
      isNameInProgress = true;
      continue;
    }
    if (text[i].charCodeAt(0) === constantsCodes.slash || text[i].charCodeAt(0) === constantsCodes.space || text[i].charCodeAt(0) === constantsCodes.atSign) {
      continue;
    }
    if (isNameInProgress && text[i].charCodeAt(0) !== constantsCodes.angleBracketsO) {
      currentName = makeLowerCase(text[i]) + currentName;
      continue;
    }
    if (isNameInProgress && text[i].charCodeAt(0) === constantsCodes.angleBracketsO) {
      result[currentName] ??= 0;
      result[currentName] += emojiCounter;
      currentName = '';
      isNameInProgress = false;
      isEmojiWasWritten = true;
    }
  }
  return result;
}

function makeLowerCase(char) {
  // console.log(char);
  if (char.charCodeAt(0) >= 'A'.charCodeAt(0) && char.charCodeAt(0) <= 'Z'.charCodeAt(0)) {
    // console.log(String.fromCharCode(char.charCodeAt(0) + 32))
    return String.fromCharCode(char.charCodeAt(0) + 32);
  }
  return char;
}