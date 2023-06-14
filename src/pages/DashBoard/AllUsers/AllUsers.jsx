import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    // for [queryKey] to get all data
    // we use only one [queryKey] to get all data
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users');
        return res.json();
    })



    // handle make a user [Admin] by [patch]
    const handleMakeAdmin = user => {
        // this code is to [make-admin] after [confirmation]
        Swal.fire({
            title: `Are you sure to make "${user.name}" an admin?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // [original operation] of patch [after-confirmation]
                fetch(`http://localhost:5000/users/admin/${user._id}`, {
                    method: 'PATCH'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {

                            // [refetch] to make the [usersDB] dynamically updated
                            refetch();
                            {
                                users.map(user2 => console.log(typeof(user2.role)))
                            }

                            // [sweetAlert] for [patch] confirm
                            Swal.fire(
                                'Updated!',
                                `"${user.name}" is now an admin.`,
                                'success'
                            )
                        }
                    })
            }
        })
    }


    // handle delete item from [cart]
    const handleDelete = user => {
        // this code is for delete after [user-confirms]
        Swal.fire({
            title: `Are you sure to delete "${user.name}"?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // [original operation] of delete [after-user-confirms]
                fetch(`http://localhost:5000/users/${user._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {

                            // [refetch] to make the cart dynamically updated
                            refetch();

                            // [sweetAlert] for delete confirm
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }


    return (
        <div className="bg-white w-full rounded-lg mx-2">
            <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet>
            <div className="uppercase font-semibold h-20 ">
                <h3 className="text-3xl text-start align-middle ms-4 mt-4">Total Users: {users.length}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table ms-2">
                    {/* head */}
                    <thead className="font-bold text-black bg-[#D1A054] rounded-lg">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* table rows */}
                        {
                            users.map((user, index) => <tr
                                key={user._id}
                            >
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ? <span className="font-semibold text-xl text-white bg-sky-500 px-2 py-1 rounded-md">Admin</span> :
                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost text-2xl text-white bg-[#D1A054] px-2" ><FaUsers></FaUsers></button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user)} className="btn btn-ghost text-2xl text-white bg-red-500 px-2" ><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;