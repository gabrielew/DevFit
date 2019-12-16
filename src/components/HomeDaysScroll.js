import React, {useState, useEffect, useRef} from 'react';
import {Text} from 'react-native';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const DaysScroll = styled.ScrollView`
  width: 100%;
  height: 50px;
`;

const DayButton = styled.TouchableOpacity`
  width: ${props => props.width};
  justify-content: center;
  align-items: center;
`;

const DayItem = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #eee;
  justify-content: center;
  align-items: center;
`;

const DayText = styled.Text``;

const screen = Math.round(Dimensions.get('window').width);
const screenWidth = Math.round(Dimensions.get('window').width) / 9;
let offsetW = Math.round((screen - screenWidth) / 2);

const Day = ({day, month, dailyProgress, workoutDays, onPress}) => {
  let bgColor = '#f4f4f4';
  let opacity = 1;

  let today = new Date();

  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  let thisDate = new Date(today.getFullYear(), month, day);

  if (workoutDays.includes(thisDate.getDay())) {
    if (thisDate.getTime() < today.getTime()) {
      let thisYear = thisDate.getFullYear();
      let thisMonth = thisDate.getMonth() + 1;
      let thisDay = thisDate.getDate();
      thisMonth = thisMonth < 10 ? '0' + thisMonth : thisMonth;

      let dayFormated = `${thisYear}-${thisMonth}-${thisDay}`;

      if (dailyProgress.includes(dayFormated)) {
        bgColor = '#b5ffb8'; //trained
      } else {
        bgColor = '#ffb5b5';
      }
    }
  } else {
    opacity = 0.2;
  }

  if (thisDate.getTime() == today.getTime()) {
    bgColor = '#B5eeff';
    opacity = 1;
  }

  return (
    <DayButton width={screenWidth} onPress={onPress}>
      <DayItem style={{opacity, backgroundColor: bgColor}}>
        <DayText>{day}</DayText>
      </DayItem>
    </DayButton>
  );
};

export default props => {
  const DayRef = useRef();

  const [selectedDay, setSelectedDay] = useState(props.selectedDay);

  const handleScrollEnd = event => {
    let positionX = event.nativeEvent.contentOffset.x;
    let targetDay = Math.round(positionX / screenWidth) + 1;
    setSelectedDay(targetDay);
  };

  const scrollToDay = day => {
    let positionX = (day - 1) * screenWidth;
    DayRef.current.scrollTo({x: positionX, y: 0, animated: true});
  };

  useEffect(() => {
    props.setSelectedDay(selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    setTimeout(() => {
      if (props.selectedMonth == new Date().getMonth()) {
        scrollToDay(new Date().getDate());
      } else {
        scrollToDay(1);
      }
    }, 10);
  }, [props.selectedMonth]);

  let days = [];
  let daysInMonth = new Date(
    new Date().getFullYear(),
    props.selectedMonth + 1,
    0,
  ).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <DaysScroll
      horizontal={true}
      ref={DayRef}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={screenWidth}
      contentContainerStyle={{
        paddingLeft: offsetW,
        paddingRight: offsetW,
      }}
      onMomentumScrollEnd={handleScrollEnd}>
      {days.map((item, key) => (
        <Day
          key={key}
          day={item}
          month={props.selectedMonth}
          dailyProgress={props.dailyProgress}
          workoutDays={props.workoutDays}
          onPress={() => scrollToDay(item)}
        />
      ))}
    </DaysScroll>
  );
};
