import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { Paper } from '@material-ui/core';

import { StyleContext } from '../../theme/BaseStyles';
import { C_TABLE, ScreenTitle } from '../../components';

import ClientBodyItems from './ClientBodyItems';

const ClientScreen = (props) => {
  const classes = React.useContext(StyleContext);

  const { t, history } = props;

  function createColumn(title, id) {
    return { id, title };
  }

  function columns() {
    return [
      createColumn(t('operator.firstName'), 'firstName'),
      createColumn(t('operator.lastName'), 'lastName'),
      createColumn(t('operator.documentId'), 'documentId'),
      createColumn(t('operator.birthDate'), 'birthDate'),
      createColumn(t('operator.email'), 'email'),
      createColumn(t('operator.companyId'), 'companyId'),
      createColumn(t('operator.country'), 'country'),
      createColumn('Acción', 'action'),
    ];
  }

  function rows() {
    return [
      {
        id: '12',
        firstName: 'Nombre',
        lastName: 'Apellido',
        documentId: 'Carnet de identidad',
        birthDate: 'Fecha de Cumpleaños',
        email: 'Correo electrónico',
        companyId: 'Empresa',
        country: 'Pais',
      },
      {
        id: '11',
        firstName: 'Nombre',
        lastName: 'Apellido',
        documentId: 'Carnet de identidad',
        birthDate: 'Fecha de Cumpleaños',
        email: 'Correo electrónico',
        companyId: 'Empresa',
        country: 'Pais',
      },
    ];
  }

  function onCreate() {
    history.push('/clients/create');
  };

  return (
    <>
      <div className={classes.mainHome}>
        <Paper className={classes.mainRoot} elevation={0}>

          <ScreenTitle 
            title={ t('client.title') }
            createText={ t('client.create') }
            onCreate={onCreate}
          />

          <Paper elevation={1} className={classes.paper_table} style={{ marginTop: 15 }}>
            
            <C_TABLE
              search={true}
              columns={columns()}
            >
              {rows().map((item) => (
                <ClientBodyItems key={item.id} {...item} />
              ))}
            </C_TABLE>

          </Paper>
        </Paper>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { operations } = state.operation;
  return { operations };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(withTranslation()(ClientScreen));
