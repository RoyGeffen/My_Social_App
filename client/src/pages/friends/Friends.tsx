import DataTable from "../../components/dataTable/DataTable";
import "../home/home.scss"
import "./friends.scss"

const Friends=()=>{
    return(
      <div className="home">
        <div className="list">
          <div className="listContainer">
            <DataTable />
          </div>
        </div>
      </div>
    )
}

export default Friends