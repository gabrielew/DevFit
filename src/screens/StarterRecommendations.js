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
  margin-top: 50px;
`;

const HeaderText = styled.Text`
  font-size: 15px;
  color: #7159c1;
  text-align: center;
  margin-bottom: 30px;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

const LevelArea = styled.View`
  width: 100%;
`;

const Text = styled.Text`
  color: ${props => props.color || '#000'};
`;

const NextButton = styled.Button``;

const Page = props => {
  const handleLevel = level => {
    props.setLevel(level);
    props.navigation.setParams({level});
  };

  return (
    <Container>
      <HeaderText>Some options created by your selected skills</HeaderText>
      <HeaderText>
        <BoldText>u selected ... trains</BoldText>
      </HeaderText>
    </Container>
  );
};

Page.navigationOptions = ({navigation}) => {
  const handleNextAction = () => {
    if (!navigation.state.params || !navigation.state.params.level) {
      alert('check at least one item');
      return;
    }

    navigation.navigate('StarterRecommendations');
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
    level: state.userReducer.level,
    workoutDays: state.userReducer.workoutDays,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLevel: level => dispatch({type: 'SET_LEVEL', payload: {level}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
