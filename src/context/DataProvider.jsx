import { createContext, useReducer, useEffect } from 'react';
import { dataReducer, initialState } from './dataReducer';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // On mount, check localStorage for data
  useEffect(() => {
    const storedState = localStorage.getItem('sellerAppState');
    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState);
        dispatch({ type: 'SET_INITIAL_STATE', payload: parsedState });
      } catch (e) {
        console.error("Failed to parse state from localStorage", e);
        // If parsing fails, fetch from file
        fetchInitialData();
      }
    } else {
      // If no stored state, fetch from file
      fetchInitialData();
    }
  }, []);

  // Persist state to localStorage whenever leads or opportunities change
  useEffect(() => {
    // Don't save during initial load
    if (!state.loading) {
        try {
            localStorage.setItem('sellerAppState', JSON.stringify({
                leads: state.leads,
                opportunities: state.opportunities
            }));
        } catch (e) {
            console.error("Failed to save state to localStorage", e);
        }
    }
  }, [state.leads, state.opportunities, state.loading]);

  const fetchInitialData = async () => {
    try {
      // Simulate network latency
      await new Promise(res => setTimeout(res, 1000));
      const response = await fetch('/leads.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
