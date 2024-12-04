class BookValidator {
 
    static validate(data) {
      const { title,ingredient,image,instruction } = data;  
  
      
      if (!title || typeof title !== 'string' || title.trim() === '') {
        
        return {
          isValid: false,  
          error: 'Title is required and must be a non-empty string.', 
        };
      }
   
      if (!ingredient || typeof ingredient !== 'string' || ingredient.trim() === '') {
        
        return {
          isValid: false,
          error: 'Page_counter is required and must be a non-empty string.', // Возвращаем сообщение об ошибке
        };
      }


       
      if (!image || typeof image!== 'string' || image.trim() === '') {
        
        return {
          isValid: false,
          error: 'Page_counter is required and must be a non-empty string.', // Возвращаем сообщение об ошибке
        };
      }

      if (!instruction || typeof instruction!== 'string' || instruction.trim() === '') {
        
        return {
          isValid: false,
          error: 'Page_counter is required and must be a non-empty string.', // Возвращаем сообщение об ошибке
        };
      }
      
       
      return {
        isValid: true,  
        error: null,  
      };
    }
  }
  
  module.exports = BookValidator;