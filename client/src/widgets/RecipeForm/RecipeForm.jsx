export default function RecipeForm({ input, setInput}) {
  return (
    <div>
        <h1>Поиск рецептов</h1>
     <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Введите название блюда"
    />

    </div>
  );
}

