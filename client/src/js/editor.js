import { postDb, getDb, deleteDb } from './database';
const textarea = document.querySelector('textarea')
const lineNumbers = document.querySelector('.line-numbers')

textarea.addEventListener('keyup', event => {
        const numberOfLines = event.target.value.split('\n').length

        lineNumbers.innerHTML = Array(numberOfLines)
          .fill('<span></span>')
          .join('')
      })
var text = "";
console.log("New build 1");
textarea.addEventListener('keydown', event => {
        text += event.key;
        if (event.key === "Enter"){
          text.replace("Enter",'');
          postDb(text);
          text = "";
        }

        

        if (event.key === 'Tab') {
          const start = textarea.selectionStart
          const end = textarea.selectionEnd

          textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end)

          event.preventDefault();
        }
      })


const fetchText = async () => {
  const result = await getDb();
  let text=``;
  for (let data of result){
    text += `${data.textTyped}&#13;`
  }

  textarea.innerHTML = text;
}

fetchText();