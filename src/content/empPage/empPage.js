
import React, { useState, useEffect } from 'react';
import {
  Datagrid,
  useDatagrid,
  useInlineEdit,
  useFiltering,  
} from '@carbon/ibm-products';
import DatagridPagination from './datagridPagination';
import { pkg } from '@carbon/ibm-products/lib/settings';
 import axios from 'axios';
import './emppage.scss';
//  import Search from '@carbon/react/lib/components/Search';    
 import {  Button } from 'carbon-components-react';
 import { Download, Filter, Add} from '@carbon/icons-react';
 import { DatagridActions } from '@carbon/ibm-products/es/components/Datagrid/utils/DatagridActions';
// import { DatagridActions } from './DatagridActions';
 import { action } from '@storybook/addon-actions';

 const defaultHeader = [
  {
    Header: 'EmployeeSerial',
    accessor: 'sid',
    filter: 'number',
  },
  {
    Header: 'Emp Name',
    accessor: 'Emp Name',
    filter: 'dropdown',
   },
  {
    Header: 'Dept Code',
    accessor: 'DeptCode',
   },
  {
    Header: ' Dept Name',
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


/// getBatchAction ///
var getBatchActions = function getBatchActions() {
  return [{
    label: 'Duplicate',
    renderIcon: function renderIcon() {
      return /*#__PURE__*/React.createElement(Add, {
        size: 16
      });
    },
    onClick: action('Clicked batch action button')
  }, {
    label: 'Add',
    renderIcon: function renderIcon() {
      return /*#__PURE__*/React.createElement(Add, {
        size: 16
      });
    },
    onClick: action('Clicked batch action button')
  }, {
    label: 'Publish to catalog',
    renderIcon: function renderIcon() {
      return /*#__PURE__*/React.createElement(Add, {
        size: 16
      });
    },
    onClick: action('Clicked batch action button')
  }, {
    label: 'Download',
    renderIcon: function renderIcon() {
      return /*#__PURE__*/React.createElement(Add, {
        size: 16
      });
    },
    onClick: action('Clicked batch action button')
  }, {
    label: 'Delete',
    renderIcon: function renderIcon() {
      return /*#__PURE__*/React.createElement(Add, {
        size: 16
      });
    },
    onClick: action('Clicked batch action button'),
    hasDivider: true,
    kind: 'danger'
  }];
};

///export
 export const EmpPage = () => {

  var columns = React.useMemo(function () {
     
    return defaultHeader;
    }, []);

  pkg.feature['Datagrid.useInlineEdit'] = true;

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null); // General error /////
  const [httpError, setHttpError] = useState(null);
 


//datagridState//
  const datagridState = useDatagrid({
    columns: columns,
    data: filteredData.length > 0 ? filteredData : data,
    initialState: {
      pageSize: 50,
      pageSizes: [5, 10, 25, 50],
    },
    onDataUpdate: setData,
    DatagridPagination: DatagridPagination,
    filterProps: {
      variation: 'panel', // default
      updateMethod: 'instant', // default
      primaryActionLabel: 'Apply', // default
      secondaryActionLabel: 'Cancel', // default
      panelIconDescription: 'Open filters', // default
      closeIconDescription: 'Close Panel',
      sections: [
        {categoryTitle : 'Employee Serial',
      hasAccordion: true,
    filters: [
      { filterLabel:'EmployeeSerial',
      filter:{
        type: 'number',
        column: 'sid',
        props: {
          NumberInput: {
            min: 0,
            id: 'Employee-Serial-input',
            invalidText: 'A valid value is required',
            label: 'EmployeeSerial',
            placeholder: 'Type a EmployeeSerial',
            // Add any other Carbon NumberInput props here
          },
        },
      },
      },
      {filterLabel:'empn',
      filter:{
        type: 'dropdown',
        column: 'Emp Name',
        props: {
          Dropdown: {
            id: 'marital-status-dropdown',
            ariaLabel: 'Marital status dropdown',
            items: ['Alice Johnson', 'John Doe', ],
            label: 'Marital status',
            titleText: 'Marital status'
          },
        },
      },
    },
    ]}
       
      ],
      shouldClickOutsideToClose: false, // default
      // filters,
    },
    DatagridActions,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
  }, useInlineEdit, useFiltering);
  useEffect(() => {
    axios.get('http://localhost:5000/api/getEmployees')
      .then((response) => {

        setData(response.data.map(row=>{
          const id= parseInt(row['EmployeeSerial#'])
          const newRow = {...row,sid:id
          }
          console.log(newRow)
          return newRow
        }));
      })
      .catch((error) => {
        setHttpError(error);
        console.error('Error fetching data:', error);
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
 

      {httpError ? (
        <p>HTTP Error: {httpError.message}</p>
      ) : (
        <Datagrid 
        datagridState={{ ...datagridState }} 
        onBlur={handleSaveEdits}
        // paginationComponent={DatagridPagination}
         />
      )}
      {httpError && <p>Error fetching data: {httpError.message}</p>}
    </div>
  );
};

export default EmpPage;





 


