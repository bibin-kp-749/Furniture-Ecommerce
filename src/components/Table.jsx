import React from 'react'
import { useEffect } from 'react'
import '../index.css'
import { useDispatch, useSelector } from 'react-redux'
import { unBlockUser, getAllUsers, blockUser } from '../App/Thunk/Userthunk'

const Table = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [])
  const Delete = (id) => {
    dispatch(deleteUser(id));
  }
  const blockAndUnBlock = async (id, isstatus) => {
    (isstatus == true) ?
      dispatch(blockUser({ id })) :
      dispatch(unBlockUser({ id }));
    window.location.reload();
  }
  return (
    <div className='sm:w-full w-full' >
      <div className='no-scrollbar overflow-auto '>
        <table className="table">
          <thead className='font-semibold text-red-950 text-md'>
            <tr>
              <th>
              </th>
              <th>USER NAME</th>
              <th>EMAIL</th>
              {/* <th>PHONE NUMBER</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              user && user.map((e, i) => {
                return (
                  <tr key={i}>
                    <th>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src="https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png" alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <p>{e.userName}</p>
                      </div>
                    </td>
                    <td>
                      <p>{e.email}</p>
                    </td>
                    {/* <td>
                      <p>{e.phone}</p>
                    </td> */}
                    <td className='flex justify-end'>
                      {/* <button className='login-btn w-24 font-medium h-10 m-2 text-gray-900' onClick={() => Delete(e.id)}>Delete</button> */}
                      <button className='block-btn w-24 h-10 m-2 font-medium ' onClick={() => blockAndUnBlock(e.userId, e.isstatus)}>{(e.isstatus == true) ? "Block" : "UnBlock"}</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
