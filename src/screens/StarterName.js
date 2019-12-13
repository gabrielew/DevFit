import React from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #fff;
  margin-left: 30px;
  margin-right: 30px;
`;

const HeaderText = styled.Text`
  font-size: 22px;
  color: #7159c1
  margin-top: 50px
  margin-bottom: 20px;
  font-weight: bold;
`;

const NameInput = styled.TextInput`
  border: 1px solid #7159c1
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
`;

const NextButton = styled.Button``;

const Page = props => {
  const handleNextAction = () => {
    if (!props.name) {
      alert('Fill name field');
      return;
    }

    props.navigation.navigate('StarterDays');
  };

  const handleChangeName = name => {
    props.setName(name);
    props.navigation.setParams({name});
  };

  return (
    <Container>
      <HeaderText>Type your name</HeaderText>
      <NameInput
        value={props.name}
        onChangeText={handleChangeName}
        autoFocus={true}
        autoCapitalize="words"
        onSubmitEditing={handleNextAction}
      />
    </Container>
  );
};

Page.navigationOptions = ({navigation}) => {
  const handleNextAction = () => {
    if (!navigation.state.params || !navigation.state.params.name) {
      alert('Fill name field');
      return;
    }

    navigation.navigate('StarterDays');
  };
  return {
    title: '',
    headerRight: <NextButton title="Next" onPress={handleNextAction} />,
    headerRightContainerStyle: {
      marginRight: 10,
    },
  };
};

const mapStateToProps = state => {
  return {
    name: state.userReducer.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => dispatch({type: 'SET_NAME', payload: {name}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
