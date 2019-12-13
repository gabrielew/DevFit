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

const DaysArea = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Text = styled.Text`
  color: ${props => props.color || '#000'};
`;

const NextButton = styled.Button``;

const Page = props => {
  const days = [
    'Sunday',
    'Monday',
    'Thuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const toggleDay = day => {
    let newWorkoutDays = [...props.workoutDays];
    if (!props.workoutDays.includes(day)) {
      newWorkoutDays.push(day);
    } else {
      newWorkoutDays = newWorkoutDays.filter(i => i != day);
    }
    props.setWorkoutDays(newWorkoutDays);
    props.navigation.setParams({workoutDays: newWorkoutDays});
  };
  let firstName = props.name.split(' ')[0];

  return (
    <Container>
      <HeaderText>
        Hey, <BoldText>{firstName}</BoldText>, whats up?
      </HeaderText>
      <HeaderText>
        Which <BoldText>days on the week </BoldText>u going to train?
      </HeaderText>
      <DaysArea>
        {days.map((item, key) => (
          <DefaultButton
            bgColor={props.workoutDays.includes(key) ? '#7159ca' : false}
            onPress={() => toggleDay(key)}
            key={key}
            width={150}
            style={{marginBottom: 20}}>
            <Text color={props.workoutDays.includes(key) ? '#FFF' : false}>
              {item}
            </Text>
          </DefaultButton>
        ))}
      </DaysArea>
    </Container>
  );
};

Page.navigationOptions = ({navigation}) => {
  const handleNextAction = () => {
    if (
      !navigation.state.params ||
      !navigation.state.params.workoutDays.length
    ) {
      alert('check at least one day');
      return;
    }

    navigation.navigate('StarterLevel');
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
    workoutDays: state.userReducer.workoutDays,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => dispatch({type: 'SET_NAME', payload: {name}}),
    setWorkoutDays: workoutDays =>
      dispatch({type: 'SET_WORKOUTDAYS', payload: {workoutDays}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
