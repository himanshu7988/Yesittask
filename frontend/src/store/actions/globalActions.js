export const increaseNumber = (data) => {
    return {
      type: 'INCREMENT',
      payload: data,
    };
  };
export const decreaseNumber = (data) => {
    return {
      type: 'DECREMENT',
      payload: data,
    };
  };