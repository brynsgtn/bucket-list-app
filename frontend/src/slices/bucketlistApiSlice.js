import { apiSlice } from './apiSlice';
const BUCKETLIST_URL = '/api/bucketlist';

export const bucketlistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBucketlist: builder.query({
            query: () => ({
                url: `${BUCKETLIST_URL}`,
                method: 'GET',
            }),
        }),
        updateIsChecked: builder.mutation({
            query: (data) => ({
                url: `${BUCKETLIST_URL}/${data.id}/toggle`,
                method: 'PUT',
                body: data
            }),
        }),
        createBucketlist: builder.mutation({
            query: (data) => ({
                url: `${BUCKETLIST_URL}`,
                method: 'POST',
                body: data
            }),
        }),
        editBucketlist: builder.mutation({
            query: ({ id, data }) => ({
                url: `${BUCKETLIST_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteBucketlist: builder.mutation({
            query: ({ id }) => ({
                url: `${BUCKETLIST_URL}/${id}`,
                method: 'DELETE'
            }),
        }),
    }),
});

export const { useGetBucketlistQuery, useUpdateIsCheckedMutation, useCreateBucketlistMutation, useEditBucketlistMutation, useDeleteBucketlistMutation } = bucketlistApiSlice;