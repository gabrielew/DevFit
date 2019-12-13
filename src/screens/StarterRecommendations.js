import React, {useEffect} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';

import workoutJson from '../presetWorkouts.json';

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

const NextButton = styled.Button``;

const WorkoutList = styled.FlatList`
  width: 100%;
`;

const Page = props => {
  useEffect(() => {
    if (props.myWorkouts.length > 0) {
      props.navigation.setParams({myWorksouts: props.myWorkouts});
    }
  }, [props.myWorkouts]);

  return (
    <Container>
      <HeaderText>Some options created by your selected skills</HeaderText>
      <HeaderText>
        <BoldText>u selected {props.myWorkouts.length} trains</BoldText>
      </HeaderText>

      <WorkoutList
        data={workoutJson}
        renderItem={({item}) => <Text>{item.name}</Text>}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

Page.navigationOptions = ({navigation}) => {
  let btnNext = 'Ignore';

  if (
    navigation.state.params &&
    navigation.state.params.myWorkouts.length > 0
  ) {
    btnNext = 'Done';
  }

  const handleNextAction = () => {
    if (!navigation.state.params || !navigation.state.params.level) {
      alert('check at least one item');
      return;
    }

    navigation.navigate('StarterRecommendations');
  };
  return {
    title: '',
    headerRight: <NextButton title={btnNext} onPress={handleNextAction} />,
    headerRightContainerStyle: {
      marginRight: 10,
    },
  };
};

const mapStateToProps = state => {
  return {
    myWorkouts: state.userReducer.myWorkouts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMyworkouts: myWorkouts =>
      dispatch({type: 'SET_MYWORKOUTS', payload: {myWorkouts}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
