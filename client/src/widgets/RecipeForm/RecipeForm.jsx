import React from 'react';
import styles from './RecipeForm.module.css';

export default function RecipeForm({ input, setInput }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recipes</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Insert recipe name"
        className={styles.input}
      />
    </div>
  );
}
