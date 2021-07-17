import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
// import VisibilityIcon from '@material-ui/icons/Visibility';

import { postulation } from '../../../state/actions';
import { StyledTableCells, StyledTableRows } from '../../../theme/BaseStyles';

const PostulationItem = (props) => {
  const { dataPostulation, transportUnit, user, postulationAccept, postulation } = props;
  const { address, profile } = user || {};
  const { confirmedDate, acceptedDate, freightValue } = dataPostulation || {};

  function existeData(value) {
    if (value) return true;
    return false;
  }

  function dataNamePostulante() {
    if (!props.user.profile) return 'S/N';
    if (!profile.firstName) {
      return 'S/N';
    }
    if (!profile.lastName) {
      return profile.lastName;
    }
    return profile.firstName + ' ' + profile.lastName;
  }

  function dataTransportUnit() {
    if (!transportUnit.plate) {
      return 'S/N';
    }
    return transportUnit.plate;
  }

  function dataAddressCity() {
    if (!props.address) return 'S/N';
    if (!address.city) return 'S/N';
    return address.city;
  }

  const accept = () => {
    postulationAccept(dataPostulation._id, dataPostulation.travelId);
  };

  return (
    <StyledTableRows hover onClick={() => {}}>
      <StyledTableCells>
        {existeData(dataPostulation.postulateDate)
          ? moment(dataPostulation.postulateDate).format('DD/MM/YYYY')
          : 'S/F'}
      </StyledTableCells>
      <StyledTableCells>{dataNamePostulante()}</StyledTableCells>
      <StyledTableCells>{dataTransportUnit()}</StyledTableCells>
      <StyledTableCells>{dataAddressCity()}</StyledTableCells>
      <StyledTableCells>{'4.5'}</StyledTableCells>
      <StyledTableCells>{freightValue}</StyledTableCells>
      <StyledTableCells>
        {confirmedDate ? (
          <label
            style={{
              padding: 3,
              borderRadius: 4,
              color: '#389e0d',
              background: '#f6ffed',
              borderColor: '#b7eb8f',
            }}
          >
            {' '}
            {'Confirmado'}{' '}
          </label>
        ) : acceptedDate ? (
          <label
            style={{
              padding: 3,
              borderRadius: 4,
              color: '#096dd9',
              background: '#e6f7ff',
              borderColor: '#91d5ff',
            }}
          >
            {' '}
            {'Aceptado'}{' '}
          </label>
        ) : (
          <label
            style={{
              padding: 3,
              borderRadius: 4,
              color: '#d46b08',
              background: '#fff7e6',
              borderColor: '#ffd591',
            }}
          >
            {' '}
            {'Postulado'}{' '}
          </label>
        )}
      </StyledTableCells>
      {!postulation && (
        <StyledTableCells>
          <CheckIcon
            style={{
              fontSize: 16,
              cursor: 'pointer',
              padding: 1,
              marginRight: 4,
              color: '#2DAA58',
            }}
            // onClick={() => accept()}
            onClick={() => props.onAcceptPostulation(dataPostulation._id, dataPostulation.travelId)}
          />
          <ClearIcon
            style={{ fontSize: 16, cursor: 'pointer', padding: 1, color: '#D82E41' }}
            onClick={() => {
              console.log(props);
            }}
          />
        </StyledTableCells>
      )}
    </StyledTableRows>
  );
};

const mapStateToProps = (state) => {
  const { postulation } = state.postulation;
  return { postulation };
};

const actionCreators = {
  postulationAccept: postulation.postulationAccept,
};

export default connect(mapStateToProps, actionCreators)(PostulationItem);
// export default React.memo( PostulationItem );
