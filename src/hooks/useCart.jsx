// TanStack Query> Queries-button
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';




// this whole hook is to fetch data from cart using api
const useCart = () => {
    // to get user information
    const {user} = useAuth();

    // this is for [verifyJWT], token sent from [localStorage]
    // this token is not needed when using [axiosSecure]
    const token = localStorage.getItem('access-token');

    // this [axiosSecure] is to use [useAxiosSecure] to use easy and protected api
    const [axiosSecure] = useAxiosSecure();



    // TanStack Query> Queries-button
    const { refetch, data:cart=[] } = useQuery({
        // we use more than one [queryKey] to get data for [specific] email/user
        // here, there are 2 [queryKeys]=api['carts'] and email[user-email]
        // but when we get all data, we have to use only one key
        queryKey: ['carts', user?.email],//we want data from [hitting carts api] for [email]
        // queryFn: async () => {
        //     // fetching the data by TanStack
        //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, {headers:{
        //         // this authorization is to sent [authorization] to [verifyJWT]
        //         authorization: `bearer ${token}`
        //     }})
        //     // return the [json-form] of fetched data
        //     return res.json()
        //   },



        // this [queryFn] is used with [axiosSecureApi]
        // no [headers] and [base-url] is needed
        queryFn: async () => {
            // fetching the data by TanStack
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            console.log('res from axios', res);

            // return the [json-form] of fetched data
            // for [axiosSecure], we don't need to make the [res] to [.json()]
            return res.data;
          },
      })
      return [cart, refetch]    
}
export default useCart;