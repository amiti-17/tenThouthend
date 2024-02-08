function split(text, divider) {

  let answer = [];
  let currentSubFrag = "";
  let currentSubDivider = "";
  let dividerIndex = 0

  for (let i = 0; i < text.length; i++) {

    if (divider === "") {
      answer.push(text[i]);
      if (i + 1 == text.length) {
        return answer;
      }
      continue;
    }

    if (divider === undefined) {
      return [text];
    }

    if (text[i] == divider[dividerIndex]) {
      if (!divider[dividerIndex + 1]) {
        answer.push(currentSubFrag);
        dividerIndex = 0;
        currentSubDivider = "";
        currentSubFrag = "";
      } else {
        currentSubDivider += text[i];
        dividerIndex++;
      }
    } else {
      currentSubFrag += currentSubDivider + text[i];
      currentSubDivider = "";
      dividerIndex = 0;
    }

  }
  
  answer.push(currentSubFrag)
  return answer;
}

const text = "Some not so long text!";
const divider = "ome";

console.log(split(text, divider));
