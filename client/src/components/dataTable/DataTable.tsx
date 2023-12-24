import "./datatable.scss";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import {useContext} from "react";
import { User } from "../../types/customTypes";

const friendsColumns = [
  { field: "userid", headerName: "ID", width: 10},
  {
    field: "username",
    headerName: "Username",
    width: 160,
    renderCell: (params:any) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" 
            src={params.row.profilePic} alt="" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 130,
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
  },
  {
    field: "city",
    headerName: "City",
    width: 120,
  }
];

const DataTable =  () => {//columns:any
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list,setList] = useState([]);
  const queryClient = useQueryClient();

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships/followed").then((res) => {
        return res.data;
      })
  );

  const handleUnFollow = async (id:number) => {
    await makeRequest.delete("/relationships?userId=" + id);
    queryClient.invalidateQueries(["relationship"]);
  };

  useEffect(()=>{
    if(!rIsLoading && relationshipData && relationshipData[0].id){
      setList(relationshipData.map((row:User)=>{
        return { id: row.id ,userid: row.id, username: row.username, 
                name: row.name, email: row.email, city:row.city, profilePic:row.profilePic }
      }));
    }
  },[relationshipData])

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params:any) => {
        return (
          <div className="cellAction">
            <Link to={"/profile/"+params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleUnFollow(params.row.id)}
            >
              Un-Follow
            </div>
          </div>
        );
      },
    },
  ];
  const dataGridProps: DataGridProps = {
    rows: list,
    columns: friendsColumns.concat(actionColumn),
    checkboxSelection: true,
    disableRowSelectionOnClick: true,
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Your {path}!
        <Link to={""} className="link">
          Add New
        </Link>
      </div>
      {rIsLoading || (!relationshipData && !relationshipData[0].id)? "Loading" :
       <DataGrid className="table" {...dataGridProps}/>
      }
    </div>
  );
};

export default DataTable;
