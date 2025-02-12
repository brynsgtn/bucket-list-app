import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
                method: 'GET',
            }),
        }),
        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: `${USERS_URL}/${id}`,
                method: 'DELETE'
            })
        }),
    }),
});

export const { 
    useLoginMutation, 
    useLogoutMutation,
    useRegisterMutation, 
    useUpdateUserMutation, 
    useGetAllUsersQuery, 
    useDeleteUserMutation 
} = usersApiSlice;