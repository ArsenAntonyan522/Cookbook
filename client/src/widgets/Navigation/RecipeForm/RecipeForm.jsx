import { useState } from 'react';

import { message as antMessage } from 'antd';


export default function RecipeForm({ input, setInput}) {


  function onChangeHandler(e) {
    setInput( e.target.value );
  }

 
  

  return (
    <div>
        <h1>Поиск рецептов</h1>
     <input
                type="text"
                value={input}
                onChange={onChangeHandler}
                placeholder="Введите название блюда"
    />
      
    </div>
  );
}