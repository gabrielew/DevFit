import React, {useState} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';

import HomeMonthScroll from '../components/HomeMonthScroll';
import HomeDaysScroll from '../components/HomeDaysScroll';
import HomeDayStatus from '../components/HomeDayStatus';

const Container = styled.SafeAreaView`
  align-items: center;
`;

const Legend = styled.View`
  width: 90%;
  align-items: flex-start;
  margin-top: 30px;
`;

const LegendText = styled.Text`
  color: #555;
`;

const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const LegendBox = styled.View`
  width: 15px;
  height: 15px;
  background-color: #ccc;
  margin-right: 5px;
`;

const Page = props => {
  const Legends = [
    {legend: 'Today', color: '#b5efff'},
    {legend: 'Training Done', color: '#b5ffb8'},
    {legend: 'Missed Training', color: '#ffb5b5'},
    {legend: 'Rest Day', color: '#f4f4f4'},
    {legend: 'Future Day', color: '#999'},
  ];

  let today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  return (
    <Container>
      <HomeMonthScroll
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <HomeDaysScroll
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        dailyProgress={props.dailyProgress}
        workoutDays={props.workoutDays}
      />
      <HomeDayStatus
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        dailyProgress={props.dailyProgress}
        workoutDays={props.workoutDays}
        addProgress={props.addProgress}
        delProgress={props.delProgress}
        goToWorkout={() => props.navigation.navigate('WorkoutStack')}
      />

      <Legend>
        <LegendText>Legends:</LegendText>
        {Legends.map((item, key) => (
          <LegendItem key={key}>
            <LegendBox style={{backgroundColor: item.color}}></LegendBox>
            <LegendText>{item.legend}</LegendText>
          </LegendItem>
        ))}
      </Legend>
    </Container>
  );
};

Page.navigationOptions = ({navigation}) => {
  const ConfigButtonArea = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
  `;

  const ConfigButtonImage = styled.Image`
    width: 25px;
    height: 25px;
  `;

  const ConfigButton = () => {
    const handleBtnAction = () => {
      navigation.navigate('HomeConfig');
    };

    return (
      <ConfigButtonArea onPress={handleBtnAction}>
        <ConfigButtonImage source={require('../assets/config.png')} />
      </ConfigButtonArea>
    );
  };

  return {
    title: 'Your Daily Progess',
    headerRight: <ConfigButton />,
    headerRightContainerStyle: {
      marginRight: 10,
    },
  };
};

const mapStateToProps = state => {
  return {
    dailyProgress: state.userReducer.dailyProgress,
    workoutDays: state.userReducer.workoutDays,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProgress: date => dispatch({type: 'ADD_PROGRESS', payload: {date}}),
    delProgress: date => dispatch({type: 'DEL_PROGRESS', payload: {date}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
