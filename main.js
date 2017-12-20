
// Author Rohit Desai rdesai30@hawk.iit.edu
(function() {

class PageComponent extends React.Component 
{
    render() 
    {
        return ( <EmployeesTable/> );
    }
}


class EmployeesTable extends React.Component 
{

    constructor(props) 
    {
        super(props);
        this.state = {employees: []};
        this.loadDatafromurl = this.loadDatafromurl.bind(this);
    }

    render() 
    {
        const rows = this.state.employees.map((employee, i) => {
                return <EmployeesTableRow key= {i} employee ={employee}/>
    });


    return (
            <div>
                
                <h1 align="center">ITMD 565 - Project 2</h1>
                <h2 align="center">Rohit Rameshrao Desai - rdesai30@hawk.iit.edu</h2>

                <LoadButton clickHandler={this.loadDatafromurl}/>
                <br></br><br></br>
                <table id="resultTable" align="center" className="table table-hover" border = "1" >
                <tbody id="tableBody">
                    <tr >
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Title</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Active</th>
                    </tr>
                    {rows}
                    </tbody>
                </table>
           </div>

        );

    }


    componentDidMount() 
    {
        this.loadDatafromurl();
    }

    loadDatafromurl() 
    {
        var datalist;
        var requestObj = new XMLHttpRequest();
        requestObj.onreadystatechange = () => {
            if (requestObj.readyState === 4 && requestObj.status === 200) {
                datalist = JSON.parse(requestObj.responseText);
                this.setState({employees: datalist});
            }
        };
        requestObj.open('GET', 'http://libertyville.rice.iit.edu/scripts/4565_lab3.php', true);
        requestObj.send();
    }
}

class EmployeesTableRow extends React 
{

    render() 
    {

            return(
                <div>
                </div>
            
                     <tr>
                          <td>{this.props.employee.id}</td>
                          <td>{this.props.employee.first_name}</td>
                          <td>{this.props.employee.last_name}</td>
                          <td>{this.props.employee.title}</td>
                          <td>{this.props.employee.email}</td>
                          <td>{this.props.employee.gender}</td>
                          
                        {this.props.employee.active ? (
                          <td bgcolor="#76FFAE">{String(this.props.employee.active)}</td>
                           ) : (
                         <td bgcolor="#F4775C">{String(this.props.employee.active)}</td>
                               )
                        }
                          
                    
                    </tr>
                 );
        
    }
}

class LoadButton extends React.Component 
{
    render() 
    {
        return (
            <button id="loadButton" onClick={this.props.clickHandler}>Load Data</button>
        );
    }
}

ReactDOM.render(<PageComponent/>, document.getElementById('root'));

})();
