import { postDb, getDb, deleteDb } from './database';
const textarea = document.querySelector('textarea')
const lineNumbers = document.querySelector('.line-numbers')

textarea.addEventListener('keyup', event => {
        const numberOfLines = event.target.value.split('\n').length

        lineNumbers.innerHTML = Array(numberOfLines)
          .fill('<span></span>')
          .join('')
      })

textarea.addEventListener('keydown', event => {
        // console.log(event);
        // ogText += event.key;
        // if (event.key === 'Enter'){
        //   var text = ogText.replace('Enter','');
        //   postDb(text);
        //   ogText = "";
        // }

        

        if (event.key === 'Tab') {
          const start = textarea.selectionStart
          const end = textarea.selectionEnd

          textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end)

          event.preventDefault();
        }
      })
textarea.addEventListener('keypress', event => {
  if (event.key === 'Enter'){
    var text = textarea.value;
    deleteDb();
    postDb(text);
  }

});

textarea.addEventListener('blur', event => {
    var text = textarea.value;
    deleteDb();
    postDb(text);

});

const fetchText = async () => {
  const result = await getDb();
  let text=``;
  for (let data of result){
    text += `${data.textTyped}&#13;`
  }

  textarea.innerHTML = text;
}

fetchText();