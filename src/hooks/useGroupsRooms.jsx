

const UseGroupsRooms = ( arr, numElminar) => {

  const resultado = arr?.filter(item => {
    if(!numElminar.includes(item.parent) || item.root == true){
      return item
    }
  });

  return { resultado };
};

export default UseGroupsRooms;