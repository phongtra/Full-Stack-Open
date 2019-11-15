export const setFilter = filter => {
  return {
    type: 'FILTER',
    data: filter
  };
};

export default (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.data;
    default:
      return state;
  }
};
