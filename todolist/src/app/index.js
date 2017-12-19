import React from 'react';
import ReactDOM from 'react-dom';

import TodoApp from './components/TodoApp';
import $ from 'jquery';

$(document).ready(() => {
  $('input.input').on('blur', function() {
    $('.warning__message').text('')
    $(this).css('box-shadow', 'none')
  })

  $('.ad__button').on('click', e => {
    if ( $.trim( $('input.input').val() ) === "") {
      e.preventDefault()
      $('.warning__message').text('Введите задание')
      $('input.input')
      .css('box-shadow', '0 0 10px rgba(255, 1, 1, 0.5)')
      .focus()
      return false;
    }
    else {
      $('.warning__message').text('')
      $('input.input').css('box-shadow', 'none')
    }
  })
})

ReactDOM.render(
  <TodoApp />,
  document.getElementById('mount-point')
);
