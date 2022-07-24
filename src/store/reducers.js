function reducer(state, action) {
    switch (action.type) {
        case 'set_temp':
            return {
                ...state,
                temp: action.payload
            };
        default:
            throw new Error();
    }
}

export default reducer;