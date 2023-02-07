import { postDb, getDb, deleteDb } from './database';
const textarea = document.querySelector('textarea')
const lineNumbers = document.querySelector('.line-numbers')
//add numbers to text area
textarea.addEventListener('keyup', event => {
        const numberOfLines = event.target.value.split('\n').length

        lineNumbers.innerHTML = Array(numberOfLines)
          .fill('<span></span>')
          .join('')
      })

//tab functionality in text area
textarea.addEventListener('keydown', event => {
        if (event.key === 'Tab') {
          const start = textarea.selectionStart
          const end = textarea.selectionEnd

          textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end)

          event.preventDefault();
        }
      })

//save text if user presses enter
textarea.addEventListener('keypress', event => {
  if (event.key === 'Enter'){
    var text = textarea.value;
    deleteDb();
    postDb(text);
  }

});
//save text if textarea loses focus
textarea.addEventListener('blur', event => {
    var text = textarea.value;
    deleteDb();
    postDb(text);

});

//fetch the text in the DB
const fetchText = async () => {
  const result = await getDb();
  let text=``;
  for (let data of result){
    text += `${data.textTyped}&#13;`
  }

  textarea.innerHTML = text;
}
//call the fetchText function
fetchText();