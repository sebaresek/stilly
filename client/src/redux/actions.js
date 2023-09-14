import { ORDER, 
  FILTER, 
  HANDLE_NUMBER,
  PREV_PAGE,
  NEXT_PAGE,
  LOAD_DATA
} from "./action-types";

export function prevPage() {
    return {
        type: PREV_PAGE,
    };
}
  
export function nextPage() {
    return {
        type: NEXT_PAGE,
}   ;
}
  
export function handleNumber(num) {
    return {
        type: HANDLE_NUMBER,
        payload: num,
    };
}

export const filterCards = (filter) => {
    console.log(filter)
    return { 
        type: FILTER, 
        payload: filter 
    };
}

export const orderCards = (order) => {
    return { 
        type: ORDER, 
        payload: order 
    };
}

export const loadData = (data) => ({
    type: LOAD_DATA,
    payload: data,
  });