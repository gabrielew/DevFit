import React, {useEffect} from 'react';
import {StackActions, NavigationActions} from 'react-navigation';
import styled from 'styled-components/native';
import {connect} from 'react-redux';

import Workout from '../components/Workout';

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
  color: #000;
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

  const addWorkout = item => {
    if (props.myWorkouts.findIndex(i => i.id == item.id) < 0) {
      props.addWorkout(item);
    } else {
      props.delWorkout(item);
    }
  };

  return (
    <Container>
      <HeaderText>Some options created by your selected skills</HeaderText>
      <HeaderText>
        <BoldText>you selected {props.myWorkouts.length} trains</BoldText>
      </HeaderText>

      <WorkoutList
        data={workoutJson}
        renderItem={({item}) => (
          <Workout data={item} addAction={() => addWorkout(item)} />
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

Page.navigationOptions = ({navigation}) => {
  let btnNext = 'Ignore';

  if (navigation.state.params) {
    btnNext = 'Done';
  }

  const handleNextAction = () => {
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'AppTab'})],
      }),
    );
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
    addWorkout: workout => dispatch({type: 'ADD_WORKOUT', payload: {workout}}),
    delWorkout: workout => dispatch({type: 'DEL_WORKOUT', payload: {workout}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
