const initialState = {
    all_users : []
};

// function createNewUserData(data) {
//     const { user } = data;
//     return user;
// }

export default function user(state = initialState, action) {
    console.log(action.payload);
    switch (action.type){
        case 'CREATE_USER':
            return { ...state, all_users: [...state.all_users, action.payload] };
        default:
            return state;
    }



}