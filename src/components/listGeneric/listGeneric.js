import React from 'react';
import { Grid } from '@material-ui/core';
import { C_TEXTFIELD, C_TABLE } from '..';
import ItemList from './itemList';

const ListGeneric = (props) => {
  const { columnData, dataList, details, activateDeactivate } = props;
  // console.log('dataList', dataList);

  function createColumn(title, id) {
    return { id, title };
  }

  function columns() {
    const columns = columnData.map((item) => createColumn(item.name, item.id));
    columns.push(createColumn('Acción', 'action'));
    return columns;
  }

  return (
    <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Grid container item xs={12} sm={3} style={{ marginBottom: 12, marginTop: 12 }}>
        <C_TEXTFIELD border={false} search={true} placeholder='Buscar ...' />
      </Grid>
      <C_TABLE
        columns={columns()}
        // order={order}
        // orderBy={orderBy}
        // onRequestSort={createSortHandler}
      >
        {dataList.map((item) => (
          <ItemList
            key={item._id}
            item={item}
            details={details}
            activateDeactivate={activateDeactivate}
            list={dataList}
          />
        ))}
      </C_TABLE>
    </Grid>
  );
};

export { ListGeneric };
