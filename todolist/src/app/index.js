import React from 'react';
import ReactDOM from 'react-dom';

import TodoApp from './components/TodoApp';
import $ from 'jquery';

$(document).ready(() => {
  $('#ad_item').on('click', e => {
    if ( $.trim( $('input.input').val() ) === "") {
      $('input.input').focus()
    }

    if ( $('.input').val() ) {
      $('.search_input').val('')
      setTimeout(() => {
        $('.list__item').last().addClass('item-highlight').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", () => {
          $('.list__item').removeClass('item-highlight')
        }); ;
      })
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
