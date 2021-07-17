import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';

import { StyleContext } from '../../theme/BaseStyles';
import { C_LOADING, C_TYPOGRAPHY, C_BUTTON, C_TABLE } from '../../components';
import { Montserrat } from '../../theme/fontFamily';
import { newAccion } from '../../state/actions/new';
import NewBodyItems from './components/table/NewBodyItems';

const NewScreen = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { news, loadingAction, list, activateDeactivate } = props;

  useEffect(() => {
    list();
  }, [list]);

  function createColumn(title, id) {
    return { id, title };
  }

  const columns = () => [
    createColumn('Título', 'name'),
    createColumn('Descripción', 'description'),
    createColumn('Enlace', 'link'),
    createColumn('Acción', 'action'),
  ];

  function rows() {
    let dataList = [];
    if (news.length > 0) {
      dataList = news.map((item) => {
        return {
          _id: item._id /* de primero */,
          name: item.name,
          description: item.description,
          link: item.link || 'Sin detalle',
        };
      });
    }
    return dataList;
  }

  function onCreate() {
    history.push('news/create');
  }

  return (
    <div className={classes.mainHome}>
      <Paper className={classes.mainRoot}>
        <C_LOADING open={loadingAction} />

        <Grid container>
          <Grid item xs={12}>
            <C_TYPOGRAPHY variant={'h4'} fontFamily={Montserrat.Bold} fontSize={24}>
              Noticias
            </C_TYPOGRAPHY>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <C_BUTTON
              fullWidth={false}
              fontSize={11}
              onClick={onCreate}
              variant={'text'}
              style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 4 }}
              fontFamily={Montserrat.SemiBold}
              // textTransform={false}
            >
              + Crear noticia
            </C_BUTTON>
          </Grid>
        </Grid>
        <Paper className={classes.paper_table} style={{ marginTop: 15 }}>
          {news.length > 0 && (
            <C_TABLE search={true} columns={columns()}>
              {rows().map((item, key) => {
                return (
                  <NewBodyItems
                    key={item._id}
                    rowElements={item}
                    activateDeactivate={activateDeactivate}
                    enable={news[key].account.enable}
                  />
                );
              })}
            </C_TABLE>
          )}
        </Paper>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { news, loadingAction } = state.new;
  return { news, loadingAction };
};

const actionCreators = {
  list: newAccion.newsList,
  activateDeactivate: newAccion.newActivateDeactivate,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(NewScreen));
