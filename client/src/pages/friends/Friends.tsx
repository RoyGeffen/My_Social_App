import DataTable from "../../components/dataTable/DataTable";

const Friends=()=>{
    return(
      <div className="list">
        <div className="listContainer">
          <DataTable columns={friendsColumns}/>
        </div>
      </div>
    )
}


export default Friends

export const friendsColumns = [
    { field: "userid", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params:any) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" 
              src={params.row.img = params.row.img === "FILL PFP URL" ?  
                "https://cdn-icons-png.flaticon.com/512/149/149071.png?w=826&t=st=1690024635~exp=1690025235~hmac=1bc85798c3c10d7a256d01f75b0213825f864463275ab28e0d092ac76089c1c1"
                : params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "country",
      headerName: "Country",
      width: 120,
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
  ];