import React, {useState} from 'react';
import {StackActions, NavigationActions} from 'react-navigation';
import styled from 'styled-components/native';
import {connect} from 'react-redux';

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 30px;
`;

const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
`;

const ListArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DayItem = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #eee;
  justify-content: center;
  align-items: center;
`;

const LevelItem = styled.TouchableOpacity`
  padding: 0 15px;
  background-color: #eee;
  height: 30px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const LevelItemText = styled.Text``;

const DayItemText = styled.Text``;

const ResetButton = styled.Button``;

const days = [
  {day: 'S', id: 0},
  {day: 'M', id: 1},
  {day: 'T', id: 2},
  {day: 'W', id: 3},
  {day: 'T', id: 4},
  {day: 'F', id: 5},
  {day: 'S', id: 6},
];
const levels = ['Beginner', 'Intermidiate', 'Advanced'];
const Page = props => {
  const handleWorkoutDay = day => {
    let newWorkoutDays = [...props.workoutDays];
    if (newWorkoutDays.includes(day)) {
      if (newWorkoutDays.length == 1) {
        alert('You need to train at least one day!!');
        return;
      }
      newWorkoutDays = newWorkoutDays.filter(i => i != day);
    } else {
      newWorkoutDays.push(day);
    }
    props.setWorkoutDays(newWorkoutDays);
  };

  const handleReset = () => {
    props.reset();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'StarterStack'})],
    });
    props.navigation.dispatch(resetAction);
  };
  return (
    <Container>
      <Label>Your name:</Label>
      <Input value={props.name} onChangeText={name => props.setName(name)} />

      <Label>Days you train</Label>
      <ListArea>
        {days.map((item, key) => (
          <DayItem
            key={key}
            onPress={() => handleWorkoutDay(item.id)}
            style={
              props.workoutDays.includes(item.id)
                ? {backgroundColor: '#7159c1'}
                : {}
            }>
            <DayItemText
              style={
                props.workoutDays.includes(item.id) ? {color: '#fff'} : {}
              }>
              {item.day}
            </DayItemText>
          </DayItem>
        ))}
      </ListArea>
      <Label> Your Level</Label>
      <ListArea>
        {levels.map((item, key) => (
          <LevelItem
            key={key}
            onPress={() => props.setLevel(item)}
            style={
              props.level.includes(item) ? {backgroundColor: '#7159c1'} : {}
            }>
            <LevelItemText
              style={props.level.includes(item) ? {color: '#fff'} : {}}>
              {item}
            </LevelItemText>
          </LevelItem>
        ))}
      </ListArea>
      <Label style={{textAlign: 'center'}}>
        Reset all your personal config?
      </Label>
      <ResetButton title="Reset" onPress={handleReset} />
    </Container>
  );
};

Page.navigationOptions = ({navigation}) => {
  return {
    title: 'Settings',
  };
};

const mapStateToProps = state => {
  return {
    name: state.userReducer.name,
    workoutDays: state.userReducer.workoutDays,
    level: state.userReducer.level,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => dispatch({type: 'SET_NAME', payload: {name}}),
    setWorkoutDays: workoutDays =>
      dispatch({type: 'SET_WORKOUTDAYS', payload: {workoutDays}}),
    setLevel: level => dispatch({type: 'SET_LEVEL', payload: {level}}),
    reset: () => dispatch({type: 'RESET'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
