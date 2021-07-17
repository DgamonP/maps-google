import React from 'react';
import { useHistory } from 'react-router';

import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Brightness1Icon from '@material-ui/icons/Brightness1';

import SvgColor from 'react-svg-color';

import { StyleContext } from '../../../theme/BaseStyles';
import arrayMenu from './data';

import { C_TOOLTIP } from '../../../components';

const C_Menu = (props) => {
  const classes = React.useContext(StyleContext);
  const history = useHistory();
  const { onMenu, t, roles } = props;

  const [collapseSettings, setCollapseSettings] = React.useState(false);
  const [collapsePlaces, setCollapsePlaces] = React.useState(false);

  const TooltipComponent = (path, title, iconName) => (
    <C_TOOLTIP disableHoverListener={props.open} title={t('menu.home')}>
      <ListItem
        button
        onClick={() => {
          history.push(`/${path}`);
          if (onMenu) {
            onMenu();
          }
        }}
      >
        <ListItemIcon>
          <div style={{ position: 'relative', top: 3 }}>
            <SvgColor svg={`/assets/svg/${iconName}`} width={20} colors={['#989898']} />
          </div>
        </ListItemIcon>
        <ListItemText style={{ color: '#707070' }} primary={title} />
      </ListItem>
    </C_TOOLTIP>
  );

  const ListItemComponent = (path, title) => (
    <ListItem
      button
      onClick={() => {
        history.push(`/${path}`);
        if (onMenu) onMenu();
      }}
      style={{ borderRadius: 6 }}
      className={classes.nested}
    >
      <ListItemText>
        <Brightness1Icon style={{ fontSize: 5, marginRight: 6, position: 'relative', top: -4 }} />{' '}
        {title}
      </ListItemText>
    </ListItem>
  );

  function treeMenu(menu) {
    if (!Array.isArray(menu)) return;
    if (menu.length == 0) return;
    for (let index = 0; index < menu.length; index++) {
      const item = menu[index];
      // console.log(item)
      treeMenu(item.children);
    }
  }

  function componentMenu() {
    treeMenu(arrayMenu);
  }

  return (
    <>
      {componentMenu()}
      {TooltipComponent('', t('menu.home'), 'icon_home.svg')}
      {roles.find((item) => item.code === 'profile' && item.read) &&
        TooltipComponent('profile', 'Perfil', 'icon_activity.svg')}
      {roles.find((item) => item.code === 'operation' && item.read) &&
        TooltipComponent('operation', t('menu.operations'), 'icon_send.svg')}
      {roles.find((item) => item.code === 'companyClient' && item.read) &&
        TooltipComponent('company', 'Empresas cliente', 'icon_activity.svg')}
      {roles.find((item) => item.code === 'benefits' && item.read) &&
        TooltipComponent('benefits', 'Beneficios', 'icon_folder.svg')}
      {roles.find((item) => item.code === 'news' && item.read) &&
        TooltipComponent('news', 'Noticias', 'Icon_news.svg')}
      
      <ListItem button onClick={() => setCollapseSettings(!collapseSettings)}>
        <ListItemIcon>
          <div style={{ position: 'relative', top: 3 }}>
            <SvgColor svg={'/assets/svg/icon_setting.svg'} width={20} colors={['#989898']} />
          </div>
        </ListItemIcon>
        <ListItemText style={{ color: '#707070' }} primary={t('menu.settings')} />
        {collapseSettings ? (
          <ExpandLess style={{ color: '#989898' }} />
        ) : (
          <ExpandMore style={{ color: '#989898' }} />
        )}
      </ListItem>
      <Collapse in={collapseSettings} timeout='auto' unmountOnExit style={{ paddingLeft: 22 }}>
        <List component='div' disablePadding style={{ borderLeft: '1px solid #e8e8e8' }}>
          {/* falta route */}
          {roles.find((item) => item.code === 'user' && item.read) &&
            ListItemComponent('operator', t('menu.operator'))}
          {roles.find((item) => item.code === 'typeServices' && item.read) &&
            ListItemComponent('typeServices', t('menu.typeService'))}
          {roles.find((item) => item.code === 'stagesTemplate' && item.read) &&
            ListItemComponent('stagesTemplate', 'Plantilla de etapas')}
          {roles.find((item) => item.code === 'basicTypeTransportUnit' && item.read) &&
            ListItemComponent('basicTypeTransportUnit', 'Tipo de transporte')}
          {/* {roles.find((item) => item.code === 'typeTransportUnit' && item.read) &&
            ListItemComponent('typeTransportUnit', 'Tipo de transporte')} */}
          {roles.find((item) => item.code === 'featuresTransportUnit' && item.read) &&
            ListItemComponent('features', 'Características')}
          {roles.find((item) => item.code === 'measurementUnit' && item.read) &&
            ListItemComponent('measurementUnit', 'Unidades de medida')}
          {roles.find((item) => item.code === 'category' && item.read) &&
            ListItemComponent('category', 'Categoría')}
          {roles.find((item) => item.code === 'dispatchType' && item.read) &&
            ListItemComponent('dispatchType', 'Tipo de despacho')}
          {roles.find((item) => item.code === 'boardingMode' && item.read) &&
            ListItemComponent('boardingMode', 'Modo de embarque')}
          {roles.find((item) => item.code === 'brand' && item.read) &&
            ListItemComponent('brand', 'Marca')}
            {roles.find((item) => item.code === 'route' && item.read) &&
            ListItemComponent('routes', 'Rutas')}
        </List>
      </Collapse>
      <ListItem button onClick={() => setCollapsePlaces(!collapsePlaces)}>
        <ListItemIcon>
          <div style={{ position: 'relative', top: 3 }}>
            <SvgColor svg={'/assets/svg/icon_setting.svg'} width={20} colors={['#989898']} />
          </div>
        </ListItemIcon>
        <ListItemText style={{ color: '#707070' }} primary={'Lugares'} />
        {collapsePlaces ? (
          <ExpandLess style={{ color: '#989898' }} />
        ) : (
          <ExpandMore style={{ color: '#989898' }} />
        )}
      </ListItem>
      <Collapse in={collapsePlaces} timeout='auto' unmountOnExit style={{ paddingLeft: 22 }}>
        <List component='div' disablePadding style={{ borderLeft: '1px solid #e8e8e8' }}>
          {roles.find((item) => item.code === 'place' && item.read) &&
            ListItemComponent('places', 'País')}
          {roles.find((item) => item.code === 'city' && item.read) &&
            ListItemComponent('city', 'Ciudad')}
        </List>
      </Collapse>
      {/* <C_TOOLTIP disableHoverListener={props.open} title={t('menu.access')}>
        <ListItem button>
          <ListItemIcon>
            <div style={{ position: 'relative', top: 3 }}>
              <SvgColor svg={'/assets/svg/icon_profile.svg'} width={20} colors={['#989898']} />
            </div>
          </ListItemIcon>
          <ListItemText style={{ color: '#707070' }} primary={t('menu.access')} />
        </ListItem>
      </C_TOOLTIP> */}

      {roles.find((item) => item.code === 'report' && item.read) &&
        TooltipComponent('', t('menu.reports'), 'icon_graph.svg')}
    </>
  );
};

const mapStateToProps = (state) => {
  const { roles } = state.auth;
  return { roles };
};

export default connect(mapStateToProps, null)(withTranslation()(C_Menu));
