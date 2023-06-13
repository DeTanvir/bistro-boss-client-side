// TanStack Query> Queries-button
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';




// this whole hook is to fetch data from cart using api
const useCart = () => {
    // to get user information
    const {user} = useContext(AuthContext);

    // TanStack Query> Queries-button
    const { refetch, data:cart=[] } = useQuery({
        queryKey: ['carts', user?.email],//we want data from [hitting carts api] for [email]
        queryFn: async () => {
            // fetching the data by TanStack
            const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`)
            // return the [json-form] of fetched data
            return res.json()
          },
      })
      return [cart, refetch]    
}
export default useCart;