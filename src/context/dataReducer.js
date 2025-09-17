export const initialState = {
  leads: [],
  opportunities: [],
  loading: true,
  error: null,
};

export const dataReducer = (state, action) => {
  console.log('=>', state, action)

  switch (action.type) {

    case 'FETCH_SUCCESS':
      return {
        ...state,
        leads: action.payload,
        loading: false,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'UPDATE_LEAD':
      return {
        ...state,
        leads: state.leads.map(lead =>
          lead.id === action.payload.id ? action.payload : lead
        ),
      };
    case 'CONVERT_LEAD': {
      const lead = action.payload;
      const newOpportunity = {
        id: `opp-${Date.now()}`,
        name: lead.name,
        accountName: lead.company,
        amount: 10000, // Default amount
        stage: 'Discovery', // Default stage
      };
      return {
        ...state,
        leads: state.leads.filter(l => l.id !== lead.id),
        opportunities: [...state.opportunities, newOpportunity],
      };
    }
    case 'SET_INITIAL_STATE':
        return { ...state, ...action.payload, loading: false };
    default:
      return state;

  }
};
