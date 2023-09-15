import { FILTER, LOAD_DATA } from "./action-types";

const initialState = {
  card: [],
  numPage: 1,
  filteredCard: [],
  filteredWaist: null,
  filteredColor: null,
  filteredSleeve: null,
  filteredPrice: null,  // Inicializa como null o un valor que represente "ningún filtro"
};

function parsePrice(priceString) {
  const numericString = priceString.replace(/\D/g, ''); // Elimina todos los caracteres que no sean números
  return parseInt(numericString, 10); // Convierte la cadena numérica en un número entero
}

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
          // Filtrar por color
          const colorToFilter = action.payload.color.toLowerCase();
          filteredCard = filteredCard.filter((card) => card.color.toLowerCase() === colorToFilter);
        }
  
        if (action.payload.waist) {
          // Filtrar por talle
          const waistToFilter = action.payload.waist.toLowerCase();
          filteredCard = filteredCard.filter((card) => card.waist.toLowerCase() === waistToFilter);
        }
  
        if (action.payload.sleeve) {
          // Filtrar por manga
          const sleeveToFilter = action.payload.sleeve.toLowerCase();
          filteredCard = filteredCard.filter((card) => card.sleeve.toLowerCase() === sleeveToFilter);
        }
  
        if (action.payload.price) {
          // Filtrar por precio
          const priceToFilter = action.payload.price;
          filteredCard = filteredCard.filter((card) => {
            const cardPrice = parsePrice(card.price);
            if (priceToFilter === 'MENOS10000') {
              return cardPrice < 10000;
            } else if (priceToFilter === 'MAS10000') {
              return cardPrice >= 10000 && cardPrice <= 25000;
            } else if (priceToFilter === 'MAS30000') {
              return cardPrice > 25000;
            }
            return true;
          });
        }
  
        return {
          ...state,
          filteredCard: filteredCard,
          filteredColor: action.payload.color || null,
          filteredWaist: action.payload.waist || null,
          filteredSleeve: action.payload.sleeve || null,
          filteredPrice: action.payload.price || null,
        };
      
        

    default:
      return state;
  }
};

export default reducer