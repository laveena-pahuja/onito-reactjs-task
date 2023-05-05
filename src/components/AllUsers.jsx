import React, { useEffect, useRef, useState } from "react";
import { getallUsers } from "../service/api";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.min.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const res = await getallUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const tableRef = useRef();

  useEffect(() => {
    if (users.length) {
      $(tableRef.current).DataTable();
    }
  }, [users]);

  return (
    <div>
      <table className="table" ref={tableRef}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Govt ID</th>
            <th>Guardian Details</th>
            <th>Nationality</th>
          </tr>
        </thead>
        {users.length > 0 ? (
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user?.name ? user?.name : "-"}</td>
                <td>{user?.age ? user?.age : "-"}</td>
                <td>{user?.mobile ? user?.mobile : "-"}</td>
                <td>{user?.address ? user?.address : "-"}</td>
                <td>{user?.govIdNumber ? user?.govIdNumber : "-"}</td>
                <td>{user?.guardianName ? user?.guardianName : "-"}</td>
                <td>{user?.nationality ? user?.nationality : "-"}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="7" className="text-center">
                No data found
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default AllUsers;
