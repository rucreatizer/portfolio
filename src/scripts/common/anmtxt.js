var aviatitle = {
  generate: function (string, block) {
    var wordsArray = string.split(' '),
      stringArray = string.split(''),
      sentence = [],
      word = '';
    console.log(wordsArray);
    console.log(stringArray);
    block.text('');

    wordsArray.forEach(function (currentWord) {
      var wordsArray = currentWord.split('');

      wordsArray.forEach(function (letter) {
        var letterHtml = '<span class="letter-span">' + letter + '</span>';

        word += letterHtml;
      });

      var wordHTML = '<span class="letter-word">' + word + '</span>'

      sentence.push(wordHTML);
      word = '';
    });

    block.append(sentence.join(' '));

    // анимация появления
    var
      letters = block.find('.letter-span'), // найдем все наши буквы
      duration = 500 / stringArray.length; // находим длительность для каждой буквы

    $.each(letters, function (item, elem) {
      setTimeout(function () {
        $(elem).addClass('active');
      }, duration * item);
    });

  }
}