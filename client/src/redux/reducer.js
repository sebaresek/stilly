import { 
  FILTER, 
  LOAD_DATA 
} from "./action-types";

const initialState = {
  card: [],
  numPage: 1,
  filteredCard: [],
  filteredWaist: null, // Inicializa como null o un valor que represente "ningún filtro"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_DATA:
      return {
        ...state,
        card: action.payload, // Carga los datos en state.card
      };

    case FILTER:
      let filteredCard = [...state.card];
      if (action.payload.color) {
        const colorToFilter = action.payload.color.toLowerCase();
        filteredCard = filteredCard.filter((card) => card.color.toLowerCase() === colorToFilter);
      }
      if (action.payload.waist) {
        const waistToFilter = action.payload.waist.toLowerCase();
        filteredCard = filteredCard.filter((card) => card.waist.toLowerCase() === waistToFilter);
        return {
          ...state,
          filteredCard: filteredCard,
          filteredWaist: action.payload.waist, // Actualiza filteredWaist
        };
      }
      return {
        ...state,
        filteredCard: state.card,
      };
    // case FILTER:
    //   let filteredCard = [...state.card];
    //   console.log(state.card, '::::::::')
    //   console.log(filteredCard, ':::::aaaaaaaa:::')

  
    //   if (action.payload.color === 'gris') {
    //       filteredCard = filteredCard.filter(card => card.color === 'gris');
    //   } else if (action.payload.color === 'gris claro') {
    //       filteredCard = filteredCard.filter(card => card.color === 'gris claro'); 
    //   }  else if (action.payload.color === 'gris oscuro') {
    //       filteredCard = filteredCard.filter(card => card.color === 'gris oscuro'); 
    //   } else if (action.payload.color === 'negro') {
    //       filteredCard = filteredCard.filter(card => card.color === 'negro'); 
    //   } else if (action.payload.color === 'blanco') {
    //       filteredCard = filteredCard.filter(card => card.color === 'blanco');
    //   }  else if (action.payload.color === 'naranja') {
    //       filteredCard = filteredCard.filter(card => card.color === 'naranja'); 
    //   }  else if (action.payload.color === 'rojo') {
    //       filteredCard = filteredCard.filter(card => card.color === 'rojo'); 
    //   }  else if (action.payload.color === 'bordo') {
    //       filteredCard = filteredCard.filter(card => card.color === 'bordo'); 
    //   }  else if (action.payload.color === 'azul') {
    //       filteredCard = filteredCard.filter(card => card.color === 'azul'); 
    //   }  else if (action.payload.color === 'verde') {
    //       filteredCard = filteredCard.filter(card => card.color === 'verde'); 
    //   }
  
    //   if (action.payload.waist === 'S') {
    //       filteredCard = filteredCard.filter(card => card.waist === 'S');

    //   } else if (action.payload.waist === 'M') {
    //       filteredCard = filteredCard.filter(card => card.waist === 'M');
    //   console.log(filteredCard, '::::::::')
    //   } else if (action.payload.waist === 'L') {
    //       filteredCard = filteredCard.filter(card => card.waist === 'L');
    //       console.log(filteredCard, ':::::saleeeeeeeeeee:::')
    //   } else if (action.payload.waist === 'XL') {
    //       filteredCard = filteredCard.filter(card => card.waist === 'XL');
    //   } else if (action.payload.waist === 'XXL') {
    //       filteredCard = filteredCard.filter(card => card.waist === 'XXL');
    //   }
      
    //   return {
    //       ...state,
    //       filteredCard: filteredCard
    //   };

      
    default:
      return state;
  }
};


export default reducer;



    // case ORDER:
    //   const orderedCard = [...state.filteredCard];
    //   orderedCard.sort((a, b) => {
    //     if (action.payload === 'Attack') {
    //       return a.stroke - b.stroke;
    //     } else if (action.payload === 'AttackD') {
    //       return b.stroke - a.stroke;
    //     } else {
    //       return action.payload === 'A'
    //         ? a.name.localeCompare(b.name)
    //         : b.name.localeCompare(a.name);
    //     }
    //   });
    //   return {
    //     ...state,
    //     filteredCard: orderedCard,
    //   };

    // case HANDLE_NUMBER:
    //   return {
    //     ...state,
    //     numPage: action.payload,
    //   };

    // case NEXT_PAGE:
    //   return {
    //     ...state,
    //     numPage: state.numPage + 1,
    //   };

    // case PREV_PAGE:
    //   return {
    //     ...state,
    //     numPage: state.numPage - 1,
    //   };