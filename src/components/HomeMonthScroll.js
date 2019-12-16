import React, {useState, useEffect, useRef} from 'react';

import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const MonthScroll = styled.ScrollView`
  width: 100%;
  height: 60px;
`;
const MonthButton = styled.TouchableOpacity`
  width: ${props => props.width};
  justify-content: center;
  align-items: center;
`;
const MonthItem = styled.View`
  width: 90%;
  height: 30px;
  background-color: #eee;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;
const MonthText = styled.Text``;

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const screenWidth = Math.round(Dimensions.get('window').width) / 3;

export default props => {
  const MonthRef = useRef();

  const [selectedMonth, setSelectedMonth] = useState(props.selectedMonth);

  const handleScrollEnd = event => {
    let positionX = event.nativeEvent.contentOffset.x;
    let targetMonth = Math.round(positionX / screenWidth);
    setSelectedMonth(targetMonth);
  };

  const scrollToMonth = month => {
    let positionX = month * screenWidth;
    MonthRef.current.scrollTo({x: positionX, y: 0, animated: true});
  };

  useEffect(() => {
    props.setSelectedMonth(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    setTimeout(() => {
      scrollToMonth(selectedMonth);
    }, 10);
  }, [props.selectedMonth]);

  return (
    <MonthScroll
      horizontal={true}
      ref={MonthRef}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={screenWidth}
      contentContainerStyle={{
        paddingLeft: screenWidth,
        paddingRight: screenWidth,
      }}
      onMomentumScrollEnd={handleScrollEnd}>
      {months.map((item, key) => (
        <MonthButton
          key={key}
          width={screenWidth}
          onPress={() => setSelectedMonth(key)}>
          <MonthItem
            style={
              key == selectedMonth
                ? {backgroundColor: '#7159c1', width: '100%', height: 40}
                : {}
            }>
            <MonthText
              style={key == selectedMonth ? {color: '#fff'} : {color: '#000'}}>
              {item}
            </MonthText>
          </MonthItem>
        </MonthButton>
      ))}
    </MonthScroll>
  );
};
