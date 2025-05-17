import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const limit = 10;

  const increment = () => {
    if (count < limit) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Click Counter</h1>
      <p style={styles.count}>Count: {count}</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={increment}>
          Increase
        </button>
        <button style={styles.button} onClick={decrement}>
          Decrease
        </button>
      </div>
      {count === limit && <p style={styles.limitText}>You've reached the limit!</p>}
    </div>
  );
};

// Simple inline styling
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    fontSize: "2rem"
  },
  count: {
    fontSize: "1.5rem",
    margin: "20px 0"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer"
  },
  limitText: {
    color: "red",
    marginTop: "20px"
  }
};

export default App;
     
