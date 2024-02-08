function includes(text, substr, startIndex = 0) {

  let currentSubIndex = 0;

  for (let i = startIndex; i <= text.length; i++) {
    console.log({i});
    if (substr[currentSubIndex] == text[i]) {
      if (substr[currentSubIndex + 1]) {
        currentSubIndex++;
      } else {
        return true;
      }
    } else {
      currentSubIndex = 0;
    }
  }

  return false;
}

const text = "Some not so long text!";
const substr = "so ";
const startIndex = 0;

console.log(includes(text, substr, startIndex))