import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    // for [user]>onAuthStateChanged
    const {user} = useAuth();

    // this [axiosSecure] is to use [useAxiosSecure] to use easy and protected api
    const [axiosSecure] = useAxiosSecure();
    // tanstack query to fetch data
    const { data:isAdmin, isLoading: isAdminLoading } = useQuery({
        // query key
        queryKey: ['isAdmin', user?.email],

        // this [queryFn] is used with [axiosSecureApi]
        // no [headers] and [base-url] is needed
        queryFn: async () => {
            
            // [MOST IMPORTANT]: If we don't do it, a user can't browse site without login
            if (!user) {
                return false;
            }
            // fetching the data by TanStack
            const res = await axiosSecure(`/users/admin/${user?.email}`)
            console.log('res from axios for isAdmin', res);

            // return the [json-form] of fetched data
            // for [axiosSecure], we don't need to make the [res] to [.json()]
            // [res.data.admin]=(we set in server: result = {admin: user?.role === 'admin' })
            return res.data.admin;
          },
    })
    return [isAdmin, isAdminLoading];
}
export default useAdmin;