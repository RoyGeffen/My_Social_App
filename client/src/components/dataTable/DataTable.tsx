import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
//import { userColumns, userRows } from "../../datatablesource";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import {useContext} from "react";
import { User } from "../../types/customTypes";

type Columns={
    columns: User
}

const DataTable =  (columns:any) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list,setList] = useState([]);
  const {currentUser} = useContext(AuthContext)

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships/" + currentUser?.id).then((res) => {
        return res.data;
      })
  );

  const handleDelete = async (id:number) => {

  };

  useEffect(()=>{
    setList(relationshipData);
  },[relationshipData])
  useEffect(()=>{
    //reFetch();
  },[path])
  


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params:any) => {
        return (
          <div className="cellAction">
            <Link to={"/profile/"+params.row.otherId} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.otherId)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Your {path}!
        <Link to={`/${path}/new${(path.charAt(0).toUpperCase() + path.slice(1)).slice(0,-1)}`} className="link">
          Add New
        </Link>
      </div>
      {/* {!rIsLoading && <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row.otherId}
      />} */}
    </div>
  );
};

export default DataTable;
