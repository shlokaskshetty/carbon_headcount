import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useMemo, useEffect } from 'react';
import { pkg } from '@carbon/ibm-products/lib/settings.js';
import { FilterFlyout } from '@carbon/ibm-products/lib/components/Datagrid/Datagrid/addons/Filtering';
import { BATCH } from '@carbon/ibm-products/lib/components/Datagrid/Datagrid/addons/Filtering/constants.js';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] || {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source), true).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

var useFiltering = function useFiltering(hooks) {
  useEffect(function () {
    pkg.checkReportFeatureEnabled('Datagrid.useFiltering');
  }, []);
  var filterTypes = useMemo(function () {
    return {
      date: function date(rows, id, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          startDate = _ref2[0],
          endDate = _ref2[1];
        return rows.filter(function (row) {
          var rowValue = row.values[id];
          if (rowValue.getTime() <= endDate.getTime() && rowValue.getTime() >= startDate.getTime()) {
            // In date range
            return true;
          } else {
            // Not in date range
            return false;
          }
        });
      },
      number: function number(rows, id, value) {
        if (value === '') {
          return rows;
        }
        var parsedValue = parseInt(value);
        return rows.filter(function (row) {
          var rowValue = row.values[id];
          return rowValue === parsedValue;
        });
      }
    };
  }, []);
  hooks.useInstance.push(function (instance) {
    var filterProps = instance.filterProps,
      setAllFilters = instance.setAllFilters,
      setFilter = instance.setFilter,
      headers = instance.headers,
      data = instance.data,
      state = instance.state;
    var defaultProps = {
      variation: 'flyout',
      updateMethod: BATCH,
      panelIconDescription: 'Open filter panel',
      reactTableFiltersState: state.filters
    };
    var getFilterFlyoutProps = function getFilterFlyoutProps() {
      return _objectSpread(_objectSpread(_objectSpread({}, defaultProps), filterProps), {}, {
        setAllFilters: setAllFilters,
        setFilter: setFilter,
        headers: headers,
        data: data
      });
    };
    Object.assign(instance, {
      filterProps: _objectSpread(_objectSpread({}, defaultProps), instance.filterProps),
      filterTypes: filterTypes,
      getFilterFlyoutProps: getFilterFlyoutProps,
      FilterFlyout: FilterFlyout
    });
  });
};
export default useFiltering;
