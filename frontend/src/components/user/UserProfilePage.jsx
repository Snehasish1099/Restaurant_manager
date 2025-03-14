import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AuthHooks } from '../../containers/authentication/hooks'
import EditUserForm from './EditUserForm'
import CommmonModal from '../../common/ui_components/CommonModal'

const UserProfilePage = () => {

  const { openEditProfile, setOpenEditProfile, updateUserByIdApiCall } = AuthHooks()

  const userData = useSelector((state) => state.auth.userDetail)

  const [activeTab, setActiveTab] = useState("Reviews");

  const menuItems = [
    { section: "Activity", items: ["Reviews", "Photos"] },
    { section: "Online Ordering", items: ["My addresses"] },
    { section: "Payments", items: ["Manage Cards"] },
    { section: "Table Booking", items: ["Your Bookings"] },
  ];

  return (
    <div className="bg-gray-100 min-h-screen !w-full flex flex-col justify-start items-center">
      {/* Header */}
      <div className="relative w-11/12">
        <img src={userData?.coverPhoto} alt="Cover" className="w-full h-48 object-cover" />
        <div className="absolute top-4 left-4 flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-blue-800 flex items-center justify-center text-white text-3xl font-bold">
            {userData?.username?.[0]}
          </div>
          <h2 className="text-black text-xl font-semibold">{userData?.username}</h2>
        </div>
        <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-orange-300 hover:text-black" onClick={() => setOpenEditProfile(true)}>
          {"Edit Profile"}
        </div>
        <div className="absolute bottom-4 left-4 flex space-x-6 text-black">
          <div>{userData?.reviews || 0} Reviews</div>
          <div>{userData?.photos || 0} Photos</div>
        </div>
      </div>

      <div className="flex mt-6 w-11/12">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow rounded-lg p-4">
          {menuItems.map((menu, index) => (
            <div key={index} className="my-4">
              <h2 className="text-black text-base font-semibold uppercase my-2">{menu.section}</h2>
              {menu?.items?.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTab(item)}
                  className={`block w-full text-left text-sm p-2 ${activeTab === item ? "text-red-600 font-semibold border-l-2 border-red-600" : "text-gray-700"} cursor-pointer hover:bg-gray-100`}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="w-3/4 bg-white shadow rounded-lg p-6 ml-6">
          <h2 className="text-xl font-semibold">{activeTab}</h2>
          
        </div>
      </div>


      {openEditProfile === true &&
        <CommmonModal
          open={openEditProfile}
          handleClose={() => setOpenEditProfile(false)}
          title={"Edit User Profile"}
          titleCls={'!font-semibold'}
        >
          <EditUserForm 
            HandleCloseForm={() => setOpenEditProfile(false)}
            userData={userData}
            updateUserByIdApiCall={updateUserByIdApiCall}
          />
        </CommmonModal>
      }
    </div>
  )
}

export default UserProfilePage