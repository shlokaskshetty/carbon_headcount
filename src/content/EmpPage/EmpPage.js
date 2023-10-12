import React, { useState, useEffect } from 'react';
import {
  Datagrid,
  useDatagrid,
  useInlineEdit,
} from '@carbon/ibm-products';
import DatagridPagination from './DatagridPagination';
import { pkg } from '@carbon/ibm-products/lib/settings';
import axios from 'axios';
import './emppage.scss';
import { Button, Search } from 'carbon-components-react';
import { Download, Filter, Label } from '@carbon/icons-react';
import {
  Dropdown, 
  RadioButtonGroup,
  RadioButton,
  Lable,
  Breadcrumb,
  Column,
} from 'carbon-components-react';

const defaultHeader = [
  {
    Header: 'EmployeeSerial',
    accessor: 'EmployeeSerial#'
  },
  {
    Header: 'Emp Name',
    accessor: 'Emp Name',
  },
  {
    Header: 'Dept Code',
    accessor: 'DeptCode',
  },
  {
    Header: 'Dept Name',
    accessor: 'Dept Name',
  },
  {
    Header: 'IsManager',
    accessor: 'IsManager?',
  },
  {
    Header: 'Emp Type',
    accessor: 'Emp Type',
  },
  {
    Header: 'Location Blue pages',
    accessor: 'Location Blue pages',
  },
  {
    Header: 'Mgr Name',
    accessor: 'Mgr Name',
  },
  {
    Header: ' Leader Name',
    accessor: 'Leader Name',
    inlineEdit: {
      type: 'text',
      validator: (n) => n.length >= 40,
      inputProps: {
        invalidText: 'Invalid text, character count must be less than 40',
      },
    },
  },
  {
    Header: ' Diversity',
    accessor: 'Diversity',
    inlineEdit: {
      type: 'text',
      validator: (n) => n.length >= 40,
      inputProps: {
        invalidText: 'Invalid text, character count must be less than 40',
      },
    },
  },
  {
    Header: 'Work Location',
    accessor: 'Work location',
  },
  {
    Header: 'Date of Joining',
    accessor: 'Date of Joining',
  },
  {
    Header: 'Date of Leaving',
    accessor: 'Date of Leaving',
  },
  {
    Header: ' Remarks',
    accessor: 'Remarks',
    inlineEdit: {
      type: 'text',
      validator: (n) => n.length >= 40,
      inputProps: {
        invalidText: 'Invalid text, character count must be less than 40',
      },
    },
  },
  {
    Header: 'Employee Status',
    accessor: 'Employee Status',
  },
];

export const EmpPage = () => {
  pkg.feature['Datagrid.useInlineEdit'] = true;

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null); // General error
  const [httpError, setHttpError] = useState(null); //  HTTP error state variable

  const datagridState = useDatagrid({
    columns: defaultHeader,
    data: filteredData.length > 0 ? filteredData : data,
    initialState: {
      pageSize: 50,
      pageSizes: [5, 10, 25, 50],
    },
    onDataUpdate: setData,
    DatagridPagination: DatagridPagination,
  }, useInlineEdit);

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isManagerFilter, setIsManagerFilter] = useState('');
  const [employeeTypeFilter, setEmployeeTypeFilter] = useState('');

  const closeFilterPanel = () => {
    setIsFilterPanelOpen(false);
  };

  const applyFilter = () => {
    let filteredEmployees = data;

    if (isManagerFilter === 'yes') {
      filteredEmployees = filteredEmployees.filter((employee) => employee['IsManager?'] === 'yes');
    } else if (isManagerFilter === 'no') {
      filteredEmployees = filteredEmployees.filter((employee) => employee['IsManager?'] === 'no');
    }

    if (employeeTypeFilter === 'Full-Time') {
      filteredEmployees = filteredEmployees.filter((employee) => employee['Emp Type'] === 'Full-Time');
    } else if (employeeTypeFilter === 'Part-Time') {
      filteredEmployees = filteredEmployees.filter((employee) => employee['Emp Type'] === 'Part-Time');
    }

    setFilteredData(filteredEmployees);
  };

  const clearFilter = () => {
    setIsManagerFilter('');
    setEmployeeTypeFilter('');
    setFilteredData([]);
  };


  useEffect(() => {
    axios
      .get('http://localhost:5000/api/getEmployees')//testing HERE getEmployees 
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);

        // Set the HTTP error state to display the error message
        setHttpError(error); // Capture and store the HTTP error
      });
  }, []);

  const handleFilterEmployees = () => {
    const searchText = document.getElementById('filterInput').value.toLowerCase();

    const filteredEmployees = data.filter((employee) => {
      for (const key in employee) {
        if (employee[key] && employee[key].toString().toLowerCase().includes(searchText)) {
          return true;
        }
      }
      return false;
    });

    setFilteredData(filteredEmployees);
  };

  const handleSaveEdits = () => {
    axios
      .post('http://localhost:5000/api/updateEmployees', { employees: data })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error updating employees:', error);
      });
  };

  return (
    <div className="EmpPageWrap">
      <h1 className="home__heading">Blue Page SyncUp</h1>

      <div className="filter-panel">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button kind="secondary" onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}>
            <Filter renderIcon={Filter} />
          </Button>
          
          <Search
            className="filter"
            size="lg"
            style={{ width: '100%' }}
            placeholder="Filter by Employee Name"
            labelText="Search"
            id="filterInput"
            onChange={handleFilterEmployees}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleFilterEmployees();
              }
            }}
          />
          <Button kind="secondary">
            <Download renderIcon={Download} />
          </Button>
        </div>
      </div>

      
      {isFilterPanelOpen && (
        

        <div className="filter-options">
        <Column lg={16} md={8} sm={4} className="filter__banner">
  <Breadcrumb noTrailingSlash>
    

  </Breadcrumb>
  <div className="filter-option">
            <h4> Is Manager:</h4>
             <RadioButtonGroup
              name="isManagerFilter"
              orientation="vertical"
              valueSelected={isManagerFilter}
              onChange={(value) => setIsManagerFilter(value)}
            >
              <RadioButton labelText="Yes" value="yes" id="yes" />
              <RadioButton labelText="No" value="no" id="no" />
            </RadioButtonGroup>
          </div>


          <div className="filter-option">
            <h4> Employee Type:</h4>
            <Dropdown
  label="Employee Type"
  items={[
    { id:'Full-Time', labelText: 'Full-Time' },
    { id: "Part-Time", labelText: 'Part-Time' }
  ]}
  selectedItem={employeeTypeFilter}
  onChange={({ selectedItem }) => setEmployeeTypeFilter(selectedItem.id)}
  style={{ color: 'black' }}
/>

</div>
<div>
<Button kind="secondary" onClick={applyFilter}>
Apply Filter
</Button>
<Button kind="secondary" onClick={clearFilter}>
Clear Filter
</Button>
</div>

</Column>
</div>
)}

<div className="table-container">
</div>

<div>
        {httpError ? (
          <p>HTTP Error: {httpError.message}</p>
        ) : error ? (
          <p>Error fetching data: {error}</p>
        ) : (
          <Datagrid datagridState={{ ...datagridState }} onBlur={handleSaveEdits}/>
        )}
        {error && <p>Error fetching data: {error}</p>}
      </div>
      
</div>
);
};
export default EmpPage;