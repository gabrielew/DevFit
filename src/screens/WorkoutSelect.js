import React, {useState} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import Workout from '../components/Workout';
import {StackActions, NavigationActions} from 'react-navigation';
import {HeaderBackButton} from 'react-navigation-stack';

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;

const WorkoutList = styled.FlatList`
  flex: 1;
`;

const Title = styled.Text`
  margin-bottom: 10px;
`;

const Page = props => {
  let lastWorkout = false;
  if (props.lastWorkout) {
    lastWorkout = props.myWorkouts.find(i => i.id == props.lastWorkout);
  }

  const goWorkout = workout => {
    props.navigation.navigate('WorkoutCheckList', {workout});
  };
  return (
    <Container>
      {lastWorkout && (
        <>
          <Title>Last workout</Title>
          <Workout data={lastWorkout} />
        </>
      )}

      <Title>choose your workout for today</Title>

      <WorkoutList
        data={props.myWorkouts}
        renderItem={({item}) => (
          <Workout data={item} goAction={() => goWorkout(item)} />
        )}
      />
    </Container>
  );
};

Page.navigationOptions = ({navigation}) => {
  const handleBackAction = () => {
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'AppTab'})],
      }),
    );
  };

  return {
    title: 'Select your workout',
    headerLeft: <HeaderBackButton onPress={handleBackAction} />,
  };
};

const mapStateToProps = state => {
  return {
    myWorkouts: state.userReducer.myWorkouts,
    lastWorkout: state.userReducer.lastWorkout,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
