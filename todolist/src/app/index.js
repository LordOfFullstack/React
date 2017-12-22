import React from 'react';
import ReactDOM from 'react-dom';

import TodoApp from './components/TodoApp';
import $ from 'jquery';

$(document).ready(() => {
  $('#ad_item').on('click', e => {
    if ( $.trim( $('input.input').val() ) === "") {
      $('input.input').focus()
    }
  })

  $('.navi button').on('click', e => {
    $('.search_input').val('')
  })
})

ReactDOM.render(
  <TodoApp />,
  document.getElementById('mount-point')
);
